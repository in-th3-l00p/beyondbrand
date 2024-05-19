"use client";

import React, {useContext, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import Loading from "@/app/brands/create/components/Loading";
import toast from "react-hot-toast";

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
                    .then((data: { b64_json: string }) => {
                        setLogo("data:image/jpeg;base64," + data.b64_json)
                        toast.success("Logo generated successfully");
                    })
                    .finally(() => setLoading(false));
            }}
        >
            Generate
        </button>
    );
}