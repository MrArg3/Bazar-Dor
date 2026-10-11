import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import ProfileDetails from "@/components/auth/ProfileDetails";

export default async function ProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in?callbackURL=%2Fprofile");
    }

    return (
        <section className="mx-auto my-10 w-full max-w-2xl px-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <p className="text-gray-600">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
                <ProfileDetails name={session.user.name} email={session.user.email} />
            </div>
        </section>
    );
}
