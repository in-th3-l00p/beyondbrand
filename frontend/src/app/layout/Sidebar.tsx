import React from "react";
import {Branding} from "@/app/layout/Header";
import * as Icon from "react-feather";

export default function Sidebar({ setOpened }: {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <div className={
            "absolute z-50 w-screen h-screen top-0 left-0 flex "
        }>
            {/* Outer bg filter */}
            <div
                className={"flex-grow bg-slate-950 bg-opacity-70 hidden sm:block backdrop-blur"}
                onClick={() => setOpened(false)}
            />
            <aside
                className={"bg-ghost-white p-4 w-full sm:max-w-fit sm:px-8"}
            >
                <div className="flex gap-8 items-center justify-center border-b pb-4 mb-4">
                    <button
                        type={"button"}
                        className={"icon-btn"}
                        onClick={() => setOpened(false)}
                    >
                        <Icon.X />
                    </button>
                    <Branding />
                </div>
            </aside>
        </div>
    );
}
