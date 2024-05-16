"use client";

import clsx from "clsx";
import Image from "next/image";
import EditorContext, {Tools} from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import {useContext, useEffect, useRef, useState} from "react";
import {HexColorPicker} from "react-colorful";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

function Tool({ tool, title, icon }: {
    tool: Tools;
    title: string;
    icon: string;
}) {
    const { tool: currentTool, setTool } = useContext(EditorContext);

    return (
        <button
            type={"button"}
            title={title}
            className={clsx(
                "flex justify-center items-center",
                "p-2 rounded-md border-2",
                "enabled:hover:bg-gray-900 enabled:hover:bg-opacity-[2%]",
                (tool === currentTool && "bg-gray-900 bg-opacity-[10%]")
            )}
            disabled={tool === currentTool}
            onClick={() => setTool(tool)}
        >
            <Image
                src={icon}
                alt={title + "icon"}
                width={40}
                height={40}
            />
        </button>
    );
}

function ColorPicker() {
    const { brand } = useContext(BrandContext);
    const { color, setColor } = useContext(EditorContext);
    const [open, setOpen] = useState(false);

    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                pickerRef.current !== event.target &&
                !pickerRef.current.contains(event.target as Node)
            )
                setOpen(false);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div
            ref={pickerRef}
            className={"relative flex justify-center items-center"}
        >
            <button
                type={"button"}
                className={clsx(
                    `w-10 h-10 rounded-md border-2`,
                    open && "rounded-b-none"
                )}
                style={{ backgroundColor: color }}
                onClick={() => setOpen(!open)}
            />

            {open && (
                <div
                    className={clsx(
                        "absolute bottom-0 left-0 translate-y-full",
                        "p-8 bg-ghost-white shadow-md border border-cyan rounded-md rounded-tl-none"
                    )}
                >
                    <HexColorPicker
                        color={color}
                        onChange={setColor}
                    />
                    <div className={"mt-4 pt-2 border-t"}>
                        <p>Brand colors:</p>

                        <div className="flex justify-around flex-wrap">
                            {brand.colors.map((color, index) => (
                                <button
                                    key={index}
                                    type={"button"}
                                    className={clsx(
                                        "w-12 h-12 rounded-md border-2",
                                        "enabled:hover:bg-gray-900 enabled:hover:bg-opacity-[2%]",
                                    )}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setColor(color)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Toolbox() {
    return (
        <div
            className={clsx(
                "w-full bg-ghost-white rounded-md shadow-md p-2 px-4",
                "flex flex-wrap items-center gap-4 mb-8"
            )}
        >
            <p>Tools:</p>

            <Tool
                tool={Tools.SELECT}
                title={"Select"}
                icon={"/icons/toolbox/cursor.svg"}
            />

            <Tool
                tool={Tools.RECTANGLE}
                title={"Rectangle"}
                icon={"/icons/toolbox/rectangle.svg"}
            />

            <Tool
                tool={Tools.CIRCLE}
                title={"Circle"}
                icon={"/icons/toolbox/circle.svg"}
            />

            <p className={"ms-4"}>Color:</p>
            <ColorPicker />
        </div>
    );
}