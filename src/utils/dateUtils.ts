export const CUTOFF_HOUR = 22;
export const START_HOUR = 9;
export const END_HOUR = 23;
export const STEP_MINUTES = 30;

export const DEFAULT_TIMEZONE = 'Europe/London';

/**
 * Returns the difference in hours between the user's local TZ and Asia/Yerevan.
 */
export function getTimeDifferenceFromYerevan(): { localOffset: number; yerevanOffset: number; diffHours: number } {
    const localMin = new Date().getTimezoneOffset();
    const yerevanStr = new Date().toLocaleString('en-US', {
        timeZone: DEFAULT_TIMEZONE,
        timeZoneName: 'short',
        hour12: false
    });
    const m = yerevanStr.match(/GMT([+-]\d+)/);
    const yerevanHour = m ? parseInt(m[1], 10) : 4;
    const yerevanMin = -yerevanHour * 60;

    const diffMin = localMin - yerevanMin;
    return {
        localOffset: -localMin / 60,
        yerevanOffset: yerevanHour,
        diffHours: diffMin / 60
    };
}

export const MONTHS = [
    {full: 'January', short: 'Jan'},
    {full: 'February', short: 'Feb'},
    {full: 'March', short: 'Mar'},
    {full: 'April', short: 'Apr'},
    {full: 'May', short: 'May'},
    {full: 'June', short: 'Jun'},
    {full: 'July', short: 'Jul'},
    {full: 'August', short: 'Aug'},
    {full: 'September', short: 'Sep'},
    {full: 'October', short: 'Oct'},
    {full: 'November', short: 'Nov'},
    {full: 'December', short: 'Dec'}
];

export const isWeekend = (date: Date): boolean => [0, 6].includes(date.getDay());

export const getNextBusinessDay = (date: Date): Date => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    while (isWeekend(nextDay)) {
        nextDay.setDate(nextDay.getDate() + 1);
    }
    return nextDay;
};

export const generateHoursArray = (): string[] => {
    const hours = [];
    for (let hour = START_HOUR; hour < END_HOUR; hour++) {
        for (let minutes = 0; minutes < 60; minutes += STEP_MINUTES) {
            const timeString = `${hour}:${minutes.toString().padStart(2, '0')}`;
            hours.push(timeString);
        }
    }
    return hours;
};

export const getInitialDate = (initialDate?: string): Date => {
    const now = new Date();

    if (initialDate) {
        const parsed = new Date(initialDate);
        if (!isNaN(parsed.getTime())) return parsed;
    }

    if (now.getHours() >= CUTOFF_HOUR || isWeekend(now)) {
        return getNextBusinessDay(now);
    }

    return now;
};

export const getAvailableMonths = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const months = [];

    if (currentMonth >= 9) {
        for (let i = currentMonth; i < 12; i++) {
            months.push({
                label: MONTHS[i].full,
                shortLabel: MONTHS[i].short,
                value: `${currentYear}-${i}`,
                year: currentYear,
                month: i
            });
        }

        for (let i = 0; i < 3; i++) {
            months.push({
                label: MONTHS[i].full,
                shortLabel: MONTHS[i].short,
                value: `${currentYear + 1}-${i}`,
                year: currentYear + 1,
                month: i
            });
        }
    } else {
        for (let i = currentMonth; i < 12; i++) {
            months.push({
                label: MONTHS[i].full,
                shortLabel: MONTHS[i].short,
                value: `${currentYear}-${i}`,
                year: currentYear,
                month: i
            });
        }
    }

    return months;
};

export const getAvailableDays = (selectedDate: Date) => {
    const now = new Date();
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);

        if (date < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
            continue;
        }

        const weekend = isWeekend(date);

        days.push({
            label: day.toString(),
            value: day,
            date: date,
            disabled: weekend
        });
    }

    return days;
};

export const getAvailableHours = (selectedDate: Date): string[] => {
    const now = new Date();
    const isToday = selectedDate.toDateString() === now.toDateString();
    const hours = generateHoursArray();

    if (isToday && now.getHours() < CUTOFF_HOUR) {
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const cutoffMinutes = currentMinutes + 60;

        return hours.filter(time => {
            const [hours, minutes] = time.split(':').map(Number);
            const timeMinutes = hours * 60 + minutes;
            return timeMinutes >= cutoffMinutes;
        });
    }

    return hours;
};

export const createDateTime = (selectedDate: Date, selectedHour: string): Date => {
    const [hours, minutes] = selectedHour.split(':').map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes, 0, 0);

    if (isNaN(dateTime.getTime())) {
        console.error('Invalid date created:', dateTime);
        return new Date();
    }

    return dateTime;
};

export const saveToLocalStorage = (isoDate: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('selectedDate', isoDate);
        window.dispatchEvent(new CustomEvent('update-schedule-date', {
            detail: isoDate,
        }));
    }
};

export const getStoredDate = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('selectedDate');
    }
    return null;
};
