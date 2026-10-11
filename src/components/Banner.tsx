import Image from "next/image";
import hero from "@/app/image/bazar-hero.png"



const Banner = () => {
        const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        })


    return (
        <section className="mx-auto m-4 w-full max-w-6xl bg-[#fafcfa] rounded-3xl px-4 py-10 border border-gray-100 shadow-md">
            {/* <div className="flex w-full flex-col gap-10 py-10 lg:flex-row"> */}
            <div className="flex lg:flex-row flex-col justify-between gap-10 py-2 px-4">
                <div className="">
                    <p className="inline-block py-1 px-2 mb-1 rounded-2xl text-[#05893e] bg-[#e1f0e7]">{date}</p>
                    <h1 className="text-3xl font-bold leading-tight sm:text-4xl ">আজকের বাজারের দাম এক <br/> নজরে</h1>
                    <p className="mt-2 text-gray-500">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, <br/> সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
                    <p className="mt-4">
                    <a href="#productsList"><span className="text-white font-bold bg-[#05893e] hover:bg-[#047c37] p-2 rounded-lg shadow-md shadow-[#05893e]/30">সব পণ্য দেখুন</span></a>
                    </p>
                        
                </div>

                <Image src={hero} alt="hero" width={360} height={200} />
                {/* <img src={hero.src} alt="hero" width={360} height={290} /> */}

            </div>
        </section>
    );
};

export default Banner;