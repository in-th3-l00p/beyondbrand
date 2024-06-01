import React from "react";

export default function Container({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={"p-6 overflow-x-hidden lg:mr-64 xl:mr-72 2xl:mr-80"}>
            {children}
        </div>
    )
}