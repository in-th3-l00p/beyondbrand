import React from "react";

export default function SectionContainer({children,withLine=true}: Readonly<{ children: React.ReactNode; withLine?: boolean }>) {
    return (
        <div className={"w-full mb-4"}>
            {children}
            {
                withLine && <hr className={"border-black"}/>
            }
        </div>
    )
}