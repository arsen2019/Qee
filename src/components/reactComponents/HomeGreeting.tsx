import { useState } from 'react';
import ScrollNavButton from "./ScrollNavButton.tsx";

const BusinessTransformationHero = () => {
    const [month, setMonth] = useState('April');
    const [day, setDay] = useState('15');
    const [hour, setHour] = useState('12:30');

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
    const hours = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

    const Dropdown = ({
                          label,
                          value,
                          options,
                          name,
                          onChange
                      }: {
        label: string,
        value: string,
        options: string[],
        name: string,
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    }) => {
        return (
            <div className="flex flex-col items-center">
                <div className="text-blue-600 text-sm font-medium mb-2">{label}</div>
                <div className="relative w-full">
                    <select
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full py-2 text-center appearance-none bg-white border-none focus:outline-none"
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>

                    {/* Up chevron at top */}
                    <div className="pointer-events-none absolute top-[-8px] w-full flex justify-center">
                        <div className="flex items-center px-2 text-gray-700">
                            <img src="/vectors/arrowUp.svg" alt="Dropdown" className="h-5 w-5" />
                        </div>
                    </div>

                    {/* Down chevron at bottom */}
                    <div className="pointer-events-none absolute bottom-[-8px] w-full flex justify-center">
                        <div className="flex items-center px-2 text-gray-700">
                            <img src="/vectors/arrowDown.svg" alt="Dropdown" className="h-5 w-5" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;

        switch(name) {
            case 'month':
                setMonth(value);
                break;
            case 'day':
                setDay(value);
                break;
            case 'hour':
                setHour(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/staticImages/HomeGreeting.webp')] bg-center bg-cover"></div>

            <div className="absolute inset-0 bg-blue-950 opacity-30"></div>

            <div className="relative z-10 p-8 pb-20 md:p-16 text-white">
                <div className="max-w-2xl mb-16 md:mb-24 text-center lg:text-left">
                    <h1 className=" text-[25px] sm:text-[40px] lg:text-[55px] font-bold mb-2">YOUR TRUSTED PARTNER IN BUSINESS TRANSFORMATION</h1>
                </div>

                <div className="flex flex-col gap-5 md:flex-row md:gap-0 w-full max-w-3xl ">
                    <div className="bg-white text-black grid grid-cols-3 flex-grow py-4 px-3 rounded-lg md:rounded-r-none">
                        <Dropdown
                            label="Month"
                            value={month}
                            options={months}
                            name="month"
                            onChange={handleChange}
                        />
                        <Dropdown
                            label="Day"
                            value={day}
                            options={days}
                            name="day"
                            onChange={handleChange}
                        />
                        <Dropdown
                            label="Hour"
                            value={hour}
                            options={hours}
                            name="hour"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="bg-[#033271] text-white px-6 py-4 flex flex-col justify-center items-center text-center rounded-lg md:rounded-l-none">
                        <ScrollNavButton
                            targetId="services"
                            to="/"
                            className="cursor-pointer font-medium text-sm"
                        >
                            Schedule a Free Consultation
                        </ScrollNavButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessTransformationHero;