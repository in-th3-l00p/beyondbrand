import {tv} from "tailwind-variants";
import React from "react";

export const panel = tv({
    base:
        "w-full h-full bg-ghost-white p-8 rounded-md rounded-md shadow-md " +
        "self-center justify-self-center"
});

export const panelTitle = tv({
    base: "text-3xl font-bold mb-4"
});

export const label = tv({
    base: "text-2xl"
});

export function PanelLoading() {
    return (
        <div className={
            "absolute top-0 left-0 w-full h-full " +
                    "bg-black bg-opacity-50 rounded-md " +
                "flex flex-col justify-center items-center"
        }>
            <p className="text-white">Loading...</p>
        </div>
    );
}
