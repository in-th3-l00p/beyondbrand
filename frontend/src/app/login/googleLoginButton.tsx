"use client";

import {signIn} from "next-auth/react";
import Image from "next/image";

export default function GoogleLoginButton() {
    const ICON_SIZE = 30;

    return (
        <button
            type={"submit"}
            className={"btn flex items-center gap-8 w-full"}
            onClick={() => signIn("google", {
                redirect: false
            })}
        >
            <Image
                src={"/icons/google.svg"}
                alt={"google icon"}
                width={ICON_SIZE}
                height={ICON_SIZE}
                className={"invert"}
            />
            <span>Login with Google</span>
        </button>
    );
}
