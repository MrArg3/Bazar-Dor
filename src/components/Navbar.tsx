import Link from "next/link";

const Navbar = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
    const data = await res.json();
    const navs = data;  
    // console.log(navs);
    return (
        <div className="mx-auto w-full max-w-6xl p-3">
            {
               navs.map((nav, i) => <Link key={i} href={`/category/${nav.slug}`} className="text-gray-900 hover:text-gray-800 px-4 rounded-md text-xs font-bold">
                <span>{nav.icon}</span>
                <span> {nav.nameBn}</span>
              
                </Link>)
            }
        </div>
    );
};

export default Navbar;