"use client";

import {signIn} from "next-auth/react";
import * as Icon from "react-feather";

export default function GithubLoginButton() {
    return (
        <button
            type={"submit"}
            className={"btn flex items-center gap-8 w-full"}
            onClick={() => signIn("github", {
                // redirect: false
            })}
        >
            <Icon.GitHub/>
            <span>Login with GitHub</span>
        </button>
    );
}