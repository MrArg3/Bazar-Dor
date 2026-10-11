import { Suspense } from "react";
import AuthForm from "@/components/auth/AuthForm";

function getSafeRedirect(value: string | undefined) {
    return value?.startsWith("/") &&
        !value.startsWith("//") &&
        !value.includes("\\")
        ? value
        : "/";
}

async function SignInContent({
    searchParams,
}: {
    searchParams: Promise<{ callbackURL?: string }>;
}) {
    const { callbackURL } = await searchParams;

    return <AuthForm mode="sign-in" redirectTo={getSafeRedirect(callbackURL)} />;
}

export default function SignInPage({
    searchParams,
}: {
    searchParams: Promise<{ callbackURL?: string }>;
}) {
    return (
        <Suspense fallback={<div aria-busy="true" className="min-h-[60vh]" />}>
            <SignInContent searchParams={searchParams} />
        </Suspense>
    );
}
