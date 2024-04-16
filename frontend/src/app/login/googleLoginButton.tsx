"use client";

import {signIn} from "next-auth/react";
import * as Icon from "react-feather";

export default function GoogleLoginButton() {
    return (
        <button
            type={"submit"}
            className={"btn flex items-center gap-8"}
            onClick={() => signIn("google", {
                redirect: false
            })}
        >
            <span>Login with Google</span>
        </button>
    );
}
