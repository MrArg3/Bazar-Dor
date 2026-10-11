import Link from "next/link";
import Navbar from "./Navbar";
const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        })
    return (
        <header className=" sticky border-b border-gray-200 bg-[#fafcfa] p-2">
            <div className="  border-b border-gray-100">
                <div className="mx-auto w-full max-w-6xl flex items-center justify-between gap-3 p-2">
                    {/* <div className="flex justify-between items-center p-4"> */}
                    <Link href={"/"}>
                        <div className="flex items-center gap-2">
                            <span className="bg-[#05893e] p-2 rounded-xl">
                                🛒
                            </span>
                            <span>
                                <p className="text-xl font-bold tracking-tight">বাজার দর</p>
                                <p className=" text-xs text-gray-500 ">{date}</p>
                                {/* <CurrentDate/>   */}
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Link href={"/"}><button className="text-gray-700 border border-gray-300 hover:bg-gray-200 rounded-lg p-2 font-bold">সাইন ইন</button></Link>
                        <Link href={"/"}><button className="bg-green-700 hover:bg-green-600 text-white  font-bold rounded-lg p-2">সাইন আপ </button></Link>
                    </div>
                    {/* </div> */}

                </div>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;