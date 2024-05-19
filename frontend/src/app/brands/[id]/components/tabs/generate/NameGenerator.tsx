"use client";

import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import React, {useContext, useState} from "react";
import {button} from "@/components/primitives";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import clsx from "clsx";

export default function NameGenerator() {
    const [generatedName, setGeneratedName] = useState<string>("");
    const [query, setQuery]  = useState<string>("");
    const [loading, setLoading] = useState(false);

    const { brand, setBrand } = useContext(BrandContext);

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Generate name</h2>

            <div>
                <label htmlFor="query">Name brief:</label>

                <textarea
                    id={"query"}
                    className={"input mb-4"}
                    onChange={(e) => setQuery(e.target.value)}
                    rows={6}
                    defaultValue={query}
                />

                <button
                    type={"button"} className={clsx(button(), "mb-4")}
                    disabled={!query && query.length < 10 && loading}
                    onClick={() => {
                        setLoading(true);
                        fetch("/api/brands/generate/name", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({description: query}),
                            cache: "no-cache"
                        })
                            .then(response => response.json())
                            .then((data: { brandName?: string }) => {
                                setGeneratedName(data.brandName || "");
                            })
                            .finally(() => setLoading(false));
                    }}
                >
                    Generate
                </button>
            </div>

            <div>
                {loading && <p>Loading...</p>}
                <label htmlFor="name" className={"self-start"}>Generated name:</label>
                <input
                    name={"name"}
                    type="text"
                    readOnly={true}
                    value={generatedName}
                    className={"input mb-4"}
                />

                <button
                    type={"button"}
                    disabled={!generatedName}
                    className={button()}
                    onClick={() => {
                        setLoading(true);
                        fetch("/api/brands", {
                            method: "PUT",
                            body: JSON.stringify({
                                _id: brand._id,
                                name: generatedName,
                            }),
                            cache: "no-cache"
                        })
                            .then(resp => resp.json())
                            .then((data) => setBrand(data))
                            .finally(() => setLoading(false));
                    }}
                >Set</button>
            </div>
        </div>
    );
}