import React, {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import {fetchData} from "../../utils/utils.ts";
// import {PUBLIC_API_URL_STRAPI} from "../../services/api.ts";

interface CertificateCarouselProps {
    images: string[];
}


export default function CertificateCarousel({images}: CertificateCarouselProps) {
    // const [data, setData] = useState({
    //     data: []
    // });
    //
    // useEffect(() => {
    //     (async () => {
    //         setData(await fetchData('/api/clients?populate=image'));
    //     })()
    //
    // }, []);
    console.log('images:', images, Array.isArray(images));

    return (
        <div className="flex flex-col items-center overflow-hidden">
            <div className="w-full  overflow-hidden">

                <Marquee gradient={false} speed={60}>
                    {/*{data.data.map((image:any, index:number) => (*/}
                    {/*    <div key={index} className="flex justify-center w-3/4 max-w-[300px] max-h-[200px] ">*/}
                    {/*        <img*/}
                    {/*            src={PUBLIC_API_URL_STRAPI + image.image.url}*/}
                    {/*            alt={`certificate ${index + 1}`}*/}
                    {/*            className="w-full h-auto"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*/!*))}*!/  <--- this is for CMS */}


                    {images.map((image: string, index: number) => (
                        <div key={index} className="flex justify-center w-3/4  max-w-[350px] max-h-[250px] ">
                            <img
                                src={image}
                                alt={`Client ${index + 1}`}
                                className="w-full h-auto"
                            />
                        </div>
                    ))}

                </Marquee>
            </div>
        </div>
    );
}
