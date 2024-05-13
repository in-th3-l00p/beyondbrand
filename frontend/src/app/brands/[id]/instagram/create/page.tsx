"use client";

import Link from "next/link";
import * as Icon from "react-feather";
import React, {useState} from "react";
import PageTitle from "@/components/PageTitle";
import {formContainer, formLabel} from "@/components/form/primitives";
import {button, input} from "@/components/primitives";
import {useParams, useRouter} from "next/navigation";

export default function CreatePost() {
    const router = useRouter();
    const { id } = useParams<{ id: string; }>();
    const [loading, setLoading] = useState(false);

    // todo: error handling
    return (
        <div className={"py-8 container mx-auto flex-grow"}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href={"/"} className="btn">
                    <Icon.ArrowLeft />
                </Link>
                <PageTitle>Create an Instagram post</PageTitle>
            </div>

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
        </div>
    );
}