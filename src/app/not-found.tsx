import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
            <section className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm sm:p-10">
                <p className="text-7xl font-extrabold tracking-tight text-green-700 sm:text-8xl">
                    404
                </p>
                <h1 className="mt-4 text-2xl font-bold text-gray-900">
                    পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                </h1>
                <p className="mt-2 text-gray-600">
                    আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে অথবা ঠিকানাটি ভুল।
                </p>
                <Link
                    className="mt-6 inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-2.5 font-semibold text-white transition hover:bg-green-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                    href="/"
                >
                    ← হোমে ফিরে যান
                </Link>
            </section>
        </main>
    );
}
