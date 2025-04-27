import {useState} from 'react';

interface FAQItem {
    id: string;
    question: string;
    answer: React.ReactNode;
}

const FAQAccordion: React.FC = () => {
    const [openAccordion, setOpenAccordion] = useState<number | null>(0);

    const faqItems: FAQItem[] = [
        {
            id: 'basic-heading-one-with-arrow',
            question: 'What consulting services do you offer?',
            answer: 'We provide a full range of consulting and assurance services including internal audit, IT audit, IT support, cybersecurity, governance advisory, financial management, and External Quality Assessments (EQA) of internal audit functions. Each service is tailored to your organization\'s goals, risk profile, and industry requirements.'
        },
        {
            id: 'basic-heading-one-with-arrow',
            question: 'Why should we outsource our internal audit or EQA?',
            answer: 'Outsourcing your internal audit or EQA brings independent perspective, specialized expertise, and alignment with international standards like the GIAS. Our team ensures your organization meets compliance requirements while uncovering strategic opportunities to improve governance, risk management, and operational efficiency.'
        },
        {
            id: 'basic-heading-one-with-arrow',
            question: 'How do your financial management services help businesses grow?',
            answer: 'We support your business with accurate bookkeeping (QuickBooks & Xero), IFRS-compliant financial statements, budgeting, forecasting, and cost analysis. These services give you the financial clarity to make confident decisions and plan for sustainable growth.'
        },
        {
            id: 'basic-heading-one-with-arrow',
            question: 'What industries do you work with?',
            answer: 'Our experts have experience across sectors including financial services, public sector, technology, and regulated industries. We understand the specific risks, compliance obligations, and operational challenges that different organizations face.'
        },

        {
            id: 'basic-heading-one-with-arrow',
            question: 'Are your team members certified?',
            answer: (
                <>
                    Yes. Our consultants hold globally recognized certifications such as
                    <strong className="font-semibold "> CIA (Certified Internal Auditor), CISA (Certified Information Systems Auditor), CMA (Certified Management Accountant), and MBA degrees</strong>,
                    . With 10+ years of experience on average, we combine technical depth with strategic insight.
                </>
            )
        },
        {
            id: 'basic-heading-one-with-arrow',
            question: 'What makes your approach different?',
            answer: (
                <>
                    We follow our proprietary
                    <strong className="font-semibold "> QEE framework—Quality, Efficiency, and Effectiveness</strong>,
                    —to ensure every engagement delivers actionable insights, not just compliance checkboxes. We partner
                    with you closely to create custom, scalable solutions that align with international standards and
                    real-world needs.
                </>
            )
        },
        {
            id: 'basic-heading-one-with-arrow',
            question: 'How long does it take to complete an EQA or internal audit setup?',
            answer: 'Timeframes vary depending on scope, but most EQAs and internal audit transformation projects are completed within 4–8 weeks. We always define clear milestones and keep you informed every step of the way.'
        },
        {
            id: 'basic-heading-one-with-arrow',
            question: 'How can I request a quote or schedule a consultation?',
            answer: 'You can easily schedule a free consultation through our website. Just fill out the short form and our team will be in touch within 24 hours to understand your needs and next steps.'
        },
    ];

    const toggleAccordion = (index: number): void => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    return (
        <section className="py-10">
            <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8">
                <div className="accordion-group" data-accordion="default-accordion">
                    {faqItems.map((item, index) => (
                        <div
                            key={index}
                            className={`accordion py-8 px-6 shadow-xl ${
                                index < faqItems.length - 1 ? 'border-b border-solid border-gray-200' : ''
                            } transition-all duration-500 rounded-2xl  ${
                                openAccordion === index ? 'active' : ''
                            }`}
                            id={item.id}
                        >
                            <button
                                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-[#151515] w-full transition duration-500 text-left hover:text-[#3F5D8F]"
                                style={{
                                    fontWeight: openAccordion === index ? '' : 'normal',
                                    color: openAccordion === index ? '#3F5D8F' : ''
                                }}
                                aria-controls={`basic-collapse-${index}-with-arrow`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <h5>{item.question}</h5>
                                <svg
                                    className={`text-gray-500 transition duration-500 group-hover:text-[#3F5D8F] ${
                                        openAccordion === index ? 'text-[#3F5D8F] rotate-180' : ''
                                    }`}
                                    width="22"
                                    height="22"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </svg>
                            </button>
                            <div
                                id={`basic-collapse-${index}-with-arrow`}
                                className="accordion-content w-full px-0 overflow-hidden"
                                aria-labelledby={item.id}
                                style={{
                                    maxHeight: openAccordion === index ? '350px' : '0px',
                                    transition: 'max-height 0.5s ease-in-out',
                                }}
                            >
                                <p className="text-base text-[#151515] leading-6">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQAccordion;