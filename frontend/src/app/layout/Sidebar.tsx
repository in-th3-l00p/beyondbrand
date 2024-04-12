import React from "react";

export default function Sidebar() {
    return (
        <div className={
            "absolute z-50 w-screen h-screen top-0 left-0 flex "
        }>
            {/* Outer bg filter */}
            <div className={"flex-grow bg-slate-950 bg-opacity-70 hidden sm:block"} />
            <aside className={"bg-ghost-white p-4 flex-grow sm:flex-shrink"}>
                <p>lexy</p>
            </aside>
        </div>
    );
}
