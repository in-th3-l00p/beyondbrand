"use client";

import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import React, {useContext, useState} from "react";
import clsx from "clsx";
import {button, input} from "@/components/primitives";
import * as Icon from "react-feather";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

export default function DescriptionGeneration() {
    const { brand, setBrand } = useContext(BrandContext);
    const [prompt, setPrompt] = useState<string>("");
    const [generated, setGenerated] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Generate description</h2>

            <div className={clsx(generated && "mb-8")}>
                <p>Prompt:</p>
                <textarea
                    name="improved"
                    id="improved" className={clsx(input(), "mb-4")}
                    rows={2}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type={"button"}
                    className={button()}
                    disabled={!prompt && loading || prompt.length < 10}
                    onClick={() => {
                        setLoading(true);
                        fetch("/api/brands/generate/description/prompted", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ name, prompt }),
                            cache: "no-cache"
                        })
                            .then(response => response.json())
                            .then((data: { brandDescription?: string }) => {
                                setGenerated(data.brandDescription || "");
                            })
                            .finally(() => setLoading(false));
                    }}
                >
                    Generate
                </button>
            </div>

            {loading && <p className={"mt-4"}>Loading...</p>}

            {generated && (
                <div>
                    <p>AI Generated description:</p>
                    <textarea
                        name="generated"
                        id="generated" className={clsx(input(), "mb-4")}
                        rows={6}
                        defaultValue={generated}
                    />

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            type={"button"} className={"btn mb-2"}
                            title={"Accept prompted description"}
                            disabled={loading}
                            onClick={() => {
                                setGenerated(null);
                                setLoading(true);
                                fetch("/api/brands", {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        _id: brand._id,
                                        description: generated
                                    }),
                                    cache: "no-cache"
                                })
                                    .then(resp => resp.json())
                                    .then((data) => setBrand(data))
                                    .finally(() => setLoading(false));
                            }}
                        >
                            <Icon.ArrowUp/>
                        </button>
                        <p className={"pb-2"}>Accept?</p>
                    </div>
                </div>
            )}
        </div>
    );
}
