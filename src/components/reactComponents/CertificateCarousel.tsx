import React, {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import {fetchData} from "../../utils/utils.ts";
import {PUBLIC_API_URL_STRAPI} from "../../../services/api.ts";

export default function CertificateCarousel() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({
        data: []
    });

    useEffect(() => {
        (async () => {
            setData(await fetchData('/api/certifications?populate=Image'));
            setIsLoading(false);
        })()

    }, []);
    console.log(data);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-[#000]"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center overflow-hidden">
            <div className="w-full  overflow-hidden">

                <Marquee gradient={false} speed={60}>
                    {data.data.map((image:any, index:number) => (
                        <div key={index} className="flex justify-center w-3/4 max-w-[300px] max-h-[200px] ">
                            <img
                                src={PUBLIC_API_URL_STRAPI + image.Image.url}
                                alt={`certificate ${index + 1}`}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}

                </Marquee>
            </div>
        </div>
    );
}
