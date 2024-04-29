"use client";

import React, {useContext, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import Loading from "@/app/brands/create/components/Loading";

export default function GenerateButton({ previewLogo, setPreviewLogo }: {
    previewLogo: string | null;
    setPreviewLogo: (previewLogo: string) => void;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    const { name, description, colors, setLogo } = useContext(BrandContext);

    if (loading)
        return <Loading />
    return (
        <div className="flex flex-wrap justify-center items-center gap-4">
            <button
                type={"button"}
                className={"btn"}
                onClick={() => {
                    setLoading(true);
                    console.log("request");
                    fetch("/api/brands/generateLogo", {
                        body: JSON.stringify({ name, description, colors }),
                        method: "POST"
                    })
                        .then(resp => resp.json())
                        .then((b64Json: { b64_json: string }) => setPreviewLogo(
                            "data:image/jpeg;base64," + b64Json.b64_json
                        ))
                        .finally(() => setLoading(false));
                }}
            >
                Generate
            </button>

            {previewLogo && (
                <button
                    type={"button"}
                    className={"btn"}
                    onClick={() => setLogo(previewLogo)}
                >
                    Use this logo
                </button>
            )}
        </div>
    );
}