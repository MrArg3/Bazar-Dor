"use server";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "@/types/product.type";

const Marquee = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    if (!res.ok) {
        throw new Error(`Failed to fetch products for marquee: ${res.status}`);
    }

    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
        throw new Error(`Products API returned a non-JSON response (${contentType || 'unknown content type'}).`);
    }

    const products: Product[] = await res.json();
    if (!Array.isArray(products)) {
        throw new Error('The products API returned an invalid response.');
    }

    return (
        <div>
            <MarqueeText direction="right" duration={7} >
                <div className="flex items-center gap-4 p-2 border-b border-gray-200 bg-[#fafcfa] text-sm">   
                    {
                        products.map((product: Product, i: number) =>
                            <span key={i} className="mx-2 flex row text-sm gap-1 items-center ">
                                <span>{product.image}</span>
                                <span >{product.nameBn}</span>
                                <span className="text-gray-500">{(product.today).toLocaleString("bn-BD")}  টাকা/কেজি </span>

                                <span>{(product.change.dir === "up") ?
                                    <span className="text-[#1a9951] font-bold">▼ {(product.change.pct).toLocaleString("bn-BD")}%</span> :
                                    <span className="text-[#d03739] font-bold">▲ {(product.change.pct).toLocaleString("bn-BD").slice(1)} %</span>}
                                </span>
                            </span>
                        )
                    }
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;