import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session) {
        redirect("/sign-in?callbackURL=%2Fprofile");
    }

    const firstName = session.user.name.trim().split(/\s+/)[0];
    const avatarLetter = firstName?.charAt(0) || session.user.email.charAt(0).toUpperCase();

    return (
        <section className="mx-auto my-10 w-full max-w-2xl px-4">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
                <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                <div className="mt-6 flex items-center gap-4">
                    <span
                        aria-hidden="true"
                        className="grid size-14 shrink-0 place-items-center rounded-full bg-green-700 text-xl font-bold text-white"
                    >
                        {avatarLetter}
                    </span>
                    <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">{session.user.name}</p>
                        <p className="truncate text-sm text-gray-500">{session.user.email}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
