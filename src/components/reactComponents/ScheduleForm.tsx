import { useState } from "react";
import FeedbackPopUp from "./popUps/FeedbackPopUp";
import { postData } from '../../utils/utils';

interface FormData {
    month: string;
    day: number;
    hour: string;
    name: string;
    email: string;
    company: string;
    industry: string;
    position: string;
    services: string[];
    otherService: string;
    message: string;
    contactMethod: "whatsapp" | "email" | "";
}

interface ServiceOption {
    id: string;
    label: string;
}

export default function ScheduleForm() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = [
        "9:00", "9:30", "10:00", "10:30", "11:00", "11:30",
        "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
        "15:00", "15:30", "16:00", "16:30", "17:00"
    ];

    const services: ServiceOption[] = [
        { id: 'consulting', label: 'Consulting' },
        { id: 'development', label: 'Development' },
        { id: 'design', label: 'Design' },
        { id: 'marketing', label: 'Marketing' },
    ];

    const [formData, setFormData] = useState<FormData>({
        month: "April",
        day: 15,
        hour: "12:30",
        name: "",
        email: "",
        company: "",
        industry: "",
        position: "",
        services: [],
        otherService: "",
        message: "",
        contactMethod: ""
    });

    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const feedbackContent = "Thanks for scheduling a consultation. We will confirm your appointment shortly.";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleServiceChange = (serviceId: string) => {
        const updatedServices = [...formData.services];

        if (updatedServices.includes(serviceId)) {
            const index = updatedServices.indexOf(serviceId);
            updatedServices.splice(index, 1);
        } else {
            updatedServices.push(serviceId);
        }

        setFormData({ ...formData, services: updatedServices });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare data for submission
        const submissionData = { ...formData };
        if (formData.services.includes('other') && formData.otherService) {
            submissionData.services = formData.services.filter(s => s !== 'other');
            submissionData.services.push(formData.otherService);
        }

        postData('/schedule-consultation', submissionData);
        setIsFeedbackOpen(true);
        setTimeout(() => setIsFeedbackOpen(false), 2000);
    };

    const handleContactMethodChange = (method: "whatsapp" | "email") => {
        setFormData({ ...formData, contactMethod: method });
    };

    const displaySelectedServices = () => {
        if (formData.services.length === 0) return "Service";

        const selectedServiceLabels = formData.services
            .filter(id => id !== 'other')
            .map(id => services.find(s => s.id === id)?.label || id);

        if (formData.services.includes('other')) {
            if (formData.otherService && formData.otherService.trim() !== '') {
                selectedServiceLabels.push(formData.otherService);
            } else {
                selectedServiceLabels.push('Other');
            }
        }

        return selectedServiceLabels.join(', ');
    };

    return (
        <div className="bg-white p-6 rounded-lg lg:px-40 px-10 mb-10 mx-auto md:shadow-[0px_0px_20px_5px] shadow-gray-500">
            <h2 className="text-2xl font-semibold mb-6">Schedule a Free Consultation</h2>

            <form onSubmit={handleSubmit}>
                <div className="bg-white p-5 rounded-lg shadow-lg mb-6">
                    <div className="flex flex-row divide-x">
                        {/* Month selection */}
                        <div className="flex-1 px-2 sm:px-4 mb-3 sm:mb-0">
                            <label className="block text-center text-gray-700 mb-1 text-sm">Month</label>
                            <div className="relative">
                                <select
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="w-full py-1 text-center appearance-none bg-white border-none focus:outline-none"
                                >
                                    {months.map((month) => (
                                        <option key={month} value={month}>
                                            {month}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <img src="/vectors/arrowDown.svg" alt="Dropdown" className="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        {/* Day selection */}
                        <div className="flex-1 px-2 sm:px-4 mb-3 sm:mb-0">
                            <label className="block text-center text-gray-700 mb-1 text-sm">Day</label>
                            <div className="relative">
                                <select
                                    name="day"
                                    value={formData.day}
                                    onChange={handleChange}
                                    className="w-full py-1 text-center appearance-none bg-white border-none focus:outline-none"
                                >
                                    {days.map((day) => (
                                        <option key={day} value={day}>
                                            {day}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <img src="/vectors/arrowDown.svg" alt="Dropdown" className="h-4 w-4" />
                                </div>
                            </div>
                        </div>

                        {/* Hour selection */}
                        <div className="flex-1 px-2 sm:px-4">
                            <label className="block text-center text-gray-700 mb-1 text-sm">Hour</label>
                            <div className="relative">
                                <select
                                    name="hour"
                                    value={formData.hour}
                                    onChange={handleChange}
                                    className="w-full py-1 text-center appearance-none bg-white border-none focus:outline-none"
                                >
                                    {hours.map((hour) => (
                                        <option key={hour} value={hour}>
                                            {hour}
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <img src="/vectors/arrowDown.svg" alt="Dropdown" className="h-4 w-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name Surname"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="industry"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </div>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center"
                        >
                            <span className={formData.services.length === 0 ? "text-gray-500" : ""}>
                                {displaySelectedServices()}
                            </span>
                            <img src="/vectors/arrowDown.svg" alt="Dropdown" className="h-4 w-4" />
                        </button>

                        {isServicesOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto">
                                {services.map((service) => (
                                    <div
                                        key={service.id}
                                        className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                        onClick={() => handleServiceChange(service.id)}
                                    >
                                        <input
                                            type="checkbox"
                                            id={`service-${service.id}`}
                                            checked={formData.services.includes(service.id)}
                                            onChange={() => {}}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`service-${service.id}`} className="text-gray-700 cursor-pointer">
                                            {service.label}
                                        </label>
                                    </div>
                                ))}
                                <div
                                    className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleServiceChange('other')}
                                >
                                    <input
                                        type="checkbox"
                                        id="service-other"
                                        checked={formData.services.includes('other')}
                                        onChange={() => {}}
                                        className="mr-2"
                                    />
                                    <label htmlFor="service-other" className="text-gray-700 cursor-pointer">
                                        Other
                                    </label>
                                </div>

                                {formData.services.includes('other') && (
                                    <div className="px-3 py-2 border-t border-gray-200">
                                        <input
                                            type="text"
                                            name="otherService"
                                            placeholder="Please specify"
                                            value={formData.otherService}
                                            onChange={handleChange}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <textarea
                        name="message"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#033271] text-white py-2 px-4 rounded hover:bg-blue-900 transition duration-200"
                >
                    Send
                </button>

                <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Choose preferred way to connect</p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleContactMethodChange("whatsapp")}
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                formData.contactMethod === "whatsapp"
                                    ? "bg-green-300 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            <img src="/vectors/whatsapp.svg" alt="WhatsApp" className="h-8 w-8" />
                        </button>
                        <button
                            type="button"
                            onClick={() => handleContactMethodChange("email")}
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                formData.contactMethod === "email"
                                    ? "bg-blue-300 text-white"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            <img src="/vectors/fluent_mail-12-regular%20(1).svg" alt="Email" className="h-8 w-8" />
                        </button>
                    </div>
                </div>
            </form>

            {isFeedbackOpen && <FeedbackPopUp content={feedbackContent} onClose={() => setIsFeedbackOpen(false)} />}
        </div>
    );
}