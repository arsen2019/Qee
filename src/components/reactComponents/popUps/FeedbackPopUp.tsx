import {useState} from "react";
import "../../../styles/modal.css";
import {createPortal} from "react-dom";

interface FeedbackPopUpProps {
    content: string;
    onClose: () => void;
}

export default function FeedbackPopUp({content, onClose}: FeedbackPopUpProps) {

    return (

        createPortal(<div className="modal-overlay">
            <div className="modal-wrapper w-[85%] max-w-[800px] transition-all duration-300 transform scale-100 opacity-100 animate-fadeIn">
                <div className="close-btn-div">
                    <button className="close-btn" onClick={onClose}>
                        <svg className='w-10 h-10' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='w-10 h-10'   id="Vector" d="M10.5257 30.9487L9.05139 29.4744L18.5257 20L9.05139 10.5256L10.5257 9.05133L20.0001 18.5257L29.4744 9.05133L30.9487 10.5256L21.4744 20L30.9487 29.4744L29.4744 30.9487L20.0001 21.4743L10.5257 30.9487Z" fill="#151515"/>
                        </svg>
                    </button>
                </div>

                <div className="modal-content text-[#151515] flex flex-col justify-center gap-5 p-20 items-center">
                    <h1 className='text-2xl md:text-4xl font-semibold'>Thank you</h1>
                    <p className='font-semibold'>{content}</p>
                    <img src="/vectors/feedbackSucces.svg" alt="succes" className='w-20 h-20'/>
                </div>


            </div>

        </div>, document.body)

    );

}

