import {useState} from "react";
import "../../../styles/modal.css";


export default function Terms() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="">
            <div className="pointer">
                <p className='cursor-pointer' onClick={() => setIsOpen(true)}>Terms</p>
            </div>
            {isOpen && (
                <div className="modal-overlay">
                    <div className="flex flex-col">

                        <div className=" w-[90%] max-w-[1200px] p-0 mx-auto">

                            <div className="close-btn-div bg-[#fff] py-5 ">
                                <button className="close-btn mr-5" onClick={() => setIsOpen(false)}>
                                    <svg className='invert' width="20" height="20" viewBox="0 0 20 20" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M2.53332 19.3333L0.666656 17.4667L8.13332 10L0.666656 2.53333L2.53332 0.666668L9.99999 8.13333L17.4667 0.666668L19.3333 2.53333L11.8667 10L19.3333 17.4667L17.4667 19.3333L9.99999 11.8667L2.53332 19.3333Z"
                                            fill="white"/>
                                    </svg>

                                </button>
                            </div>
                            <div className="mx-auto w-[80wh] text-[#000] h-[80vh] overflow-y-scroll bg-white">
                                <div className="px-5 md:px-20 pb-10">
                                    <div className="border-b-2 border-gray-400">
                                        <h2 className="text-3xl font-medium pb-5 cursor-pointer">
                                            Terms of Service
                                        </h2>
                                    </div>
                                    <div className='introduction w-full flex flex-col gap-5  '>
                                        <h3 className='font-semibold'>Effective
                                            Date: {`${new Date().getDate()}/${new Date().getUTCMonth() + 1}/${new Date().getFullYear()}`}</h3>
                                        <p>Welcome to QEE (“we”, “our”, or “us”). These Terms of Service (“Terms”)
                                            govern your access to and use of our website and all professional services
                                            provided by us, including but not limited to internal audit, IT audit,
                                            cybersecurity, governance, external assurance, and financial management
                                            advisory.</p>
                                        <p>
                                            By using our website or engaging our services, you agree to be bound by
                                            these Terms. If you do not agree, please do not use our website or services.
                                        </p>
                                    </div>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">1. Services Offered</h3>
                                        <p className="p-5 text-base text-gray-700">We provide professional consulting
                                            and assurance services, including:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>Internal Audit & Risk Assessment
                                            </li>
                                            <li>IT Audit & External Assurance</li>
                                            <li>IT Governance & Cybersecurity Advisory</li>
                                            <li>IT Support Services</li>
                                            <li>External Quality Assessment (EQA)</li>
                                        </ul>
                                        <p className="p-5 text-base text-gray-700">Each engagement is governed by a
                                            separate agreement or proposal detailing scope, fees, and timelines.</p>

                                    </div>

                                    <hr/>
                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">2. Client Responsibilities</h3>
                                        <p className="p-5 text-base text-gray-700">Clients agree to:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>Provide complete, accurate, and timely information needed for service
                                                delivery.
                                            </li>
                                            <li>Collaborate actively during planning, execution, and review phases.</li>
                                            <li>Ensure all supplied materials comply with applicable legal and
                                                regulatory standards.
                                            </li>
                                        </ul>
                                        <p className="p-5 text-base text-gray-700">We are not responsible for delays or
                                            limitations in service caused by incomplete or inaccurate information
                                            provided by the client.</p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">3. Confidentiality & Non-Disclosure</h3>
                                        <p className="p-5 text-base text-gray-700">We treat all client data, documents,
                                            and reports as strictly confidential. We will not disclose any confidential
                                            information to third parties without written consent, except:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>When legally required (e.g., by regulators or courts).
                                            </li>
                                            <li>When disclosure is necessary to provide services, under confidentiality
                                                obligations.
                                            </li>
                                        </ul>
                                        <p className="p-5 text-base text-gray-700">This confidentiality obligation shall
                                            survive termination of services for a period of <span className='font-bold'>five (5) years</span>.
                                        </p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">4. Conflict of Interest</h3>
                                        <p className="p-5 text-base text-gray-700">We actively monitor potential
                                            conflicts of interest and will promptly disclose any such situation. In the
                                            event of a conflict, we will act professionally to resolve or manage it in a
                                            transparent and ethical manner.</p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">5. Compliance with Laws &
                                            Regulations</h3>
                                        <p className="p-5 text-base text-gray-700">We comply with all applicable laws
                                            and industry standards, including:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>Local laws and regulations in Armenia
                                            </li>
                                            <li>International standards in data privacy and information security (e.g.,
                                                GDPR where applicable)
                                            </li>
                                            <li>ISO-aligned best practices in internal controls and audit
                                                methodologies
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">6. Intellectual Property</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            Unless otherwise agreed in writing:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                We retain ownership of all templates, frameworks, and methodologies used
                                                in our services.
                                            </li>
                                            <li>
                                                Final deliverables become the client’s property only after full payment.
                                            </li>
                                            <li>
                                                Clients may use deliverables solely for internal business use.
                                            </li>
                                        </ul>
                                        <p className="p-5 text-base text-gray-700">
                                            We reserve the right to display anonymized versions of our work in our
                                            professional portfolio unless otherwise restricted.
                                        </p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">7. Payment Terms</h3>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Fees and terms are outlined in service-specific proposals or contracts.
                                            </li>
                                            <li>
                                                A deposit may be required prior to project commencement.
                                            </li>
                                            <li>
                                                Invoices are due within the timeline specified; late payments may result
                                                in delays or interest charges.
                                            </li>
                                            <li>
                                                No refunds are provided for services already rendered or in progress.
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">8. No Guarantee of Outcomes</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            Our services are based on professional expertise and industry standards.
                                            However, we do not guarantee specific financial results, regulatory
                                            approvals, or business outcomes. Clients remain responsible for
                                            implementation of recommendations.
                                        </p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">9. Limitation of Liability</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            To the fullest extent permitted by law:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                We are not liable for indirect, incidental, or consequential damages
                                                (including loss of profits, data, or business opportunity).
                                            </li>
                                            <li>
                                                Our total liability for any claim shall not exceed the total amount paid for the specific service rendered.
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">10. Termination</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            Either party may terminate an engagement by written notice. Upon termination:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Work completed up to that point will be invoiced and payable.
                                            </li>
                                            <li>
                                                Confidentiality and data protection clauses remain in effect.
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">11. Third-Party Services</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            If our services involve use of third-party software or platforms (e.g., audit tools, cloud services), we are not liable for those platforms' functionality, accuracy, or availability.
                                        </p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">12. Dispute Resolution</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            In the event of a dispute, both parties agree to:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Attempt resolution through informal negotiation or mediation.
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">13. Changes to These Terms</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            We may revise these Terms at any time. Updates will be posted on our website. Continued use of our services after such changes constitutes acceptance.
                                        </p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">14. Contact Us</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            If you have any questions about these Terms, please contact us at:
                                        </p>
                                        <p className='font-semibold'>Email: info@qee.agency</p>
                                        <p className='font-semibold'>Phone: +374000000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );

}

