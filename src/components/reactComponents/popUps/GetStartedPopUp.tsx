import {useEffect, useState} from "react";
import FeedbackPopUp from "./FeedbackPopUp.tsx";
import {postData} from '../../../utils/utils.ts';
import FormDateSelector from '../FormDateSelector.tsx';
import {createPortal} from "react-dom";
import ServicesDropdown from "../helperComponents/ServicesDropdown.tsx";
import {formatDateForSubmission} from '../../../utils/serviceUtils.ts'

interface IProps {
    style?: React.CSSProperties;
    buttonText: string;
}

interface FormData {
    date: string;
    name: string;
    email: string;
    phone: string;
    services: string[];
}

interface SubmissionData {
    date: string;
    name: string;
    email: string;
    phone: string;
    services: string;
}

export default function GetStartedPopUp({style, buttonText}: IProps) {
    const [getData, setGetData] = useState<FormData>({
        date: "",
        name: "",
        email: "",
        phone: "",
        services: [],
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

    const [isOpen, setIsOpen] = useState(false);
    const content = "Thanks! We’ll be in touch within 24 hours";
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [formData, setFormData] = useState(getData);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const validateAndCleanString = (value: string): string => {
        if (!value || value.trim() === '') {
            return "No phone";
        }
        return value.trim();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        let servicesArray = [...formData.services];

        const submissionData: SubmissionData = {
            date: formatDateForSubmission(selectedDate || formData.date),
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: validateAndCleanString(formData.phone),
            services: servicesArray.join(", "),
        }

        console.log(submissionData);
        postData('/touch', submissionData);
        setIsFeedbackOpen(true);
        setTimeout(() => setIsFeedbackOpen(false), 2000);
    };

    const handleServicesChange = (services: string[]) => {
        setFormData({...formData, services});
    };


    return (
        <div className='w-full'>
            <div className="btnDiv">
                <button className="open-btn md:text-[20px] text-[16px]" style={style}
                        onClick={() => setIsOpen(true)}>
                    {buttonText}
                </button>
            </div>

            {isOpen && createPortal(
                <div
                    className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[999]">
                    <div
                        className="modal-wrapper bg-white w-[95%] max-w-[800px] md:w-[60%] px-3 py-6 transition-all duration-300 transform scale-100 opacity-100 animate-fadeIn">
                        <div className="close-btn-div">
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <svg className='w-10 h-10' width="40" height="40" viewBox="0 0 40 40" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path className='w-10 h-10' id="Vector"
                                          d="M10.5257 30.9487L9.05139 29.4744L18.5257 20L9.05139 10.5256L10.5257 9.05133L20.0001 18.5257L29.4744 9.05133L30.9487 10.5256L21.4744 20L30.9487 29.4744L29.4744 30.9487L20.0001 21.4743L10.5257 30.9487Z"
                                          fill="#151515"/>
                                </svg>
                            </button>
                        </div>

                        <div className="modal-content flex justify-start gap-10 flex-col">
                            <h1 className='text-[#151515] text-[20px] md:text-[24px] lg:text-[36px] font-semibold'>
                                Request For Price Offer
                            </h1>

                            <FormDateSelector
                                onDateChange={(date) => setFormData(prev => ({...prev, date}))}
                            />

                            <form className="modal-form md:text-[20px] text-[16px]" onSubmit={handleSubmit}>
                                <div className="flex flex-col text-[#787676] gap-5">
                                    <input
                                        type="text"
                                        onChange={handleChange}
                                        required
                                        value={formData['name']}
                                        name='name'
                                        placeholder="Name"
                                        className="input-field"
                                    />
                                    <input
                                        type="email"
                                        onChange={handleChange}
                                        required
                                        value={formData['email']}
                                        name='email'
                                        placeholder="Email"
                                        className="input-field"
                                    />
                                    <input
                                        type="tel"
                                        step="0.01"
                                        onChange={handleChange}
                                        required
                                        value={formData['phone']}
                                        name='phone'
                                        placeholder="Phone, eg(+123)456789"
                                        className="input-field"
                                    />

                                    <ServicesDropdown
                                        selectedServices={formData.services}
                                        onServicesChange={handleServicesChange}
                                        placeholder="Services"
                                        onOtherServiceChange={() => {
                                        }}
                                        otherService={''}
                                    />
                                    <div className="send_btn flex justify-center w-full">
                                        <button type="submit" className="submit-btn w-full">Send</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>, document.body
            )}

            {isFeedbackOpen && <FeedbackPopUp content={content} onClose={() => setIsFeedbackOpen(false)}/>}
        </div>
    );
}
