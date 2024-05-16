import React from "react";

export default function ColorCountSelect({className = "", colorCount, setColorCount}: {
    className?: string;
    colorCount: number;
    setColorCount: (colorCount: number) => void;
}) {
    return (
        <div className={"flex gap-4 " + className}>
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
    );
}