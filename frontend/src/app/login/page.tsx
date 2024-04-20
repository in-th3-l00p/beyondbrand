"use client";

import GithubLoginButton from "@/app/login/githubLoginButton";
import GoogleLoginButton from "@/app/login/googleLoginButton";
import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Login() {
    const router = useRouter();
    const session = useSession();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (session.status === "authenticated")
            router.push("/");
    }, [router, session]);


    return (
        <section className={
            "flex-grow bg-ghost-white py-8 px-8 " +
            "flex flex-col items-center gap-8"
        }>
            <h1 className={"text-4xl text-center"}>Login</h1>

            <div className={"flex flex-col items-center gap-4"}>
                <GithubLoginButton />
                <GoogleLoginButton />
            </div>

            <form
                className={"max-w-2xl w-full"}
                onSubmit={async (e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const resp = await signIn("credentials", {
                        "username": data.get("email"),
                        "password": data.get("password"),
                        redirect: false
                    });
                    if (!resp!.ok)
                        setError(true);
                }}
            >
                {error && (
                    <p className={"text-tomato mb-4"}>Invalid email or password</p>
                )}

                <div className={"mb-4"}>
                    <label htmlFor={"email"}>Email</label>
                    <input
                        type={"email"}
                        name={"email"}
                        id={"email"}
                        className={"input"}
                    />
                </div>

                <div className={"mb-8"}>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        className={"input"}
                    />
                </div>

                <div className="flex justify-center">
                    <button type={"submit"} className={"btn"}>
                        Login
                    </button>
                </div>
            </form>
        </section>
    )
}