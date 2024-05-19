import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import {ColorVisualizer} from "@/components/colors/ColorVisualizer";
import * as Icon from "react-feather";
import React, {useContext, useState} from "react";
import Loading from "@/app/brands/create/components/Loading";
import {input} from "@/components/primitives";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import clsx from "clsx";

function ColorGenerator({ colors, setColors }: {
    colors: string[],
    setColors: (colors: string[]) => void
}) {
    const [description, setDescription] = useState<string>("");
    const [generatedColors, setGeneratedColors] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(false);

    const generateColors = () => {
        setLoading(true);
        fetch("/api/brands/generate/colors/prompted?colors=" + colors.length, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ description }),
            cache: "no-cache"
        })
            .then(response => response.json())
            .then((data: { colors?: string[] }) => {
                setGeneratedColors(data.colors || []);
            })
            .finally(() => setLoading(false));
    }

    if (loading)
        return (
            <div className="mt-8">
                <Loading />
            </div>
        );
    if (generatedColors)
        return (
            <div className={"mt-8 text-center"}>
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
        <div className={"mt-8 text-center"}>
            <div>
                <label htmlFor="description" className={"self-start"}>Query:</label>
                <textarea
                    name={"description"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={clsx(input(), "mb-4")}
                />
            </div>

            <button
                type={"button"} className={"btn"}
                onClick={generateColors}
            >
                Generate colors
            </button>
        </div>
    );
}

export default function ColorSchemeGenerator() {
    const [loading, setLoading] = useState<boolean>(false);
    const { brand, setBrand } = useContext(BrandContext);
    const colors = brand.colors;
    const setColors = (colors: string[]) => {
        setLoading(true);
        fetch("/api/brands", {
            method: "PUT",
            body: JSON.stringify({
                _id: brand._id, colors
            }),
            cache: "no-cache"
        })
            .then(resp => resp.json())
            .then((data) => setBrand(data))
            .finally(() => setLoading(false));
    };

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Generate color scheme</h2>
            {loading && <p>Loading...</p>}

            <div className="mb-4 flex justify-center items-center gap-4 w-full">
                {colors.map((color, i) => (
                    <ColorVisualizer
                        key={i}
                        color={color}
                        setColor={(color) => setColors(colors.map((c, j) => i === j ? color : c))}
                    />
                ) )}
            </div>

            <div className="flex gap-4 justify-center">
                <button
                    type={"button"} className={"btn"}
                    onClick={() => {
                        setColors(Array
                            .from({length: colors.length - 1})
                            .map((_, i) => colors[i] || "#000000"));
                    }}
                    disabled={colors.length === 1}
                ><Icon.Minus /></button>
                <button
                    type={"button"} className={"btn"}
                    onClick={() => {
                        setColors(Array
                            .from({length: colors.length + 1})
                            .map((_, i) => colors[i] || "#000000"));
                    }}
                    disabled={colors.length === 6}
                ><Icon.Plus /></button>
            </div>

            <div className="w-full">
                <ColorGenerator
                    colors={colors}
                    setColors={setColors}
                />
            </div>
        </div>
    );
}
