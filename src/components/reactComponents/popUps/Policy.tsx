import {useState} from "react";
import "../../../styles/modal.css";


export default function Policy() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="">
            <div className="pointer">
                <p className='cursor-pointer' onClick={() => setIsOpen(true)}>Policy</p>
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
                                            Privacy Policy
                                        </h2>
                                    </div>
                                    <div className='introduction w-full flex flex-col gap-5  '>
                                        <p className='font-semibold'>Effective
                                            Date: {`${new Date().getDate()}/${new Date().getUTCMonth() + 1}/${new Date().getFullYear()}`}</p>
                                        <p className='font-semibold'>Last Updated: 9/6/2025</p>
                                        <p>At <span className='font-semibold'>QEE</span>, we value your privacy and are
                                            committed to protecting your personal
                                            and business information. This Privacy Policy outlines how we collect, use,
                                            disclose, and safeguard your data when you visit our website or engage our
                                            professional services.</p>
                                        <p>
                                            By accessing our site or using our services, you agree to the terms of this
                                            Privacy Policy.
                                        </p>
                                    </div>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">1. Information We Collect</h3>
                                        <p className="p-5 text-base text-gray-700">We may collect the following types of
                                            information:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li><span className='font-semibold'>Contact Details</span>: Name, email
                                                address, phone number, job title
                                            </li>
                                            <li><span className='font-semibold'>Business Information</span>: Company
                                                name, sector, location, audit or consulting requirements
                                            </li>
                                            <li><span className='font-semibold'>Service-Related Data</span>: Information
                                                you provide during service engagements (e.g. risk documentation,
                                                financial records, technical audits)
                                            </li>
                                            <li><span className='font-semibold'>Technical Data</span>: IP address,
                                                browser type, device information, site usage logs
                                            </li>
                                            <li><span className='font-semibold'>Communication Data</span>: Emails,
                                                inquiries, meeting notes, or service-related messages
                                            </li>
                                        </ul>
                                        <p className="p-5 text-base text-gray-700">We do <span
                                            className='font-semibold'>not</span> collect sensitive personal information
                                            (e.g., religious data, health information) unless required by law or
                                            explicitly authorized.</p>

                                    </div>

                                    <hr/>
                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">2. How We Use Your Information</h3>
                                        <p className="p-5 text-base text-gray-700">We use your data to:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>Deliver and manage our professional services
                                            </li>
                                            <li>Communicate with you about proposals, reports, and support</li>
                                            <li>Respond to inquiries and service requests
                                            </li>
                                            <li>Improve our website and internal processes
                                            </li>
                                            <li>Comply with regulatory and legal obligations
                                            </li>

                                        </ul>
                                        <p className="p-5 text-base text-gray-700">We do <span
                                            className='font-semibold'>not</span> sell or rent your personal data under
                                            any circumstances.</p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">3. Legal Basis for Processing (GDPR
                                            Alignment)</h3>
                                        <p className="p-5 text-base text-gray-700">We process your data under the
                                            following lawful bases:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li><span className='font-semibold'>Consent</span>: When you voluntarily
                                                provide data (e.g. through forms)
                                            </li>
                                            <li><span className='font-semibold'>Contractual Obligation</span>: To
                                                fulfill service agreements or proposals
                                            </li>
                                            <li><span className='font-semibold'>Legal Compliance</span>: When required
                                                by law, regulation, or professional standards
                                            </li>
                                            <li><span className='font-semibold'>Legitimate Interest</span>: To improve
                                                our services and manage client relationships
                                            </li>
                                        </ul>
                                        <p className="p-5 text-base text-gray-700">This confidentiality obligation shall
                                            survive termination of services for a period of <span className='font-bold'>five (5) years</span>.
                                        </p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">4. Confidentiality & Data Sharing</h3>
                                        <p className="p-5 text-base text-gray-700">Your data is handled with strict
                                            confidentiality.</p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">5. Data Security</h3>
                                        <p className="p-5 text-base text-gray-700">We implement appropriate technical
                                            and organizational safeguards, including:</p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>Secure access controls
                                            </li>
                                            <li>Data encryption and firewalls
                                            </li>
                                            <li>Role-based data access
                                            </li>
                                            <li>Routine security audits
                                            </li>
                                        </ul>

                                        <p className="p-5 text-base text-gray-700">Despite best efforts, no digital
                                            platform is entirely immune to risk. Please avoid sending highly sensitive
                                            data via email or unsecured means.
                                        </p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">6. International Transfers</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            If we process or store data outside your jurisdiction (e.g., in cloud
                                            services), we use recognized safeguards such as:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Standard Contractual Clauses (SCCs)
                                            </li>
                                            <li>
                                                Data Processing Agreements (DPAs)
                                            </li>
                                            <li>
                                                Services with verified international compliance (e.g., ISO 27001, GDPR)
                                            </li>
                                        </ul>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">7. Your Rights</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            Depending on applicable law, you may have the right to:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Depending on applicable law, you may have the right to:
                                            </li>
                                            <li>
                                                Request correction or deletion of your data
                                            </li>
                                            <li>
                                                Object to or restrict processing
                                            </li>
                                            <li>
                                                Withdraw consent (where processing is based on consent)
                                            </li>
                                            <li>
                                                File a complaint with a relevant data protection authority
                                            </li>
                                        </ul>

                                        <p className="p-5 text-base text-gray-700">To exercise any of these rights,
                                            please contact us using the details below.
                                        </p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">8. Cookies and Website Tracking</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            Our website may use cookies or analytics tools to:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Understand how visitors use the site
                                            </li>
                                            <li>
                                                Improve content and navigation
                                            </li>
                                        </ul>

                                        <p className="p-5 text-base text-gray-700">You may disable cookies in your
                                            browser settings, though some functionality may be affected.
                                        </p>

                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">9. Data Retention</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            We retain personal and service-related data only as long as necessary to:
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 p-4">
                                            <li>
                                                Fulfill the original purpose of collection
                                            </li>
                                            <li>
                                                Comply with legal and regulatory requirements
                                            </li>
                                            <li>
                                                Maintain audit trails or records of engagements (typically up to 7
                                                years)
                                            </li>
                                        </ul>

                                        <p className="p-5 text-base text-gray-700">
                                            When data is no longer needed, we securely delete or anonymize it.
                                        </p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">10. Third-Party Links</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            Our website may include links to external sites (e.g., partner firms or
                                            regulatory bodies). We are not responsible for their privacy practices or
                                            content. Please review their policies separately.
                                        </p>
                                    </div>

                                    <hr/>

                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">11. Policy Updates</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            We may update this Privacy Policy to reflect changes in law, technology, or
                                            our services. Updates will be posted on this page with a revised “Last
                                            Updated” date. Continued use of our website or services after updates
                                            constitutes acceptance.
                                        </p>
                                    </div>

                                    <hr/>
                                    <div className="py-5">
                                        <h3 className="font-semibold text-2xl">12. Contact Us</h3>
                                        <p className="p-5 text-base text-gray-700">
                                            If you have any questions, requests, or concerns regarding this Privacy Policy or your personal data, please contact:
                                        </p>
                                        <p className='font-semibold'>Email: info@qee.com</p>
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

