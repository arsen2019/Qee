import React, {useState, useEffect, useRef} from "react";
import ScrollNavButton from "./ScrollNavButton.tsx";
import {Collapse} from "antd";
import type {CollapseProps} from "antd";


interface Props {
    activePath: string;
}

const servicesItems: CollapseProps["items"] = [
    {
        key: "1",
        label: (
            <div className={`flex justify-end gap-4 items-center py-2  hover:text-[#3F5D8F] transition-all duration-300 text-[20px] ease-in-out
               text-black
            `}>
                Services
            </div>
        ),
        children: (
            <ul className="pl-5  space-y-2 flex flex-col justify-center items-end ">
                <li><a href="/services/internal_audit/"
                       className="text-md !text-black !text-[16px] hover:!text-[#3F5D8F]">Internal Audit</a></li>
                <li><a href="/services/it_audit/" className="text-md !text-black !text-[16px] hover:!text-[#3F5D8F]">IT
                    Audit</a></li>
                <li><a href="/services/eqa_audit/"
                       className="text-md !text-black !text-[16px] hover:!text-[#3F5D8F]">EQA</a></li>
                <li><a href="/services/it_support/" className="text-md !text-black !text-[16px] hover:!text-[#3F5D8F]">IT
                    Support</a></li>
                <li><a href="/services/financial_management/"
                       className="text-md !text-black !text-[16px] hover:!text-[#3F5D8F]">Financial Management</a></li>
            </ul>
        ),
    },
];

export default function HamburgerMenu({activePath}: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isOpen]);

    const links = [
        {path: "/", label: "Home"},
        {path: "/#services", label: "Services"},
        {path: "/blog", label: "Blog"},
        {path: "/contact", label: "Contact"},
    ];

    return (
        <div className="relative w-full flex justify-end py-4 lg:hidden">
            <img
                src="/vectors/Hamburger.svg"
                alt="hamburger"
                className="cursor-pointer w-8 h-8 z-50"
                style={{visibility: !isOpen ? "visible" : "hidden"}}
                onClick={toggleMenu}
            />

            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black transition-opacity duration-300 ${
                    isOpen ? "opacity-50 visible" : "opacity-0 invisible"
                }`}
                onClick={toggleMenu}
            ></div>

            {/* Slide-in menu */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-screen w-[300px] bg-white z-50 shadow-lg
        transform transition-transform duration-500 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                style={{boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.1)"}}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-5 right-5"
                >
                    <img
                        src="/vectors/close.svg"
                        alt="close"
                        className="w-6 h-6"
                    />
                </button>

                <ul className="mt-24 px-6 space-y-4 text-[20px]">
                    {links.map(({path, label}) => {
                        const isActive = path === "/"
                            ? activePath === "/"
                            : activePath.startsWith(path);
                        return (
                            <li key={path} className="group">
                                {label == "Services" ?

                                    <Collapse
                                        ghost
                                        expandIconPosition="end"
                                        className="bg-transparent border-none [&_.ant-collapse-header]:!p-0
                                                                                  [&_.ant-collapse-header]:!flex
                                                                                  [&_.ant-collapse:active]:!pr-5
                                                                                  [&_.ant-collapse-header]:!items-center
                                                                                  [&_.ant-collapse-content]:!pr-5
                                                                                  [&_.ant-collapse-arrow_svg]:w-[20px]
                                                                                  [&_.ant-collapse-arrow_svg]:h-[20px]
                                                                                  [&_.ant-collapse-content-box]:!p-0"
                                        items={servicesItems}
                                    />

                                    :

                                    <a
                                        href={path}
                                        className={`flex justify-end gap-4 items-center py-2 hover:pr-5 hover:text-[#3F5D8F] transition-all duration-300 ease-in-out ${
                                            isActive ? "text-[#3F5D8F] font-semibold pr-5" : "text-black"
                                        }`}
                                    >
                                        {label}

                                        <svg
                                            className="w-8 h-8"
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M24.7276 31.1057L23.2554 29.6475L31.8719 21.031H4.16672V18.937H31.8879L23.2693 10.3205L24.7276 8.86221L35.8493 19.984L24.7276 31.1057Z"
                                                className={`transition-colors duration-300 ${
                                                    isActive
                                                        ? "fill-[#3F5D8F]"
                                                        : "fill-[#151515] group-hover:fill-[#3F5D8F]"
                                                }`}
                                            />
                                        </svg>
                                    </a>
                                }
                                {isActive ? (
                                    <hr className="border-[#3F5D8F] mt-2"/>
                                ) : (
                                    <hr className="border-gray-200 mt-2"/>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
