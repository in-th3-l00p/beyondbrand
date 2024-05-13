"use client";

import {panel, PanelLoading, panelTitle} from "@/app/brands/[id]/components/components";
import React, {useContext, useState} from "react";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";
import {ColorVisualizer} from "@/components/colors/ColorVisualizer";
import {button} from "@/components/primitives";
import ColorCountSelect from "@/components/colors/ColorCountSelect";

export default function BrandColorScheme() {
    const { brand, setBrand } = useContext(BrandDisplayContext);

    const [colors, setColors] = useState<string[]>(brand.colors);
    const [loading, setLoading] = useState<boolean>(false);

    const checkChanges = () => {
        return colors.join() !== brand.colors.join();
    }

    return (
        <div className={panel() + " flex flex-col relative"}>
            <h2 className={panelTitle()}>Colorscheme:</h2>

            <div className="flex h-full flex-col justify-between gap-4">
                <div>
                    <ColorCountSelect
                        colorCount={colors.length}
                        setColorCount={(count) => {
                            if (count < colors.length)
                                setColors((colors) => colors.slice(0, count));
                            else
                                setColors((colors) =>
                                    [...colors, ...(
                                        new Array(count - colors.length))
                                            .fill("#000000")
                                    ]);
                        }}
                        className={"mb-4"}
                    />
                    <div className="flex justify-center gap-4">
                        {colors.map((color, i) => (
                            <ColorVisualizer
                                color={color}
                                setColor={(color) => {
                                    setColors((colors) => {
                                        colors[i] = color;
                                        return [...colors];
                                    });
                                }}
                                key={i}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap gap-4">
                    <button
                        type={"button"}
                        disabled={!checkChanges()}
                        className={button()}
                        onClick={() => {
                            setLoading(true);
                            fetch("/api/brands", {
                                method: "PUT",
                                body: JSON.stringify({
                                    _id: brand._id,
                                    colors: colors
                                }),
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                cache: "no-cache"
                            })
                                .then(resp => resp.json())
                                .then(brand => setBrand(brand))
                                .finally(() => setLoading(false));
                        }}
                    >
                        Save
                    </button>

                    <button
                        type={"button"}
                        className={button({ type: "danger" })}
                        disabled={!checkChanges()}
                        onClick={() => {
                            setColors(() => brand.colors);
                        }}
                    >
                        Discard
                    </button>
                </div>
            </div>

            {loading && <PanelLoading />}
        </div>
    );
}