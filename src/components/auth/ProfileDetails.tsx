"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type ProfileDetailsProps = {
    name: string;
    email: string;
};

export default function ProfileDetails({ name, email }: ProfileDetailsProps) {
    const router = useRouter();
    const [updatedName, setUpdatedName] = useState(name);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const firstName = name.trim().split(/\s+/)[0] || email;
    const avatarLetter = firstName.charAt(0).toLocaleUpperCase();

    async function handleUpdateProfile() {
        const nextName = updatedName.trim();
        if (!nextName) {
            toast.error("নাম লিখুন।");
            return;
        }

        setIsUpdating(true);
        try {
            const result = await authClient.updateUser({ name: nextName });
            if (result.error) {
                toast.error(result.error.message ?? "তথ্য আপডেট করা যায়নি।");
                return;
            }

            toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
            router.refresh();
        } catch (updateError) {
            toast.error(
                updateError instanceof Error
                    ? updateError.message
                    : "তথ্য আপডেট করা যায়নি। আবার চেষ্টা করুন।",
            );
        } finally {
            setIsUpdating(false);
        }
    }

    async function handleSignOut() {
        setIsSigningOut(true);
        try {
            const result = await authClient.signOut();
            if (result.error) {
                toast.error(result.error.message ?? "সাইন আউট করা যায়নি।");
                return;
            }

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
        <div className="mt-6 space-y-5">
            <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                    <span
                        aria-hidden="true"
                        className="grid size-14 shrink-0 place-items-center rounded-full bg-green-700 text-xl font-bold text-white"
                    >
                        {avatarLetter}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{name}</p>
                        <p className="truncate text-sm text-gray-500">{email}</p>
                    </div>
                </div>
                <button
                    className="shrink-0 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={isSigningOut}
                    onClick={handleSignOut}
                    type="button"
                >
                    {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
                </button>
            </section>

            <section className="rounded-xl border border-gray-200 p-4">
                <h2 className="text-lg font-bold text-gray-900">তথ্য</h2>
               
                <div className="mt-4 space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                        নাম
                        <input
                            autoComplete="name"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            maxLength={100}
                            onChange={(event) => setUpdatedName(event.target.value)}
                            value={updatedName}  
                        />
                    </label>
                    <label className="block text-sm font-medium text-gray-700">
                        ইমেইল
                        <input
                            className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500"
                            readOnly
                            value={email}
                        />
                    </label>
                    <button
                        className="rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isUpdating || updatedName.trim() === name.trim()}
                        onClick={handleUpdateProfile}
                        type="button"
                    >
                        {isUpdating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
                    </button>
                </div>
            </section>
        </div>
    );
}
