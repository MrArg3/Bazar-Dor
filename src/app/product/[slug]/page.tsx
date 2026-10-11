import Link from "next/link";
import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import type { Product } from "@/types/product.type";
import { auth } from "@/lib/auth";

const PRODUCTS_API = "https://openapi.programming-hero.com/api/bazardor/products";

const unitLabelsBn: Record<Product["unit"], string> = {
    kg: "কেজি",
    litre: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
};

async function ProductDetailsPageContent({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect(`/sign-in?callbackURL=${encodeURIComponent(`/product/${slug}`)}`);
    }

    const response = await fetch(PRODUCTS_API);

    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
        throw new Error("Products API returned a non-JSON response.");
    }

    const products: Product[] = await response.json();
    if (!Array.isArray(products)) {
        throw new Error("The products API returned an invalid response.");
    }

    const product = products.find((item) => item.slug === slug);
    if (!product) {
        notFound();
    }

    const unit = unitLabelsBn[product.unit];
    const priceDifference = product.today - product.yesterday;
    const lowestMarket = product.markets.length
        ? product.markets.reduce((lowest, market) => market.min < lowest.min ? market : lowest)
        : null;
    const highestMarket = product.markets.length
        ? product.markets.reduce((highest, market) => market.max > highest.max ? market : highest)
        : null;
    const averageMarketPrice = product.markets.length
        ? product.markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) / product.markets.length
        : null;
    const changeClass =
        product.change.dir === "up"
            ? "bg-red-100 text-red-700"
            : product.change.dir === "down"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600";
    const changeIcon =
        product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "−";

    return (
        <section className="mx-auto my-8 w-full max-w-6xl px-4">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-600">
                <Link href="/" className="hover:text-green-700">হোম</Link>
                <span className="mx-2" aria-hidden="true">/</span>
                <Link href={`/category/${product.category}`} className="hover:text-green-700">
                    {product.categoryNameBn}
                </Link>
                <span className="mx-2" aria-hidden="true">/</span>
                <span aria-current="page" className="text-gray-900">{product.nameBn}</span>
            </nav>

            {/* <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]"> */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">

                    <div className="flex gap-2">
                        <div className="grid size-20 place-items-center rounded-2xl bg-green-50 text-5xl" aria-hidden="true">
                            {product.image}
                        </div>

                        <div>
                            <p className="mb-1 text-sm text-gray-500">
                            </p>
                            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>

                            <p className="mt-1 text-sm text-gray-500">প্রতি {unit} <span className="font-bold bg-green-100 px-1 rounded-lg">{product.categoryIcon} {product.categoryNameBn}</span></p>
                            <p className="mt-1 text-sm text-gray-600">
                                {priceDifference > 0
                                    ? <>গতকালের তুলনায় আজ দাম {Math.abs(priceDifference).toLocaleString("bn-BD")} টাকা বেড়েছে</>
                                    : priceDifference < 0
                                        ? <>গতকালের তুলনায় আজ দাম {Math.abs(priceDifference).toLocaleString("bn-BD")} টাকা কমেছে</>
                                        : "গতকালের তুলনায় আজ দামের কোনো পরিবর্তন নেই"}
                            </p>
                        </div>
                    </div>


                    <div className="flex flex-col items-center gap-2 rounded-xl border border-gray-300 bg-gray-100 px-6 py-3 text-center">
                        <div>
                            <p className="text-sm text-gray-500">আজকের দাম</p>
                            <p className="text-3xl font-bold text-gray-900">
                                {product.today.toLocaleString("bn-BD")}{" "}
                            </p>
                            <p className="text-base font-medium">টাকা / {unit}</p>
                        </div>
                        <span className={`rounded-full px-3 py-1 text-sm font-bold ${changeClass}`}>
                            {changeIcon} {Math.abs(product.change.pct).toLocaleString("bn-BD")}%
                        </span>
                    </div>

                </div>

            </div>

            <section aria-labelledby="price-summary-heading" className="mt-5 border border-gray-200 bg-white p-4 rounded-xl">
                <h2 id="price-summary-heading" className="mb-3 text-lg font-bold">দামের সারসংক্ষেপ</h2>
                <p className="text-sm text-gray-500">প্রতি {unit} পণ্যের সর্বনিম্ন ও সর্বোচ্চ দাম</p>
                {product.markets.length > 0 && lowestMarket && highestMarket && averageMarketPrice !== null ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <h3 className="text-sm text-gray-600">সর্বনিম্ন দাম</h3>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {lowestMarket.min.toLocaleString("bn-BD")} টাকা
                            </p>
                            <p className="mt-1 text-sm text-gray-500">সবচেয়ে কম দামের বাজার: {lowestMarket.market}</p>
                        </article>
                        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <h3 className="text-sm text-gray-600">সর্বাধিক দাম</h3>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {highestMarket.max.toLocaleString("bn-BD")} টাকা
                            </p>
                            <p className="mt-1 text-sm text-gray-500">সবচেয়ে বেশি দামের বাজার: {highestMarket.market}</p>
                        </article>
                        <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                            <h3 className="text-sm text-gray-600">গড় দাম</h3>
                            <p className="mt-1 text-2xl font-bold text-gray-900">
                                {averageMarketPrice.toLocaleString("bn-BD", { maximumFractionDigits: 2 })} টাকা
                            </p>
                            <p className="mt-1 text-sm text-gray-500">প্রতি {unit}-এর হিসাবে</p>
                        </article>
                    </div>
                ) : (
                    <p className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
                        এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
                    </p>
                )}
            </section>

            <section aria-labelledby="market-prices-heading" className="mt-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-4">
                    <h2 id="market-prices-heading" className="text-lg font-bold">বাজারভিত্তিক আজকের দাম</h2>
                    
                </div>

                {product.markets.length > 0 ? (

                    <div className="overflow-x-auto border border-gray-200 rounded-xl">
                        <table className="w-full min-w-[560px] text-left text-sm">
                            <thead className="bg-gray-100 border-b border-gray-200  text-gray-700">
                                <tr>
                                    <th scope="col" className="px-3 py-3 font-bold">বাজার</th>
                                    <th scope="col" className="px-3 py-3 font-bold">বিভাগ</th>
                                    <th scope="col" className="px-3 py-3 text-right font-bold">সর্বনিম্ন দাম</th>
                                    <th scope="col" className="px-3 py-3 text-right font-bold">সর্বোচ্চ দাম</th>
                                    <th scope="col" className="px-3 py-3 text-right font-bold">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {product.markets.map((market) => (
                                    <tr key={`${market.market}-${market.division}`}>
                                        <td className="px-3 py-3 font-medium text-gray-900">{market.market}</td>
                                        <td className="px-3 py-3 text-gray-600">{market.division}</td>
                                        <td className="px-3 py-3 text-right">{market.min.toLocaleString("bn-BD")} টাকা</td>
                                        <td className="px-3 py-3 text-right">{market.max.toLocaleString("bn-BD")} টাকা</td>
                                        <td className="px-3 py-3 text-right">
                                            {((market.min + market.max) / 2).toLocaleString("bn-BD", { maximumFractionDigits: 2 })} টাকা
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।</p>
                )}
            </section>
        </section>
    );
}

export default function ProductDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    return (
        <Suspense
            fallback={
                <section
                    aria-busy="true"
                    aria-label="পণ্যের বিস্তারিত লোড হচ্ছে"
                    className="mx-auto my-8 w-full max-w-6xl space-y-5 px-4"
                >
                    <div className="h-32 animate-pulse rounded-xl bg-white" />
                    <div className="h-48 animate-pulse rounded-xl bg-white" />
                    <div className="h-64 animate-pulse rounded-xl bg-white" />
                </section>
            }
        >
            <ProductDetailsPageContent params={params} />
        </Suspense>
    );
}
