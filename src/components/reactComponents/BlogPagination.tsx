import React, { useState, useEffect } from 'react';
import BlogPost from './BlogPost';
import {fetchData} from "../../utils/utils.ts";
import {PUBLIC_API_URL_STRAPI} from "../../../services/api.ts";

interface BlogItem {
    id: number;
    description: string;
    intro:string;
    date: string;
    title: string;
    image: {
        formats:{
            small: {
                url: string;
            }
            thumbnail:{
                url: string;
            }
        }
    }
}

interface PaginationMeta {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

interface BlogPaginationProps {
    initialPage?: number;
    articlesPerPage?: number;
    strapiUrl?: string;
}

const BlogPagination: React.FC<BlogPaginationProps> = ({
                                                           initialPage = 1,
                                                           articlesPerPage = 4,
                                                           strapiUrl = PUBLIC_API_URL_STRAPI
                                                       }) => {
    const [blogs, setBlogs] = useState<BlogItem[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>({
        page: initialPage,
        pageSize: articlesPerPage,
        pageCount: 1,
        total: 0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [pageLoading, setPageLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchBlogs() {
            setPageLoading(true);
            try {
                const data = await fetchData(
                    `/api/blogs?pagination[page]=${currentPage}&pagination[pageSize]=${articlesPerPage}&populate=*`
                );

                if (!data) {
                    throw new Error("No data returned from fetchData");
                }

                setBlogs(data.data || []);
                setPagination(data.meta?.pagination || pagination);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
                setPageLoading(false);
            }
        }
        fetchBlogs();
    }, [currentPage, articlesPerPage, strapiUrl]);

    const renderPaginationItems = () => {
        const pageCount = pagination.pageCount;
        const current = currentPage;
        const items = [];

        if (pageCount < 5) {

            for (let i = 1; i <= pageCount; i++) {
                items.push(
                    <span
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`text-lg cursor-pointer hover:text-gray-400 transition-colors ${
                            current === i ? 'font-bold border-b-2 border-black' : 'font-normal'
                        }`}
                    >
                    {i}
                </span>
                );
            }
            return items;
        }
        if (pageCount < 5) {
            items.push(
                <span key={1} className="font-bold border-b-2 border-white">1</span>,

            )
                for(let i = 2; i <= pageCount; i++){
                    items.push(
                        <span key={i} className="font-bold border-b-2">{i}</span>,
                    )
                }
        }

        else if (current === 1) {
            items.push(
                <span key={1} className="font-bold border-b-2 border-white">1</span>,
                <span key={2} onClick={() => handlePageChange(2)} className="cursor-pointer hover:text-gray-400">2</span>,
                <span key="ellipsis" className="text-lg">...</span>,
                <span key={pageCount} onClick={() => handlePageChange(pageCount)} className="cursor-pointer hover:text-gray-400">{pageCount}</span>
            );
        } else if (current === 2) {
            items.push(
                <span key={1} onClick={() => handlePageChange(3)} className="cursor-pointer hover:text-gray-400">1</span>,
                <span key={2} className="font-bold border-b-2 border-white">2</span>,
                <span key={3} onClick={() => handlePageChange(3)} className="cursor-pointer hover:text-gray-400">3</span>,
                <span key="ellipsis" className="text-lg">...</span>,
                <span key={pageCount} onClick={() => handlePageChange(pageCount)} className="cursor-pointer hover:text-gray-400">{pageCount}</span>
            );
        } else if (current >= 3 && current < pageCount - 2) {
            items.push(
                <span key={1} onClick={() => handlePageChange(1)} className="cursor-pointer hover:text-gray-400">1</span>,
                <span key="ellipsis1" className="text-lg">...</span>,
                <span key={current} className="font-bold border-b-2 border-white">{current}</span>,
                <span key={current + 1} onClick={() => handlePageChange(current + 1)} className="cursor-pointer hover:text-gray-400">{current + 1}</span>,
                <span key="ellipsis2" className="text-lg">...</span>,
                <span key={pageCount} onClick={() => handlePageChange(pageCount)} className="cursor-pointer hover:text-gray-400">{pageCount}</span>
            );
        } else if (current == pageCount - 1) {
            items.push(
                <span key={1} onClick={() => handlePageChange(1)} className="cursor-pointer hover:text-gray-400">1</span>,
                <span key="ellipsis1" className="text-lg">...</span>,
                <span key={current} className="font-bold border-b-2 border-white">{current}</span>,
                <span key={pageCount} onClick={() => handlePageChange(pageCount)} className="cursor-pointer hover:text-gray-400">{pageCount}</span>
            );
        }
        else if (current == pageCount - 2) {
            items.push(
                <span key={1} onClick={() => handlePageChange(1)} className="cursor-pointer hover:text-gray-400">1</span>,
                <span key="ellipsis1" className="text-lg">...</span>,
                <span key={current} className="font-bold border-b-2 border-white">{current}</span>,
                <span key={pageCount - 1} onClick={() => handlePageChange(pageCount - 1)} className="cursor-pointer hover:text-gray-400">{pageCount - 1}</span>,
                <span key={pageCount} onClick={() => handlePageChange(pageCount)} className="cursor-pointer hover:text-gray-400">{pageCount}</span>
            );
        }
        else if (current==pageCount){
            items.push(
                <span key={1} onClick={() => handlePageChange(1)} className="cursor-pointer hover:text-gray-400">1</span>,
                <span key="ellipsis" className="text-lg">...</span>,
                <span key={pageCount - 1} onClick={() => handlePageChange(pageCount - 1)} className={`cursor-pointer hover:text-gray-400 ${current === pageCount - 1 ? 'font-bold border-b-2 border-white' : ''}`}>{pageCount - 1}</span>,
                <span key={pageCount} className={`font-bold border-b-2 border-white`}>{pageCount}</span>
            );
        }

        return items;
    };

    const handlePageChange = (newPage: number) => {
        if (pageLoading || newPage === currentPage) return;
        setPageLoading(true);
        setCurrentPage(newPage);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading && blogs.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-pulse flex flex-col space-y-8 w-full">
                    {[...Array(articlesPerPage)].map((_, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="h-48 bg-gray-800 rounded"></div>
                            <div className="space-y-4">
                                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-800 rounded"></div>
                                <div className="h-4 bg-gray-800 rounded"></div>
                                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="blog-container grid xl:grid-cols-2 grid-cols-1 mx-auto w-full justify-items-center gap-5 mb-20">

            {blogs.map((blog, index) => (
                <BlogPost
                    key={blog.id}
                    title={blog.title}
                    intro={blog.intro}
                    description={blog.description}
                    imageUrl={ PUBLIC_API_URL_STRAPI +
                        (blog.image?.formats?.small?.url ?  blog.image?.formats?.small?.url:
                            blog.image?.formats?.thumbnail?.url)}
                    date={blog.date}
                />
            ))}

            {pagination.pageCount > 1 && (
                <div className="pagination flex justify-end items-center gap-2 my-12">
                    {renderPaginationItems()}
                </div>
            )}
        </div>
    );
};

export default BlogPagination;