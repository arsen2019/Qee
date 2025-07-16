import {useEffect, useState} from "react";
import FeedbackPopUp from "./popUps/FeedbackPopUp";
import FormDateSelector from "./FormDateSelector.tsx";
import ServicesDropdown from "./helperComponents/ServicesDropdown.tsx";
import { postData } from '../../utils/utils';
import {formatDateForSubmission} from '../../utils/serviceUtils.ts'

interface FormData {
    date: string;
    name: string;
    email: string;
    company: string;
    industry: string;
    phone: string;
    services: string[];
    otherService: string;
    message: string;
    contactMethod: "whatsapp" | "email" | "";
}

interface SubmissionData {
    date: string;
    name: string;
    email: string;
    company: string;
    industry: string | null;
    phone: string | null;
    services: string;
    message: string | null;
    contactMethod: "whatsapp" | "email" | null;
}

export default function ScheduleForm() {
    const [formData, setFormData] = useState<FormData>({
        date: "",
        name: "",
        email: "",
        company: "",
        industry: "",
        phone: "",
        services: [],
        otherService: "",
        message: "",
        contactMethod: ""
    });
    const [selectedDate, setSelectedDate] = useState<string>()

    useEffect(() => {
        const handler = (e: Event) => {
            const custom = e as CustomEvent<string>;
            setSelectedDate(custom.detail);
        };

        window.addEventListener('update-schedule-date', handler);

        return () => window.removeEventListener('update-schedule-date', handler);
    }, []);

    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
    const feedbackContent = "Thanks for scheduling a consultation. We will confirm your appointment shortly.";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleServicesChange = (services: string[]) => {
        setFormData({ ...formData, services });
    };

    const handleOtherServiceChange = (value: string) => {
        setFormData({ ...formData, otherService: value });
    };


    const validateAndCleanString = (value: string): string | null => {
        if (!value || value.trim() === '') {
            return null;
        }
        return value.trim();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let servicesArray = [...formData.services];

        if (formData.services.includes('other') && formData.otherService) {
            servicesArray = servicesArray.filter(s => s !== 'other');
            servicesArray.push(formData.otherService.trim());
        }

        const submissionData: SubmissionData = {
            date: formatDateForSubmission(selectedDate || formData.date),
            name: formData.name.trim(),
            email: formData.email.trim(),
            company: formData.company.trim(),
            industry: validateAndCleanString(formData.industry),
            phone: validateAndCleanString(formData.phone),
            services: servicesArray.join(", "),
            message: validateAndCleanString(formData.message),
            contactMethod: formData.contactMethod || null
        };

        console.log(submissionData);
        postData('/schedule', submissionData);
        setIsFeedbackOpen(true);
        setTimeout(() => setIsFeedbackOpen(false), 2000);
    };

    const handleContactMethodChange = (method: "whatsapp" | "email") => {
        setFormData({ ...formData, contactMethod: method });
    };

    return (
        <div className="bg-white p-6 rounded-lg lg:px-40 px-2 mb-10 mx-auto md:shadow-[0px_0px_20px_5px] shadow-gray-500">
            <h2 className="text-2xl font-semibold mb-6">Schedule a Free Consultation</h2>

            <form onSubmit={handleSubmit} id='schedule-form'>
                <div className="bg-white py-5 px-2 rounded-lg shadow-[0px_0px_10px_5px] shadow-gray-200 mb-6">
                    <FormDateSelector onDateChange={setSelectedDate}/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 text-[14px] md:text-[16px] gap-4 mb-4">
                    <div className="">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name Surname"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full  p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
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
                            required
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
                            type="tel"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </div>
                    <div>
                        <ServicesDropdown
                            selectedServices={formData.services}
                            onServicesChange={handleServicesChange}
                            otherService={formData.otherService}
                            onOtherServiceChange={handleOtherServiceChange}
                            placeholder="Services"
                        />
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