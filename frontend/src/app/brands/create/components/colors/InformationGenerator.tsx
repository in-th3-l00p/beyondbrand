"use client";

import React, {useContext, useState} from "react";
import Loading from "@/app/brands/create/components/Loading";
import BrandContext from "@/app/brands/create/BrandContext";
import {ColorVisualizer} from "@/components/colors/ColorVisualizer";
import toast from "react-hot-toast";

export default function InformationGenerator({ colors, setColors }: {
    colors: string[],
    setColors: (colors: string[]) => void
}) {
    const { name, description } = useContext(BrandContext);
    const [generatedColors, setGeneratedColors] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const generateColors = () => {
        setLoading(true);
        fetch("/api/brands/generate/colors?colors=" + colors.length, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, description }),
            cache: "no-cache"
        })
            .then(response => response.json())
            .then((data: { colors?: string[] }) => {
                setGeneratedColors(data.colors || []);
            })
            .finally(() => setLoading(false));
        if(generatedColors!==null||generatedColors==='')
            toast.success("Colors regenerated successfully");
        else
            toast.success("Colors generated successfully");
    }

    if (loading)
        return (
            <div className="mt-4">
                <Loading />
            </div>
        );
    if (generatedColors)
        return (
            <div className={"my-4 text-center"}>
                <p>Generated colors:</p>
                <div className={"flex flex-wrap justify-center items-center gap-4 mb-4"}>
                    {generatedColors.map((color, index) => (
                        <ColorVisualizer
                            key={index}
                            color={color}
                        />
                    ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                    <button
                        type={"button"} className={"btn"}
                        onClick={() => {
                            setColors(generatedColors);
                            setGeneratedColors(null);
                        }}
                    >
                        Use colors
                    </button>

                    <button
                        type={"button"} className={"btn"}
                        onClick={generateColors}
                    >
                        Regenerate colors
                    </button>
                </div>
            </div>
        );
    return (
        <div className={"my-4 text-center"}>
            <p>Generate using brand information:</p>
            <button
                type={"button"} className={"btn"}
                onClick={generateColors}
            >
                Generate colors
            </button>
        </div>
    );
}