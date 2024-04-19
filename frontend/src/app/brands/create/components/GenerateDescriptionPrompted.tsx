"use client";

import React, {useContext, useState} from "react";
import * as Icon from "react-feather";
import BrandContext from "@/app/brands/create/BrandContext";

export default function GenerateDescriptionPrompted() {
    const { setDescription } = useContext(BrandContext);
    const [prompt, setPrompt] = useState<string>("");
    const [generated, setGenerated] = useState<string | null>(null);

    if (!generated)
        return (
            <div className={"w-full flex items-center gap-4 mb-4"}>
                <p>Prompt:</p>
                <textarea
                    name="improved"
                    id="improved" className={"input flex-grow"}
                    rows={1}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                    type={"button"}
                    className={"btn"}
                    disabled={!prompt}
                    onClick={() => {
                        fetch("/api/brands/generateDescription/prompted", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({ prompt }),
                            cache: "no-cache"
                        })
                            .then(response => response.json())
                            .then((data: { brandDescription?: string }) => {
                                setGenerated(data.brandDescription || "");
                            });
                    }}
                >
                    Generate
                </button>
            </div>
        );
    return (
        <div className={"mt-4 mb-8 w-full flex gap-4 flex-wrap items-center"}>
            <div className={"flex-grow"}>
                <p>AI Generated description:</p>
                <textarea
                    name="generated"
                    id="generated" className={"input w-full resize-none"}
                    rows={6}
                    value={generated}
                />
            </div>
            <div className="text-center">
                <button
                    type={"button"} className={"btn mb-2"}
                    title={"Accept generated description"}
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