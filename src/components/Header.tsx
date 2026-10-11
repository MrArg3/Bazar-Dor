import Link from "next/link";
import { headers } from "next/headers";
import Navbar from "./Navbar";
import { auth } from "@/lib/auth";
import AccountMenu from "@/components/auth/AccountMenu";

const Header = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        })
    return (
        <header className="sticky top-0 z-[100] border-b border-gray-200 bg-[#fafcfa] p-2">
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
                        {session ? (
                            <AccountMenu name={session.user.name} email={session.user.email} />
                        ) : (
                            <>
                                <Link className="rounded-lg border border-gray-300 p-2 font-bold text-gray-700 hover:bg-gray-200" href="/sign-in">সাইন ইন</Link>
                                <Link className="rounded-lg bg-green-700 p-2 font-bold text-white hover:bg-green-600" href="/sign-up">সাইন আপ</Link>
                            </>
                        )}
                    </div>
                    {/* </div> */}

                </div>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;