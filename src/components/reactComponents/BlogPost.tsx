// src/components/reactComponents/BlogCard.tsx
import React from "react";

interface BlogCardProps {
    imageUrl: string;
    date: string;
    title: string;
    intro: string;
    description: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
                                               imageUrl,
                                               date,
                                               title,
                                               intro,
                                               description,
                                           }) => {
    return (
        <div
            className="relative rounded-2xl overflow-hidden group w-full h-[400px] md:h-[700px] xl:h-[500px] shadow-lg"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Date */}
            <div className="absolute top-5 bg-[#003B71] text-white px-3 py-1 text-sm font-medium z-10 ">
                {date}
            </div>

            {/* Overlay */}
            <div
                className="absolute inset-x-0 bottom-0 w-full bg-[#003B71] text-white px-6 md:px-10 py-4
                   transition-all duration-500 ease-in-out rounded-t-2xl
                   group-hover:h-full h-[40%] flex flex-col justify-center"
            >
                <div className="transition-all duration-500 ease-in-out group-hover:mb-6">
                    <h3 className="md:text-[20px] text-[16px] font-bold">{title}</h3>
                    <p className="md:text-[16px] text-[14px]">{intro}</p>
                </div>

                {/* Description - hidden until hover */}
                <div
                    className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-[200px]
                     transition-all duration-500 ease-in-out mt-4 text-sm"
                >
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
