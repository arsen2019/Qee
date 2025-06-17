// src/components/reactComponents/ScrollNavButton.tsx
import { useEffect } from "react";

interface Props {
    targetId: string;
    to: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function ScrollNavButton({ targetId, to, children, className,onClick }: Props) {
    const handleClick = () => {
        if (window.location.pathname === to) {
            scrollToTarget();
        } else {
            sessionStorage.setItem("scrollTarget", targetId);
            window.location.href = to;
        }
    };

    const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useEffect(() => {
        const storedId = sessionStorage.getItem("scrollTarget");
        if (storedId) {
            const el = document.getElementById(storedId);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                    sessionStorage.removeItem("scrollTarget");
                }, 100);
            }
        }
    }, []);

    return (
        <button onClick={handleClick} className={className}>
            {children}
        </button>
    );
}
