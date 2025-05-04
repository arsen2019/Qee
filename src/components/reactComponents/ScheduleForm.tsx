import { useState } from 'react';

const BusinessTransformationHero = () => {
    const [month, setMonth] = useState('April');
    const [day, setDay] = useState('15');
    const [hour, setHour] = useState('12:30');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
    const hours = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'month') {
            setMonth(value);
        } else if (name === 'day') {
            setDay(value);
        } else if (name === 'hour') {
            setHour(value);
        } else {
            console.warn(`Unknown dropdown changed: ${name}`);
        }
    };

    const Dropdown = ({
                          label,
                          name,
                          value,
                          options
                      }: {
        label: string;
        name: 'month' | 'day' | 'hour';
        value: string;
        options: string[];
    }) => (
        <div className="flex flex-col items-center px-2">
            <label htmlFor={name} className="text-blue-600 text-sm font-medium mb-2">
                {label}
            </label>
            <div className="relative w-full">
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className="w-full py-2 px-4 text-center bg-white border border-gray-300 rounded appearance-none focus:outline-none"
                >
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>

                {/* Chevron up */}
                <div className="pointer-events-none absolute top-1 left-1/2 transform -translate-x-1/2">
                    <img src="/vectors/arrowUp.svg" alt="Up" className="h-3 w-3" />
                </div>

                {/* Chevron down */}
                <div className="pointer-events-none absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    <img src="/vectors/arrowDown.svg" alt="Down" className="h-3 w-3" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="w-full h-full relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/staticImages/HomeGreeting.webp')] bg-cover"></div>
            <div className="absolute inset-0 bg-blue-950 opacity-90"></div>

            <div className="relative z-10 p-8 pb-20 md:p-16 text-white">
                <div className="max-w-md mb-16 md:mb-24">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">YOUR TRUSTED PARTNER</h1>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">IN BUSINESS</h2>
                    <h2 className="text-3xl md:text-4xl font-bold">TRANSFORMATION</h2>
                </div>

                {/* Scheduling section */}
                <div className="flex w-full max-w-3xl">
                    <div className="bg-white text-black grid grid-cols-3 flex-grow">
                        <Dropdown
                            label="Month"
                            name="month"
                            value={month}
                            options={months}
                        />
                        <Dropdown
                            label="Day"
                            name="day"
                            value={day}
                            options={days}
                        />
                        <Dropdown
                            label="Hour"
                            name="hour"
                            value={hour}
                            options={hours}
                        />
                    </div>

                    <div className="bg-blue-800 text-white px-6 py-4 flex flex-col justify-center items-center text-center">
                        <button className="font-medium text-sm">
                            Schedule a Free
                            <br />
                            Consultation
                        </button>
                    </div>
                </div>

                {/* Optional: Show selected state for confirmation */}
                <div className="mt-6 text-center text-sm">
                    Selected: <span className="font-semibold">{month} {day} at {hour}</span>
                </div>
            </div>
        </div>
    );
};

export default BusinessTransformationHero;
