// src/components/reactComponents/BlogCard.tsx
import React from "react";

interface BlogCardProps {
    imageUrl: string;
    date: string;
    title: string;
    description: string;
    link: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ imageUrl, date, title, description, link }) => {
    return (
        <div
            className="relative rounded-2xl overflow-hidden group w-full  h-[400px] md:h-[700px] xl:h-[500px] shadow-lg"
            style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >

            <div className="absolute top-10  bg-[#003B71] text-white px-3 py-1  text-sm font-medium z-10">
                {date}
            </div>
            <div
                className="absolute rounded-2xl bottom-0 left-0 w-full bg-[#003B71] text-white px-10 py-4 transition-all duration-500 ease-in-out
                   md:h-[35%] h-[45%] group-hover:h-[60%] flex flex-col justify-center "
            >
                <div className="card-content flex  justify-center flex-col gap-5">
                    <div>
                        <h3 className="md:text-[20px] text-[16px] font-bold">{title}</h3>
                        <p className="md:text-[16px] text-[14px]">
                            {description}
                        </p>
                    </div>
                    <a
                        href={link}
                        className=" text-sm font-semibold underline flex items-center"
                    >
                        Read the full article →
                    </a>
                </div>

            </div>
        </div>
    );
};

export default BlogCard;
