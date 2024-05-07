import React from "react";

export default function PageTitle({ children }: {
    children: React.ReactNode
}) {
    return (
        <h1 className={"text-4xl text-center font-bold pb-4"}>{children}</h1>
    );
}