import { useState, useEffect, useRef } from "react";
import { useFormSubmission } from "../../hooks/useFormSubmission";
import { FormField } from "./form/FormField";
import { GeneralErrorAlert } from "./form/GeneralErrorAlert";
import { LoadingButton } from "./form/LoadingButton";
import FeedbackPopUp from "./popUps/FeedbackPopUp";
import {formatDateForSubmission} from "../../utils/serviceUtils.ts";

interface SubmissionData {
    name: string;
    email: string;
    company: string;
    industry: string | null;
    phone: string | null;
    services: string;
    message: string | null;
    contactMethod: "whatsapp" | "email" | null;
}


interface FormData {
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
        phone: '',
        services: [],
        otherService: '',
        message: '',
        contactMethod: ''
    });

    const [isServicesOpen, setIsServicesOpen] = useState<boolean>(false);
    const feedbackContent = "Thanks! We’ll be in touch within 24 hours";
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const {
        isLoading,
        errors,
        generalError,
        isSuccess,
        submitForm,
        clearErrors,
        clearFieldError,
    } = useFormSubmission();

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
    useEffect(() => {
        if (isSuccess) {
            setFormData({
                name: '',
                email: '',
                company: '',
                industry: '',
                phone: '',
                services: [],
                otherService: '',
                message: '',
                contactMethod: ''
            });
        }
    }, [isSuccess]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (errors[name]) {
            clearFieldError(name);
        }
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

        if (errors.services) {
            clearFieldError('services');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        let servicesArray = [...formData.services];

        const submissionData: SubmissionData = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            company: formData.company.trim(),
            industry: formData.industry,
            phone: formData.phone,
            services: servicesArray.join(", "),
            message: formData.message,
            contactMethod: formData.contactMethod || null
        };
        console.log(submissionData)

        const success = await submitForm('/touch', submissionData);

        if (success) {
            setIsFeedbackOpen(true);
            setTimeout(() => setIsFeedbackOpen(false), 2000);
        }
    };

    const handleContactMethodChange = (method: "whatsapp" | "email") => {
        setFormData({ ...formData, contactMethod: method });
        if (errors.contactMethod) {
            clearFieldError('contactMethod');
        }
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

            {/* General Error Alert */}
            {generalError && (
                <GeneralErrorAlert
                    message={generalError}
                    onClose={clearErrors}
                />
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField error={errors.name}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name Surname"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </FormField>

                    <FormField error={errors.email}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </FormField>

                    <FormField error={errors.company}>
                        <input
                            type="text"
                            name="company"
                            placeholder="Company"
                            value={formData.company}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </FormField>

                    <FormField error={errors.industry}>
                        <input
                            type="text"
                            name="industry"
                            placeholder="Industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />
                    </FormField>

                    <FormField error={errors.phone}>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
                        />

                    </FormField>

                    <div className="relative" ref={dropdownRef}>
                        <FormField error={errors.services}>
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
                        </FormField>

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
                                        <FormField error={errors.otherService}>
                                            <input
                                                type="text"
                                                name="otherService"
                                                placeholder="Please specify"
                                                value={formData.otherService}
                                                onChange={handleChange}
                                                onClick={(e) => e.stopPropagation()}
                                                className="w-full p-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </FormField>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mb-4">
                    <FormField error={errors.message}>
                        <textarea
                            name="message"
                            placeholder="How can we help you?"
                            value={formData.message}
                            onChange={handleChange}
                            rows={3}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </FormField>
                </div>

                <LoadingButton
                    type="submit"
                    isLoading={isLoading}
                    loadingText="Sending..."
                    disabled={isLoading}
                    className="w-full bg-[#033271] text-white py-2 px-4 rounded hover:bg-blue-900 transition duration-200"
                >
                    Send
                </LoadingButton>

                <div className="mt-6 flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                        <img src="/vectors/fluent_mail-12-regular%20(1).svg" alt="Email"
                             className="h-6 w-6 text-gray-700"/>
                        <a href="mailto:info@qee.agency" className="text-sm text-gray-700">info@qee.agency</a>
                    </div>
                </div>

                <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2">Choose preferred way to connect</p>
                    {errors.contactMethod && (
                        <p className="text-sm text-red-600 mb-1 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.contactMethod}
                        </p>
                    )}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => handleContactMethodChange("whatsapp")}
                            className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                formData.contactMethod === "whatsapp"
                                    ? "bg-green-300 text-white"
                                    : "bg-gray-200 text-gray-600"
                            } ${errors.contactMethod ? 'ring-2 ring-red-500' : ''}`}
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
                            } ${errors.contactMethod ? 'ring-2 ring-red-500' : ''}`}
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