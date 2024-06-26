"use client";

import React, {useContext, useState} from "react";
import * as Icon from "react-feather";
import BrandContext from "@/app/brands/create/BrandContext";
import Loading from "@/app/brands/create/components/Loading";
import toast from "react-hot-toast";
import generationService from "@/service/generationService";
import {button, input} from "@/components/primitives";
import clsx from "clsx";

export default function GenerateDescriptionPrompted() {
    const { name, setDescription } = useContext(BrandContext);
    const [prompt, setPrompt] = useState<string>("");
    const [generated, setGenerated] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    if (loading)
        return <Loading />;
    if (!generated)
        return (
            <form className={"w-full flex flex-col md:flex-row items-left md:items-center gap-4 mb-4"}>
                <p>Prompt:</p>
                <textarea
                    name="improved"
                    id="improved" className={clsx(input(), "flex-grow")}
                    rows={2}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type={"button"}
                    className={button()}
                    disabled={!prompt}
                    onClick={() => {
                        setLoading(true);
                        generationService.descriptionPrompted(name, prompt)
                            .then((data: { brandDescription?: string }) => {
                                setGenerated(data.brandDescription || "");
                                toast.success("Description generated successfully")
                            })
                            .finally(() => setLoading(false));
                    }}
                >
                    Generate
                </button>
            </form>
        );
    return (
        <div className={"mt-4 mb-8 w-full flex gap-4 flex-wrap items-center"}>
            <div className={"flex-grow"}>
                <p>AI Generated description:</p>
                <textarea
                    name="generated"
                    id="generated" className={clsx(input(), "w-full resize-none")}
                    rows={6}
                    defaultValue={generated}
                />
            </div>
            <div className="text-center">
                <button
                    type={"button"} className={clsx(button(), "mb-2")}
                    title={"Accept prompted description"}
                    onClick={() => {
                        setGenerated(null);
                        setDescription(generated);
                    }}
                >
                    <Icon.ArrowUp/>
                </button>
                <p>Accept?</p>
            </div>
        </div>
    );
}