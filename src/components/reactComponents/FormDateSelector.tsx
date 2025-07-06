import { useEffect, useMemo, useState,useRef } from 'react';
import {
    getInitialDate,
    getAvailableMonths,
    getAvailableDays,
    getAvailableHours,
    createDateTime,
    getStoredDate,
} from '../../utils/dateUtils.ts';
import {Dropdown} from "../../utils/Dropdown.tsx"

const FormDateSelector = ({ onDateChange }: { onDateChange: (date: string) => void }) => {
    const getStoredOrInitial = () => {
        const stored = getStoredDate();
        return stored ? new Date(stored) : getInitialDate();
    };

    const initial = getStoredOrInitial();
    const [selectedDate, setSelectedDate] = useState(initial);
    const [selectedHour, setSelectedHour] = useState(
        `${initial.getHours()}:${initial.getMinutes().toString().padStart(2, '0')}`
    );

    const previousDateRef = useRef<string | null>(null); // ✅

    useEffect(() => {
        const listener = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            const updated = new Date(detail);
            setSelectedDate(updated);
            setSelectedHour(`${updated.getHours()}:${updated.getMinutes().toString().padStart(2, '0')}`);
        };
        window.addEventListener('update-schedule-date', listener);
        return () => window.removeEventListener('update-schedule-date', listener);
    }, []);

    const availableMonths = useMemo(() => getAvailableMonths(), []);

    const availableDays = useMemo(() => getAvailableDays(selectedDate), [selectedDate]);

    const availableHours = useMemo(() => getAvailableHours(selectedDate), [selectedDate]);

    useEffect(() => {
        try {
            const finalDateTime = createDateTime(selectedDate, selectedHour);
            const isoDate = finalDateTime.toISOString();

            if (previousDateRef.current !== isoDate) {
                previousDateRef.current = isoDate;
                onDateChange(isoDate);
            }
        } catch (error) {
            console.error('Error creating ISO date:', error);
        }
    }, [selectedDate, selectedHour, onDateChange]);

    const handleMonthChange = (value: string) => {
        const [year, month] = value.split('-').map(Number);
        const newDate = new Date(selectedDate);
        newDate.setFullYear(year, month, 1);

        const daysForNewMonth = getAvailableDays(newDate);
        const availableBusinessDays = daysForNewMonth.filter(d => !d.disabled);
        if (availableBusinessDays.length > 0) {
            newDate.setDate(availableBusinessDays[0].value);
        }

        setSelectedDate(newDate);
    };

    const handleDayChange = (day: number) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
    };

    const handleHourChange = (hour: string) => {
        setSelectedHour(hour);
    };


    return (
        <div className="grid grid-cols-3 gap-4 w-full">
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
                onChange={handleHourChange}
            />
        </div>
    );
};

export default FormDateSelector;