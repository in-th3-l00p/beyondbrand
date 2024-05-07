"use client";

import {label, panel, panelTitle} from "@/app/brands/[id]/components/components";
import React, {useContext, useState} from "react";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";
import {ColorVisualizer} from "@/components/ColorVisualizer";
import {button} from "@/components/defaults";

export default function BrandDesign() {
    const { brand } = useContext(BrandDisplayContext);
    const [colors, setColors] = useState<string[]>(brand.colors);

    const checkChanges = () => {
        return colors.join() !== brand.colors.join();
    }

    return (
        <div className={panel() + " flex flex-col"}>
            <h2 className={panelTitle()}>Brand design:</h2>

            <div className="flex h-full flex-col justify-between gap-4">
                <div>
                    <h3 className={label()}>Colorscheme:</h3>
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
        </div>
    );
}