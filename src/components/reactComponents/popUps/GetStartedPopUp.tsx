import {useState} from "react";
import FeedbackPopUp from "./FeedbackPopUp.tsx";
import {postData} from '../../../utils/utils.ts';

interface IProps {
    style?: React.CSSProperties;
    buttonText: string;
}

export default function GetStartedPopUp({style, buttonText}: IProps) {
    const formStruct = {
        name: '',
        company: '',
        phone: '',
    }
    const [isOpen, setIsOpen] = useState(false);
    const content = "Your request for a price quote has been sent."
    const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
    const [formData, setFormData] = useState(formStruct);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        // if (name === "text" && value.length > 500) return;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsOpen(false);
        setIsFeedbackOpen(true);
        setTimeout(() => setIsFeedbackOpen(false), 2000);
        postData('/subscriptions', formData)
    }

    return (
        <div className='w-full'>
            <div className="btnDiv">
                <button className="open-btn md:text-[20px] text-[16px]" style={style} onClick={() => setIsOpen(true)}>
                    {buttonText}
                </button>
            </div>



            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-wrapper shadow-lg">
                        <div className="close-btn-div">
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                <svg className='w-10 h-10' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className='w-10 h-10'   id="Vector" d="M10.5257 30.9487L9.05139 29.4744L18.5257 20L9.05139 10.5256L10.5257 9.05133L20.0001 18.5257L29.4744 9.05133L30.9487 10.5256L21.4744 20L30.9487 29.4744L29.4744 30.9487L20.0001 21.4743L10.5257 30.9487Z" fill="#151515"/>
                                </svg>

                            </button>
                        </div>
                        <div className="modal-content">
                            <form className="modal-form " onSubmit={handleSubmit}>
                                <div className=" flex flex-col text-[#787676] gap-5">
                                    <input type="text" onChange={handleChange} required={true}
                                           value={formData['name']} name='name' placeholder="Name"
                                           className="input-field"/>
                                    <input type="text" onChange={handleChange} required={true}
                                           value={formData['company']} name='company' placeholder="Company"
                                           className="input-field"/>
                                    <input type={'tel'} step="0.01" onChange={handleChange} required={true}
                                           value={formData['phone']} name='phone' placeholder="Phone, eg(+123)456789"
                                           className="input-field"/>
                                    <div className="send_btn flex justify-center w-full">
                                        <button type="submit" className="submit-btn w-full">Send</button>
                                    </div>
                                </div>


                            </form>

                        </div>
                    </div>

                </div>
            )}
            {isFeedbackOpen && <FeedbackPopUp content={content} onClose={() => setIsFeedbackOpen(false)}/>}
        </div>
    );


}

