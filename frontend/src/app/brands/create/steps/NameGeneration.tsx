"use client";

import React, {useContext} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import FormNext from "@/app/brands/create/components/FormNext";

export function NameGeneration() {
    const {
        name, setName,
        description, setDescription
    } = useContext(BrandContext);

    return (
        <form className={"form-container"}>
            <FormLabel back>
                Give us a brief about your business idea. We will generate a name for you.
            </FormLabel>
            <textarea
                className={"input mb-4"}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                defaultValue={description}
            />

            <button
                type={"button"} className={"btn mb-4"}
                disabled={!description}
                onClick={() => {
                    fetch("/api/brands/generate/name", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({description: description}),
                        cache: "no-cache"
                    })
                        .then(response => response.json())
                        .then((data: { brandName?: string }) => {
                            setName(data.brandName || "");
                        })
                }}
            >
                Generate
            </button>

            <label htmlFor="name" className={"self-start"}>Generated name:</label>
            <input
                type="text"
                readOnly={true}
                value={name}
                className={"input mb-4"}
            />

            <FormNext
                disabled={!name}
                next={FormStep.DescriptionInput}
            />
        </form>
    );
}