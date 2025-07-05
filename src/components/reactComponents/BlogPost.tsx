import React, { useState, useEffect, useRef } from "react";
import '../../styles/global.css';

interface BlogPostProps {
    imageUrl: string;
    date: string;
    title: string;
    intro: string;
    description: string;
}

const BlogPost: React.FC<BlogPostProps> = ({
                                               imageUrl,
                                               date,
                                               title,
                                               intro,
                                               description,
                                           }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const postRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        if (isExpanded && postRef.current && !postRef.current.contains(e.target as Node)) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isExpanded]);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            <div
                ref={postRef}
                onClick={() => !isExpanded && toggleExpanded()}
                className="relative rounded-2xl overflow-hidden group w-full h-[400px] md:h-[700px] xl:h-[500px] shadow-lg z-11"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute top-5 bg-[#003B71] text-white px-3 py-1 text-sm font-medium z-10">
                    {date}
                </div>

                <div
                    className={`absolute inset-x-0 bottom-0 w-full bg-[#003B71] text-white px-6 md:px-10 py-4
                    transition-all duration-500 ease-in-out rounded-t-2xl flex flex-col justify-center
                    ${isExpanded ? 'h-full' : 'h-[40%]'}`}
                >
                    <div className="transition-all duration-500 ease-in-out">
                        <h3 className="md:text-[20px] text-[16px] font-bold">{title}</h3>
                        <p className="md:text-[16px] text-[14px]">{intro}</p>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleExpanded();
                        }}
                        className="text-left text-sm text-white/80 hover:text-white mt-2 transition-colors duration-300"
                    >
                        {isExpanded ? 'Show less ←' : 'Read more →'}
                    </button>

                    <div
                        className={`overflow-hidden mt-4 text-sm transition-all duration-500 ease-in-out custom-scrollbar
                        ${isExpanded ? 'opacity-100 max-h-[400px] md:max-h-[500px] overflow-y-auto' : 'opacity-0 max-h-0'}`}
                    >
                        <p className="leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPost;