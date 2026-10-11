"use server";
import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";
import type { Product } from "@/types/product.type";

const formatPercentValue = (pct: number) => {
    const sign = pct < 0 || Object.is(pct, -0) ? "-" : "";
    const value = Math.abs(pct).toLocaleString("bn-BD", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    });

    return `${sign}${value}%`;
};

const getChangeStyle = (dir: Product["change"]["dir"]) => {
    if (dir === "up") return "text-[#d03739] bg-red-100";
    if (dir === "down") return "text-[#1a9951] bg-[#e1f0e7]";
    return "text-gray-500 bg-gray-200";
};

const getChangeIcon = (dir: Product["change"]["dir"]) => {
    if (dir === "up") return "▲";
    if (dir === "down") return "▼";
    return "−";
};

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
            <MarqueeText direction="right" duration={9} pauseOnHover>
                <div className="flex items-center gap-4 border-b border-gray-200 bg-[#fafcfa] p-2 text-sm">
                    {products.map((product: Product, i: number) => {
                        const dir = product.change.dir;
                        const pctText = formatPercentValue(product.change.pct);

                        return (
                            <span key={i} className="mx-2 flex items-center gap-1 text-sm">
                                <span>{product.image}</span>
                                <span className="font-bold">{product.nameBn}</span>
                                <span className="text-gray-500">{product.today.toLocaleString("bn-BD")} টাকা/কেজি</span>
                                <span className={`rounded-xl px-1 font-bold ${getChangeStyle(dir)}`}>
                                    {getChangeIcon(dir)} {pctText}
                                </span>
                            </span>
                        );
                    })}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;