"use client";

import React, {useContext, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import Loading from "@/app/brands/create/components/Loading";

export default function GenerateButton() {
    const [loading, setLoading] = useState<boolean>(false);
    const { name, description, colors, setLogo } = useContext(BrandContext);

    if (loading)
        return <Loading />
    return (
        <button
            type={"button"}
            className={"btn mb-4"}
            onClick={() => {
                setLoading(true);
                fetch("/api/brands/generate/logo", {
                    body: JSON.stringify({ name, description, colors }),
                    method: "POST"
                })
                    .then(resp => resp.json())
                    .then((b64Json: [{ b64_json: string }]) => setLogo(b64Json[0].b64_json))
                    .finally(() => setLoading(false));
            }}
        >
            Generate
        </button>
    );
}