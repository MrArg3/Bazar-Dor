"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

type AuthFormProps = {
    mode: "sign-in" | "sign-up";
    redirectTo: string;
};

export default function AuthForm({ mode, redirectTo }: AuthFormProps) {
    const router = useRouter();
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isSignUp = mode === "sign-up";

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const email = String(formData.get("email") ?? "");
        const password = String(formData.get("password") ?? "");

        if (isSignUp && password !== String(formData.get("confirmPassword") ?? "")) {
            setError("পাসওয়ার্ড ও নিশ্চিত পাসওয়ার্ড মিলছে না।");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = isSignUp
                ? await authClient.signUp.email({
                    name: String(formData.get("name") ?? ""),
                    email,
                    password,
                })
                : await authClient.signIn.email({ email, password });

            if (result.error) {
                setError(result.error.message ?? "অনুরোধ সম্পন্ন হয়নি। আবার চেষ্টা করুন।");
                return;
            }

            toast.success("সফলভাবে সাইন ইন হয়েছে");
            router.replace(redirectTo);
            router.refresh();
        } catch (submissionError) {
            setError(
                submissionError instanceof Error
                    ? submissionError.message
                    : "সার্ভারের সঙ্গে সংযোগ করা যায়নি। আবার চেষ্টা করুন।",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    async function handleSocialSignIn(provider: "google" | "github") {
        setError("");
        setIsSubmitting(true);

        try {
            const result = await authClient.signIn.social({
                provider,
                callbackURL: redirectTo,
            });

            if (result.error) {
                setError(result.error.message ?? "সামাজিক মাধ্যমে সাইন ইন করা যায়নি।");
            }
        } catch (submissionError) {
            setError(
                submissionError instanceof Error
                    ? submissionError.message
                    : "সার্ভারের সঙ্গে সংযোগ করা যায়নি। আবার চেষ্টা করুন।",
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="mx-auto flex min-h-[60vh] w-full max-w-md flex-col items-center justify-center px-4 py-10">

            <div className="mb-5 text-center">
                 <h1 className="text-2xl font-bold text-gray-900">
                    {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    {isSignUp
                        ? "বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
                        : "আপনার অ্যাকাউন্টে প্রবেশ করে পণ্যের বিস্তারিত দেখুন।"}
                </p>
            </div>

            <div className="w-full rounded-2xl border border-gray-200 bg-white text-center shadow-sm sm:p-8">

                <form className=" space-y-4 text-left" onSubmit={handleSubmit}>
                    {isSignUp && (
                        <label className="block text-sm font-medium text-gray-700">
                            আপনার নাম
                            <input
                                autoComplete="name"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                                name="name"
                                required
                            />
                        </label>
                    )}

                    <label className="block text-sm font-medium text-gray-700">
                        ইমেইল
                        <input
                            autoComplete="email"
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            name="email"
                            required
                            type="email"
                        />
                    </label>

                    <label className="block text-sm font-medium text-gray-700">
                        পাসওয়ার্ড
                        <input
                            autoComplete={isSignUp ? "new-password" : "current-password"}
                            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                            minLength={8}
                            name="password"
                            required
                            type="password"
                        />
                    </label>

                    {isSignUp && (
                        <label className="block text-sm font-medium text-gray-700">
                            পাসওয়ার্ড নিশ্চিত করুন
                            <input
                                autoComplete="new-password"
                                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-100"
                                minLength={8}
                                name="confirmPassword"
                                required
                                type="password"
                            />
                        </label>
                    )}

                    {error && (
                        <p aria-live="polite" className="text-sm text-red-700" role="alert">
                            {error}
                        </p>
                    )}

                    <button
                        className="w-full rounded-lg bg-green-700 px-4 py-2.5 font-bold text-white hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSubmitting}
                        type="submit"
                    >
                        {isSubmitting
                            ? "অপেক্ষা করুন..."
                            : isSignUp
                                ? "অ্যাকাউন্ট তৈরি করুন"
                                : "সাইন ইন"}
                    </button>
                </form>

                <div className="my-5 flex items-center gap-3" aria-label="অথবা">
                    <span className="h-px flex-1 bg-gray-300" />
                    <span className="text-sm text-gray-500">অথবা</span>
                    <span className="h-px flex-1 bg-gray-300" />
                </div>

                <div className="grid gap-3">
                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSubmitting}
                        onClick={() => handleSocialSignIn("google")}
                        type="button"
                    >
                        <svg aria-hidden="true" className="size-5" viewBox="0 0 48 48">
                            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" transform="translate(0 4)" />
                            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.74 7.18l7.65 5.93c4.47-4.13 7.13-10.2 7.13-17.58Z" />
                            <path fill="#FBBC05" d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.95 23.95 0 0 0 0 21.56l7.98-6.19Z" transform="translate(0 4)" />
                            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.87l-7.65-5.93c-2.13 1.43-4.86 2.28-8.25 2.28-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" transform="translate(0 -4)" />
                        </svg>
                        Google দিয়ে {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
                    </button>
                    <button
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={isSubmitting}
                        onClick={() => handleSocialSignIn("github")}
                        type="button"
                    >
                        <svg aria-hidden="true" className="size-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.3-1.23-1.64-1.23-1.64-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.78 2.19 3.18 1.56.1-.72.39-1.21.7-1.49-2.48-.28-5.09-1.24-5.09-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.15a10.6 10.6 0 0 1 5.55 0c2.1-1.45 3.04-1.15 3.04-1.15.61 1.53.23 2.67.12 2.95.71.78 1.14 1.78 1.14 3 0 4.27-2.61 5.21-5.1 5.49.4.34.75 1.02.75 2.06v3.06c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                        </svg>
                        GitHub দিয়ে {isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন করুন"}
                    </button>
                </div>

                <p className="mt-5 text-center text-sm text-gray-600">
                    {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে?" : "নতুন ব্যবহারকারী?"}{" "}
                    <Link
                        className="font-semibold text-green-700 hover:underline"
                        href={`${isSignUp ? "/sign-in" : "/sign-up"}?callbackURL=${encodeURIComponent(redirectTo)}`}
                    >
                        {isSignUp ? "সাইন ইন করুন" : "অ্যাকাউন্ট তৈরি করুন"}
                    </Link>
                </p>
            </div>
            <Link
                className="mt-5 text-sm font-semibold text-green-700 hover:underline"
                href="/"
            >
                ← হোমে ফিরে যান
            </Link>
        </section>
    );
}
