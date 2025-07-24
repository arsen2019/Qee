import { useEffect, useState } from "react";
import FormDateSelector from '../FormDateSelector.tsx';
import { createPortal } from "react-dom";
import ServicesDropdown from "../helperComponents/ServicesDropdown.tsx";
import { formatDateForSubmission } from '../../../utils/serviceUtils.ts';
import { useFormSubmission } from "../../../hooks/useFormSubmission";
import { FormField } from "../form/FormField";
import { GeneralErrorAlert } from "../form/GeneralErrorAlert";
import { LoadingButton } from "../form/LoadingButton";
import FeedbackPopUp from "./FeedbackPopUp.tsx";

interface IProps {
    style?: React.CSSProperties;
    buttonText: string;
}

interface FormData {
    date: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    services: string[];
    otherService: string;
}

interface SubmissionData {
    date: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    services: string;
}

export default function GetStartedPopUp({ style, buttonText }: IProps) {
    const [formData, setFormData] = useState<FormData>({
        date: "",
        name: "",
        email: "",
        phone: "",
        company: "",
        services: [],
        otherService: "",
    });

    const [selectedDate, setSelectedDate] = useState<string>();
    const [isOpen, setIsOpen] = useState(false);
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
    const feedbackContent = "Thanks! We’ll be in touch within 24 hours";
    const {
        isLoading,
        errors,
        generalError,
        isSuccess,
        submitForm,
        clearErrors,
        clearFieldError,
    } = useFormSubmission();

    useEffect(() => {
        const handler = (e: Event) => {
            const custom = e as CustomEvent<string>;
            setSelectedDate(custom.detail);
        };

        window.addEventListener('update-schedule-date', handler);

        return () => window.removeEventListener('update-schedule-date', handler);
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setFormData({
                date: "",
                name: "",
                email: "",
                phone: "",
                company: "",
                services: [],
                otherService: "",
            });
            setSelectedDate(undefined);
        }
    }, [isSuccess]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            clearFieldError(name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();

        let servicesArray = [...formData.services];

        if (formData.services.includes('other') && formData.otherService) {
            servicesArray = servicesArray.filter(s => s !== 'other');
            servicesArray.push(formData.otherService.trim());
        }

        const submissionData: SubmissionData = {
            date: formatDateForSubmission(selectedDate || formData.date),
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone,
            company: formData.company,
            services: servicesArray.join(", "),
        };

        const success = await submitForm('/touch', submissionData);

        if (success) {
            setIsFeedbackOpen(true);
            setIsOpen(false)
            setTimeout(() => setIsFeedbackOpen(false), 2000);
        }
    };

    const handleServicesChange = (services: string[]) => {
        setFormData({ ...formData, services });
        if (errors.services) {
            clearFieldError('services');
        }
    };

    const handleOtherServiceChange = (value: string) => {
        setFormData({ ...formData, otherService: value });

        if (errors.otherService) {
            clearFieldError('otherService');
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        clearErrors();
    };

    return (
        <div className='w-full'>
            <div className="btnDiv">
                <button
                    className="open-btn md:text-[20px] text-[16px]"
                    style={style}
                    onClick={() => setIsOpen(true)}
                >
                    {buttonText}
                </button>
            </div>

            {isOpen && createPortal(
                <div className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
                    <div className="modal-wrapper bg-white w-[95%] max-w-[800px] md:w-[60%] max-h-[90%] overflow-scroll px-3 py-6 transition-all duration-300 transform scale-100 opacity-100 animate-fadeIn">
                        <div className="close-btn-div">
                            <button className="close-btn" onClick={handleCloseModal}>
                                <svg className='w-10 h-10' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className='w-10 h-10' id="Vector"
                                          d="M10.5257 30.9487L9.05139 29.4744L18.5257 20L9.05139 10.5256L10.5257 9.05133L20.0001 18.5257L29.4744 9.05133L30.9487 10.5256L21.4744 20L30.9487 29.4744L29.4744 30.9487L20.0001 21.4743L10.5257 30.9487Z"
                                          fill="#151515"/>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-content flex justify-start gap-5 !py-0 flex-col">
                            <h1 className='text-[#151515] text-[20px] md:text-[24px] lg:text-[36px] font-semibold'>
                                Request For Price Offer
                            </h1>
                            {/* General Error Alert */}
                            {generalError && (
                                <GeneralErrorAlert
                                    message={generalError}
                                    onClose={clearErrors}
                                />
                            )}

                            <div className=''>
                                <FormField error={errors.date}>
                                    <div>
                                        <FormDateSelector
                                            onDateChange={(date) => {
                                                setFormData(prev => ({ ...prev, date }));
                                                setSelectedDate(date);
                                            }}
                                        />
                                    </div>
                                </FormField>
                            </div>

                            <form className="modal-form md:text-[20px] text-[16px]" onSubmit={handleSubmit}>
                                <div className="flex flex-col text-[#787676] gap-5">
                                    <FormField error={errors.name}>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            required
                                            value={formData.name}
                                            name='name'
                                            placeholder="Name"
                                            className="input-field"
                                        />
                                    </FormField>

                                    <FormField error={errors.email}>
                                        <input
                                            type="email"
                                            onChange={handleChange}
                                            required
                                            value={formData.email}
                                            name='email'
                                            placeholder="Email"
                                            className="input-field"
                                        />
                                    </FormField>

                                    <FormField error={errors.company}>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            required
                                            value={formData.company}
                                            name='company'
                                            placeholder="Company"
                                            className="input-field"
                                        />
                                    </FormField>

                                    <FormField error={errors.phone}>
                                        <input
                                            type="tel"
                                            onChange={handleChange}
                                            required
                                            value={formData.phone}
                                            name='phone'
                                            placeholder="Phone, eg(+123)456789"
                                            className="input-field"
                                        />
                                    </FormField>

                                    <FormField error={errors.services}>
                                        <div>
                                            <ServicesDropdown
                                                selectedServices={formData.services}
                                                onServicesChange={handleServicesChange}
                                                placeholder="Services"
                                                onOtherServiceChange={handleOtherServiceChange}
                                                otherService={formData.otherService}
                                            />
                                        </div>
                                    </FormField>

                                    <div className="send_btn flex justify-center w-full">
                                        <LoadingButton
                                            type="submit"
                                            isLoading={isLoading}
                                            loadingText="Sending..."
                                            disabled={isLoading}
                                            className="submit-btn w-full"
                                        >
                                            Send
                                        </LoadingButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>, document.body
            )}

            {isFeedbackOpen && <FeedbackPopUp content={feedbackContent} onClose={() => setIsFeedbackOpen(false)}/>}
        </div>
    );
}