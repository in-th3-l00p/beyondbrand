"use client";

import clsx from "clsx";
import {tv} from "tailwind-variants";

export const panel = tv({
    base: clsx(
        "w-full bg-ghost-white rounded-md shadow-md p-8 mb-8"
    ),
    variants: {
        padding: {
            small: "p-2 px-4",
        },
        layouts: {
            base: "flex justify-center items-center flex-grow",
            line: "flex flex-wrap items-center gap-4",
            properties: "flex flex-col gap-4 flex-shrink"
        },
        margin: {
            small: "mb-4"
        },
    }
});

