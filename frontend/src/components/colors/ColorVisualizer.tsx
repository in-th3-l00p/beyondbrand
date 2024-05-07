import React, {useEffect, useState} from "react";

export function ColorVisualizer({ color, setColor }: {
    color: string,
    setColor?: (color: string) => void
}) {
    const [inputColor, setInputColor] = useState<string>(color);

    useEffect(() => {
        if (color === inputColor) return;
        setInputColor(color);
    }, [color]);

    return (
        <div className={"w-full max-w-24"}>
            <input
                type="color"
                value={color}
                onChange={(e) => {
                    if (!setColor) return;
                    setColor(e.target.value)
                }}
                className={"w-full h-48 rounded-md shadow-md"}
                readOnly={!setColor}
                disabled={!setColor}
            />
            <input
                type="text"
                className={
                    "input w-full " +
                    (inputColor.match(/^#[0-9a-fA-F]{6}$/) ? "" : "!border-tomato")
                }
                value={inputColor}
                disabled={!setColor}
                onChange={(e) => {
                    if (!setColor || e.target.value.length > 7) return;
                    setInputColor(e.target.value);
                    if (e.target.value.match(/^#[0-9a-fA-F]{6}$/))
                        setColor(e.target.value);
                }}
            />
        </div>
    );
}