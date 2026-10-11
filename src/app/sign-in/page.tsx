import AuthForm from "@/components/auth/AuthForm";

function getSafeRedirect(value: string | undefined) {
    return value?.startsWith("/") &&
        !value.startsWith("//") &&
        !value.includes("\\")
        ? value
        : "/";
}

export default async function SignInPage({
    searchParams,
}: {
    searchParams: Promise<{ callbackURL?: string }>;
}) {
    const { callbackURL } = await searchParams;

    return <AuthForm mode="sign-in" redirectTo={getSafeRedirect(callbackURL)} />;
}
