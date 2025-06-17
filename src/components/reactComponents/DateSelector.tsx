import {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Select} from 'antd';
import ScrollNavButton from "./ScrollNavButton.tsx";
import {useMemo} from 'react';

const {Option} = Select;

type Props = {
    onDateChange?: (isoDate: string) => void;
    initialDate?: string;
};

const cutoffHour = 18;

const DateSelector: React.FC<Props> = ({onDateChange, initialDate}) => {
    const now = dayjs();
    const currentYear = now.year();
    const currentMonthIndex = now.month();

    const allMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const availableMonths = allMonths
        .slice(currentMonthIndex)
        .map((m) => ({label: m, value: m, year: currentYear}))
        .concat(
            currentMonthIndex >= 10
                ? allMonths.slice(0, 2).map((m) => ({label: m, value: m, year: currentYear + 1}))
                : []
        );

    const getTotalDays = (monthIndex: number, year: number) =>
        dayjs().year(year).month(monthIndex).daysInMonth();

    const isWeekend = (year: number, monthIndex: number, day: number) =>
        [0, 6].includes(dayjs().year(year).month(monthIndex).date(day).day());

    const getNextValidDay = (from: dayjs.Dayjs) => {
        let d = from.add(1, 'day');
        while (isWeekend(d.year(), d.month(), d.date())) {
            d = d.add(1, 'day');
        }
        return d;
    };

    const getInitialDate = () => {
        const base = initialDate && dayjs(initialDate).isValid()
            ? dayjs(initialDate)
            : (now.hour() >= cutoffHour || isWeekend(now.year(), now.month(), now.date()))
                ? getNextValidDay(now)
                : now;

        return base;
    };

    const initial = getInitialDate();
    const [month, setMonth] = useState(initial.format('MMMM'));
    const [year, setYear] = useState(initial.year());
    const [day, setDay] = useState(initial.date().toString());
    const [hour, setHour] = useState(initial.format('HH:mm'));

    const generateDays = (m: string, y: number) => {
        const idx = allMonths.indexOf(m);
        const total = getTotalDays(idx, y);
        const result: { value: string; label: string; disabled?: boolean }[] = [];

        for (let i = 1; i <= total; i++) {
            const isPast = y === now.year() && idx === now.month() && i < now.date();
            if (isPast) continue;
            const disabled = isWeekend(y, idx, i);
            result.push({value: `${i}`, label: `${i}`, disabled});
        }

        return result;
    };

    const generateHours = (m: string, d: string, y: number) => {
        const base = [
            '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
            '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
            '15:00', '15:30', '16:00', '16:30', '17:00',
        ];

        const selected = dayjs(`${m} ${d} ${y}`, 'MMMM D YYYY');
        if (selected.isSame(now, 'day') && now.hour() < cutoffHour) {
            const min = now.hour() * 60 + now.minute() + 60;
            return base.filter((t) => {
                const [hr, minStr] = t.split(':');
                return parseInt(hr) * 60 + parseInt(minStr) >= min;
            });
        }

        return base;
    };

    const days = generateDays(month, year);
    const hours = generateHours(month, day, year);

    useEffect(() => {
        if (!days.some((d) => d.value === day && !d.disabled)) {
            const first = days.find((d) => !d.disabled);
            if (first) setDay(first.value);
        }
    }, [month, year]);

    useEffect(() => {
        if (!hours.includes(hour)) {
            setHour(hours[0]);
        }
    }, [day, month, year]);


    const selectedDateTime = useMemo(() => {
        const date = dayjs(`${month} ${day} ${year} ${hour}`, 'MMMM D YYYY HH:mm');
        const isoDate = date.toISOString();
        if (typeof window !== 'undefined') {
            localStorage.setItem('selectedDate', isoDate);
            window.dispatchEvent(new CustomEvent('update-schedule-date', {
                detail: isoDate,
            }));
        }

        return date;
    }, [month, day, year, hour]);

    useEffect(() => {
        onDateChange?.(selectedDateTime.toISOString());
    }, [selectedDateTime]);


    const Dropdown = ({
                          label,
                          value,
                          options,
                          onChange,
                      }: {
        label: string;
        value: string;
        options: { value: string; label: string; disabled?: boolean }[];
        onChange: (v: string) => void;
    }) => (
        <div className="flex flex-col items-center w-full px-2 z-10">
            <div className="text-[#033271] font-semibold text-sm  mb-1">{label}</div>
            <Select
                value={value}
                onChange={onChange}
                className="w-full text-center"
                variant="borderless"
                styles={{
                    popup: {root: {textAlign: 'center'}},
                }}
            >
                {options.map((opt) => (
                    <Option
                        key={opt.value}
                        value={opt.value}
                        disabled={opt.disabled}
                        className={opt.disabled ? 'text-gray-400' : ''}
                    >
                        {opt.label}
                    </Option>
                ))}
            </Select>
        </div>
    );

    return (
        <div
            className="w-full  flex flex-col gap-5 md:gap-0 md:flex-row items-stretch justify-between overflow-hidden rounded-lg shadow-md">
            <div className="grid grid-cols-3 gap-3 py-4 bg-white rounded-lg md:rounded-none  w-full md:flex-grow">
                <Dropdown
                    label="Month"
                    value={month}
                    options={availableMonths.map((m) => ({
                        label: m.year === currentYear ? m.label : `${m.label} ${m.year}`,
                        value: m.value,
                    }))}
                    onChange={(val) => {
                        const selected = availableMonths.find((m) => m.value === val);
                        if (selected) {
                            setMonth(selected.value);
                            setYear(selected.year);
                        }
                    }}
                />
                <Dropdown label="Day" value={day} options={days} onChange={setDay}/>
                <Dropdown
                    label="Hour"
                    value={hour}
                    options={hours.map((h) => ({value: h, label: h}))}
                    onChange={setHour}
                />
            </div>
            <div className="schedule_btn flex items-stretch ">
                <ScrollNavButton
                    targetId="consultation"
                    to="/"
                    className="bg-[#033271] text-white px-4 w-full h-full py-4 rounded-lg md:rounded-none font-medium text-sm hover:bg-[#002954] transition"
                    onClick={() => {
                        const isoDate = selectedDateTime.toISOString();
                        localStorage.setItem('selectedDate', isoDate);
                        window.dispatchEvent(new CustomEvent('update-schedule-date', {
                            detail: isoDate,
                        }));
                    }}
                >
                    Schedule a Free Consultation
                </ScrollNavButton>
            </div>
           

        </div>
    );
};

export default DateSelector;
