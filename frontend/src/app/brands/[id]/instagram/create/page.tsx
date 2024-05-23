"use client";

import React, {useContext, useEffect, useState} from "react";
import PageTitle from "@/components/PageTitle";
import {formContainer, formLabel} from "@/components/form/primitives";
import {button, input, pageContainer} from "@/components/primitives";
import {useParams, useRouter} from "next/navigation";
import toast from "react-hot-toast";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import {useSession} from "next-auth/react";

export default function CreatePost() {
    const session = useSession();
    const { brand } = useContext(BrandContext);
    const router = useRouter();
    const { id } = useParams<{ id: string; }>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!session)
            router.push("/auth/signin");
    }, [session]);

    // todo: error handling
    return (
        <section className={pageContainer({ layout: "create" })}>
            <PageTitle back={"/brands/" + brand._id}>
                Create an Instagram post
            </PageTitle>

            <form
                className={formContainer()}
                onSubmit={(e) => {
                    e.preventDefault();

                    const data = new FormData(e.currentTarget);

                    setLoading(true);
                    fetch(`/api/brands/${id}/instagram`, {
                        method: "POST",
                        body: JSON.stringify({
                            name: data.get("name")!
                        })
                    })
                        .then(resp => resp.json())
                        .then(brand => {
                            toast.success("Post created successfully")
                            router.push(`/brands/${id}/instagram/${brand._id}`);
                        })
                        .finally(() => setLoading(false));
                }}
            >
                <h2 className={formLabel() + " mb-4"}>Post information:</h2>
                <div className={"flex items-center gap-4 mb-4"}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text" className={input()}
                        name={"name"} id={"name"}
                    />
                </div>

                <button
                    className={button()}
                >
                    Create post
                </button>
            </form>
        </section>
    );
}