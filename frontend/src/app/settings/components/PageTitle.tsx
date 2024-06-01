import React from "react";

export default function PageTitle({title}: { title: string}) {
    return (
            <h1 className={"font-bold text-2xl mb-8 text-center md:text-left"}>{title}</h1>
)
}