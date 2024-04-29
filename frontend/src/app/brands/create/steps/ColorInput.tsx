"use client";

import {FormLabel} from "@/app/brands/create/components/FormLabel";
import React, {useContext, useEffect, useState} from "react";
import FormNext from "@/app/brands/create/components/FormNext";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import * as Icon from "react-feather";
import InformationGenerator from "@/app/brands/create/components/colors/InformationGenerator";
import {ColorVisualizer} from "@/app/brands/create/components/colors/ColorVisualizer";

export default function ColorInput() {
    const [colorCount, setColorCount] = useState<number>(3);
    const {colors, setColors} = useContext(BrandContext);

    useEffect(() => {
        if (colors.length < colorCount)
            setColors([...colors, ...Array.from({length: colorCount - colors.length}).map(() => "#000000")]);
        else if (colors.length > colorCount)
            setColors(Array
                .from({length: colorCount})
                .map((_, i) => colors[i] || "#000000"));
    }, [colorCount, colors, setColors]);

    return (
        <div className={"form-container"}>
            <FormLabel back>{`Let's establish the colors of your brand`}</FormLabel>
            <div className={"mb-8 border-b w-full text-center"}>
                <p>Choose the colors that represent your brand</p>
            </div>

            <div className={"mb-4"}>
                <div className="flex gap-4">
                    <label htmlFor={"colorCount"}>Color count:</label>
                    <select
                        name="colorCount" id="colorCount"
                        value={colorCount}
                        onChange={(e) => setColorCount(parseInt(e.target.value))}
                    >
                        {Array.from({length: 6}).map((_, i) => {
                            if (i === 2)
                                return <option value={i + 1} key={i}>{i + 1} (recommended)</option>
                            return <option value={i + 1} key={i}>{i + 1}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className="mb-4 flex justify-center items-center gap-4 w-full">
                {colors.map((color, i) => (
                    <ColorVisualizer
                        key={i}
                        color={color}
                        setColor={(color) => setColors(colors.map((c, j) => i === j ? color : c))}
                    />
                ) )}
            </div>

            <div>
                <div className="flex gap-4">
                    <button
                        type={"button"} className={"btn"}
                        onClick={() => setColorCount(colorCount - 1)}
                        disabled={colorCount === 1}
                    ><Icon.Minus /></button>
                    <button
                        type={"button"} className={"btn"}
                        onClick={() => setColorCount(colorCount + 1)}
                        disabled={colorCount === 6}
                    ><Icon.Plus /></button>
                </div>
            </div>

            <div className="py-4 my-4 border-t border-b w-full">
                <h2 className={"text-lg"}>Generation</h2>
                <p>Use AI powered tools to generate the colors of your brand</p>
                <InformationGenerator
                    colors={colors}
                    setColors={setColors}
                />
            </div>

            <FormNext next={FormStep.LogoDialog} />
        </div>
    );
}