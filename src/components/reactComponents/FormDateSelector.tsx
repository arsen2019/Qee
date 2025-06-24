// --------------------------
// FormDateSelector.tsx
// --------------------------
import { useEffect, useMemo, useState } from 'react';
import { Select } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;

const FormDateSelector = ({ onDateChange }: { onDateChange: (date: string) => void }) => {
    const now = dayjs();
    const currentYear = now.year();
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const getStored = () => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('selectedDate') : null;
        return stored ? dayjs(stored) : now;
    };

    const [parsed, setParsed] = useState(getStored());
    const [month, setMonth] = useState(parsed.format('MMMM'));
    const [day, setDay] = useState(parsed.date().toString());
    const [hour, setHour] = useState(parsed.format('HH:mm'));

    useEffect(() => {
        const listener = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            const updated = dayjs(detail);
            setParsed(updated);
            setMonth(updated.format('MMMM'));
            setDay(updated.date().toString());
            setHour(updated.format('HH:mm'));
        };
        window.addEventListener('update-schedule-date', listener);
        return () => window.removeEventListener('update-schedule-date', listener);
    }, []);

    const isWeekend = (date: dayjs.Dayjs) => [0, 6].includes(date.day());

    const days = useMemo(() => {
        const monthIndex = months.indexOf(month);
        const total = dayjs().month(monthIndex).year(currentYear).daysInMonth();
        const result = [];
        for (let i = 1; i <= total; i++) {
            const d = dayjs().year(currentYear).month(monthIndex).date(i);
            if (d.isBefore(now, 'day')) continue;
            const disabled = isWeekend(d);
            result.push({ value: i.toString(), label: i.toString(), disabled });
        }
        return result;
    }, [month]);

    const hours = [
        '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00',
    ];

    useEffect(() => {
        const date = dayjs(`${month} ${day} ${currentYear} ${hour}`, 'MMMM D YYYY HH:mm');
        onDateChange(date.toISOString());
    }, [month, day, hour]);

    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            <div>
                <div className="text-sm text-center font-medium text-[#033271] mb-1">Month</div>
                <Select size='large' value={month} onChange={setMonth} className="w-full min-w-[100px]">
                    {months.map(m => <Option key={m} value={m}>{m}</Option>)}
                </Select>
            </div>
            <div>
                <div className="text-sm text-center font-medium text-[#033271] mb-1">Day</div>
                <Select size='large' value={day} onChange={setDay} className="w-full min-w-[100px]">
                    {days.map(({ value, label, disabled }) => (
                        <Option key={value} value={value} disabled={disabled} className={disabled ? 'text-gray-400' : ''}>
                            {label}
                        </Option>
                    ))}
                </Select>
            </div>
            <div>
                <div className="text-sm text-center font-medium text-[#033271] mb-1">Hour</div>
                <Select size='large' value={hour} onChange={setHour} className="w-full min-w-[100px]">
                    {hours.map(h => <Option key={h} value={h}>{h}</Option>)}
                </Select>
            </div>
        </div>
    );
};

export default FormDateSelector;
