import { useState, useEffect, useRef } from "react";
import FeedbackPopUp from "./popUps/FeedbackPopUp";
import { postData } from '../../utils/utils';

interface FormData {
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

export default function GetInTouchForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        industry: '',
        position: '',
        services: [],
        otherService: '',
        message: '',
        contactMethod: ''
    });

    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
    const feedbackContent = "Thanks for getting in touch. We'll get back to you shortly.";
    const dropdownRef = useRef<HTMLDivElement>(null);

    const services: ServiceOption[] = [
        { id: 'consulting', label: 'Consulting' },
        { id: 'development', label: 'Development' },
        { id: 'design', label: 'Design' },
        { id: 'marketing', label: 'Marketing' },
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsServicesOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        const submissionData = { ...formData };
        if (formData.services.includes('other') && formData.otherService) {
            submissionData.services = formData.services.filter(s => s !== 'other');
            submissionData.services.push(formData.otherService);
        }

        postData('/contact', submissionData);

        setIsFeedbackOpen(true);
        setTimeout(() => setIsFeedbackOpen(false), 2000);

        // Reset form after submission
        setFormData({
            name: '',
            email: '',
            company: '',
            industry: '',
            position: '',
            services: [],
            otherService: '',
            message: '',
            contactMethod: 'whatsapp'
        });
    };

    const handleContactMethodChange = (method: "whatsapp" | "email") => {
        setFormData({ ...formData, contactMethod: method });
    };

    const displaySelectedServices = () => {
        if (formData.services.length === 0) return "Select Services";

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
        <div className="bg-white p-6 rounded-lg md:shadow-[0px_0px_20px_5px] shadow-gray-500 lg:px-40 px-10 mb-10 mx-auto shadow" data-aos="fade-up"
             data-aos-anchor-placement="top-center">
            <h2 className="text-2xl font-semibold mb-5">Get In Touch</h2>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                    <div className="relative " ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setIsServicesOpen(!isServicesOpen)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2  focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center"
                        >
                            <span className={formData.services.length === 0 ? "text-gray-500" : ""}>
                                {displaySelectedServices()}
                            </span>
                            <img src="/vectors/arrowDown.svg" alt="Dropdown" className="h-4 w-4 " />
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
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent "
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#033271] text-white py-2 px-4 rounded hover:bg-blue-900 transition duration-200"
                >
                    Send
                </button>

                <div className="mt-6 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <img src="/vectors/fluent_mail-12-regular%20(1).svg" alt="Email"
                             className="h-6 w-6 text-gray-700"/>
                        <a href="mailto:info@qee.agency" className="text-sm text-gray-700">info@qee.agency</a>
                    </div>
                </div>

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

                <div className="mt-4 flex space-x-4">
                    <a href="#" className="text-blue-800">
                        <img src="/vectors/akar-icons_facebook-fill%20(1).svg" alt="Facebook" className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-blue-800">
                        <img src="/vectors/bxl_instagram-alt%20(1).svg" alt="Instagram" className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-blue-800">
                        <img src="/vectors/LinkedInNeg.svg" alt="Linkedin Negative" className="h-8 w-8" />
                    </a>
                </div>
            </form>

            {isFeedbackOpen && <FeedbackPopUp content={feedbackContent} onClose={() => setIsFeedbackOpen(false)} />}
        </div>
    );
}