"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type AccountMenuProps = {
    name: string;
    email: string;
};

export default function AccountMenu({ name, email }: AccountMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const firstName = name.trim().split(/\s+/)[0] || email;
    const avatarLetter = firstName.charAt(0).toLocaleUpperCase();

    useEffect(() => {
        if (!isOpen) return;

        function closeOnOutsideClick(event: MouseEvent) {
            if (event.target instanceof Node && !menuRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function closeOnEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false);
        }

        document.addEventListener("mousedown", closeOnOutsideClick);
        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("mousedown", closeOnOutsideClick);
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [isOpen]);

    async function handleSignOut() {
        setIsSigningOut(true);

        try {
            const result = await authClient.signOut();
            if (result.error) {
                toast.error(result.error.message ?? "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
                return;
            }

            setIsOpen(false);
            toast.success("সফলভাবে সাইন আউট হয়েছে");
            router.replace("/");
            router.refresh();
        } catch (signOutError) {
            toast.error(
                signOutError instanceof Error
                    ? signOutError.message
                    : "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।",
            );
        } finally {
            setIsSigningOut(false);
        }
    }

    return (
        <div className="relative" ref={menuRef}>
            <button
                aria-expanded={isOpen}
                aria-haspopup="menu"
                aria-label={`${name} এর অ্যাকাউন্ট মেনু`}
                className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-green-700"
                onClick={() => setIsOpen((open) => !open)}
                type="button"
            >
                <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-full bg-green-700 font-bold text-white"
                >
                    {avatarLetter}
                </span>
                <span className="max-w-32 truncate font-semibold text-gray-800">
                    {firstName}
                </span>
                <span className=" text-gray-500">▾</span>
                {/* <svg aria-hidden="true" className="size-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.22 7.47a.75.75 0 0 1 1.06 0L10 11.19l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg> */}
            </button>

            {isOpen && (
                <div
                    className="absolute right-0 z-[110] mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
                    role="menu"
                >
                    <div className="border-b border-gray-100 px-4 py-2">
                        <p className="truncate font-semibold text-gray-900">{name}</p>
                        <p className="truncate text-sm text-gray-500">{email}</p>
                    </div>
                    <Link
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        role="menuitem"
                    >
                        আমার প্রোফাইল
                    </Link>
                    <button
                        className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSigningOut}
                        onClick={handleSignOut}
                        role="menuitem"
                        type="button"
                    >
                        {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                </div>
            )}
        </div>
    );
}
