"use client";

import React, {useContext, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import Loading from "@/app/brands/create/components/Loading";
import toast from "react-hot-toast";
import generationService from "@/service/generationService";
import clsx from "clsx";
import {button} from "@/components/primitives";

export default function GenerateButton() {
    const [loading, setLoading] = useState<boolean>(false);
    const { name, description, colors, setLogo } = useContext(BrandContext);

    if (loading)
        return <Loading />
    return (
        <button
            type={"button"}
            className={clsx(button(), "mb-4")}
            onClick={() => {
                setLoading(true);
                generationService.logo(name, description, colors)
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