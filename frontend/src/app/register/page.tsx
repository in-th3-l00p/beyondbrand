"use client";

import {useSession} from "next-auth/react";
import {useEffect} from "react";
import submit from "@/app/register/submit";
import {useRouter} from "next/navigation";
import {useFormState} from "react-dom";
import FormError from "@/components/FormError";

export default function Register() {
    const router = useRouter();
    const session = useSession();
    const [errors, submitAction] = useFormState(submit, { errors: [] });

    useEffect(() => {
        if (session.status === "authenticated")
            router.push("/");
    }, [router, session]);

    return (
        <section className={
            "flex-grow bg-ghost-white py-8 px-8 " +
            "flex flex-col items-center gap-8"
        }>
            <h1 className={"text-4xl text-center"}>Register</h1>

            <form
                className={"max-w-2xl w-full"}
                action={submitAction}
            >
                <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
                    <div>
                        <label htmlFor={"firstName"}>First name</label>
                        <input
                            type={"text"}
                            name={"firstName"}
                            id={"firstName"}
                            className={"input"}
                        />
                        <FormError errors={errors.errors} name={"firstName"} />
                    </div>

                    <div>
                        <label htmlFor={"lastName"}>Last name</label>
                        <input
                            type={"text"}
                            name={"lastName"}
                            id={"lastName"}
                            className={"input"}
                        />
                        <FormError errors={errors.errors} name={"lastName"} />
                    </div>
                </div>

                <div className={"mb-4"}>
                    <label htmlFor={"email"}>Email</label>
                    <input type={"email"} name={"email"} id={"email"} className={"input"}/>
                    <FormError errors={errors.errors} name={"email"} />
                </div>

                <div className={"mb-8"}>
                    <label htmlFor={"password"}>Password</label>
                    <input
                        type={"password"}
                        name={"password"}
                        id={"password"}
                        className={"input"}
                    />
                    <FormError errors={errors.errors} name={"password"} />
                </div>

                <div className={"mb-8"}>
                    <label htmlFor={"confirmPassword"}>Confirm password:</label>
                    <input
                        type={"password"}
                        name={"confirmPassword"}
                        id={"confirmPassword"}
                        className={"input"}
                    />
                    <FormError errors={errors.errors} name={"confirmPassword"} />
                </div>

                <div className="flex justify-center">
                    <button type={"submit"} className={"btn"}>
                        Register
                    </button>
                </div>
            </form>
        </section>
    )
}
