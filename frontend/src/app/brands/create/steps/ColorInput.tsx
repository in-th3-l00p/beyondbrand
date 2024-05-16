"use client";

import {FormLabel} from "@/app/brands/create/components/FormLabel";
import React, {useContext, useEffect, useState} from "react";
import FormNext from "@/app/brands/create/components/FormNext";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import * as Icon from "react-feather";
import InformationGenerator from "@/app/brands/create/components/colors/InformationGenerator";
import {ColorVisualizer} from "@/components/colors/ColorVisualizer";
import ColorCountSelect from "@/components/colors/ColorCountSelect";
import {formContainer} from "@/components/form/primitives";

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
        <div className={formContainer()}>
            <FormLabel back>{`Let's establish the colors of your brand`}</FormLabel>
            <div className={"mb-8 border-b w-full text-center"}>
                <p>Choose the colors that represent your brand</p>
            </div>

            <ColorCountSelect
                colorCount={colorCount}
                setColorCount={setColorCount}
                className={"mb-4"}
            />

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