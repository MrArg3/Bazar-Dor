import { notFound } from "next/navigation";
import CategoryProducts from "@/components/products/CategoryProducts";
import type { Category, Product } from "@/types/product.type";

const API_URL = "https://openapi.programming-hero.com/api/bazardor";

async function fetchApiData<T>(url: string, label: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${label}: ${response.status}`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
        throw new Error(`${label} API returned a non-JSON response.`);
    }

    return response.json() as Promise<T>;
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const [categories, allProducts] = await Promise.all([
        fetchApiData<Category[]>(`${API_URL}/categories`, "categories"),
        fetchApiData<Product[]>(`${API_URL}/products`, "products"),
    ]);

    if (!Array.isArray(categories) || !Array.isArray(allProducts)) {
        throw new Error("The categories or products API returned an invalid response.");
    }

    const category = categories.find((item) => item.slug === slug);
    if (!category) {
        notFound();
    }

    const products = allProducts.filter((product) => product.category === category.slug);

    return (
        <section className="mx-auto mt-6 w-full max-w-6xl px-4">
            <div className="mb-5 flex items-center gap-3 rounded-xl bg-white p-3">

                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-gray-200 text-2xl" aria-hidden="true">{category.icon}</span>

                <div>
                    <h2 className="text-xl font-bold">{category.nameBn}</h2>
                    <p className="text-sm text-gray-600">প্রতিটি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>

            <CategoryProducts products={products} />
        </section>
    );
}