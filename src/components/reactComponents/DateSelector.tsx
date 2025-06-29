import { useEffect, useState, useMemo } from 'react';
import ScrollNavButton from "./ScrollNavButton.tsx";
import {
    getInitialDate,
    getAvailableMonths,
    getAvailableDays,
    getAvailableHours,
    createDateTime,
    saveToLocalStorage
} from '../../utils/dateUtils.ts';

import {Dropdown} from "../../utils/Dropdown.tsx"

type Props = {
    onDateChange?: (isoDate: string) => void;
    initialDate?: string;
};

const DateSelector: React.FC<Props> = ({ onDateChange, initialDate }) => {
    const initial = getInitialDate(initialDate);
    const [selectedDate, setSelectedDate] = useState(initial);
    const [selectedHour, setSelectedHour] = useState(
        `${initial.getHours()}:${initial.getMinutes().toString().padStart(2, '0')}`
    );

    const availableMonths = useMemo(() => getAvailableMonths(), []);

    const availableDays = useMemo(() => getAvailableDays(selectedDate), [selectedDate]);

    const availableHours = useMemo(() => getAvailableHours(selectedDate), [selectedDate]);

    const finalDateTime = useMemo(() =>
            createDateTime(selectedDate, selectedHour),
        [selectedDate, selectedHour]
    );

    useEffect(() => {
        try {
            const isoDate = finalDateTime.toISOString();
            onDateChange?.(isoDate);
            saveToLocalStorage(isoDate);
        } catch (error) {
            console.error('Error creating ISO date:', error);
        }
    }, [finalDateTime, onDateChange]);

    // Auto-adjust day when month changes
    useEffect(() => {
        const availableBusinessDays = availableDays.filter(d => !d.disabled);
        if (availableBusinessDays.length > 0 && !availableBusinessDays.some(d => d.value === selectedDate.getDate())) {
            const newDate = new Date(selectedDate);
            newDate.setDate(availableBusinessDays[0].value);
            setSelectedDate(newDate);
        }
    }, [availableDays, selectedDate]);

    // Auto-adjust hour when day changes
    useEffect(() => {
        if (availableHours.length > 0 && !availableHours.includes(selectedHour)) {
            setSelectedHour(availableHours[0]);
        }
    }, [availableHours, selectedHour]);

    const handleMonthChange = (value: string) => {
        const [year, month] = value.split('-').map(Number);
        const newDate = new Date(selectedDate);
        newDate.setFullYear(year, month, 1);
        setSelectedDate(newDate);
    };

    const handleDayChange = (day: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
    };



    return (
        <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row justify-between  rounded-lg md:shadow-[0px_0px_20px_5px] shadow-gray-800 ">
            <div className="grid grid-cols-3 gap-3 py-4 bg-white rounded-lg md:rounded-l-lg md:rounded-r-none w-full md:flex-grow shadow-[0px_0px_15px_4px] shadow-gray-500 md:shadow-none">
                <Dropdown
                    label="Month"
                    value={`${selectedDate.getFullYear()}-${selectedDate.getMonth()}`}
                    options={availableMonths.map(m => ({
                        label: m.year === new Date().getFullYear() ? m.label : `${m.label} ${m.year}`,
                        shortLabel: m.year === new Date().getFullYear() ? m.shortLabel : `${m.shortLabel} ${m.year}`,
                        value: m.value
                    }))}
                    onChange={handleMonthChange}
                    useShortLabel={typeof window !== 'undefined' && window.innerWidth < 768}
                />

                <Dropdown
                    label="Day"
                    value={selectedDate.getDate().toString()}
                    options={availableDays.map(d => ({
                        label: d.label,
                        value: d.value,
                        disabled: d.disabled
                    }))}
                    onChange={handleDayChange}
                />

                <Dropdown
                    label="Hour"
                    value={selectedHour}
                    options={availableHours.map(h => ({
                        label: h,
                        value: h
                    }))}
                    onChange={setSelectedHour}
                />
            </div>

            <div className="schedule_btn flex items-stretch">
                <ScrollNavButton
                    targetId="consultation"
                    to="/"
                    className="bg-[#033271] text-white px-4 w-full h-full py-4 rounded-lg md:rounded-r-lg md:rounded-l-none font-medium text-sm hover:bg-[#002954] transition"
                    onClick={() => {
                        try {
                            const isoDate = finalDateTime.toISOString();
                            saveToLocalStorage(isoDate);
                        } catch (error) {
                            console.error('Error in button click handler:', error);
                        }
                    }}
                >
                    Schedule a Free Consultation
                </ScrollNavButton>
            </div>
        </div>
    );
};

export default DateSelector;