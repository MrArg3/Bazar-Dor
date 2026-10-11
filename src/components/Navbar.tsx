import Link from "next/link";
import type { Category } from "@/types/product.type";

const Navbar = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/categories");
    if (!res.ok) {
        throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const navs: Category[] = await res.json();
    if (!Array.isArray(navs)) {
        throw new Error("The categories API returned an invalid response.");
    }

    return (
        <div className="mx-auto w-full max-w-6xl p-3">
            {
               navs.map((nav) => (
                <Link key={nav.slug} href={`/category/${nav.slug}`} className="text-gray-900 hover:text-gray-800 px-4 rounded-md text-xs font-bold">
                    <span>{nav.icon}</span>
                    <span> {nav.nameBn}</span>
                </Link>
               ))
            }
        </div>
    );
};

export default Navbar;