import React from "react";
import {Branding} from "@/app/layout/Header";
import * as Icon from "react-feather";
import {useSession} from "next-auth/react";
import "./sidebar.scss";
import {SidebarProfileToggle} from "@/app/layout/sidebar/SidebarProfileToggle";
import {SidebarLink} from "@/app/layout/sidebar/SidebarLink";

export default function Sidebar({ setOpened }: {
    setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const session = useSession();

    return (
        <div className={
            "fixed z-50 w-screen h-screen top-0 left-0 flex overflow-y-hidden"
        }>
            {/* Outer bg filter */}
            <div
                className={"flex-grow bg-slate-950 bg-opacity-70 hidden sm:block backdrop-blur"}
                onClick={() => setOpened(false)}
            />
            <aside
                className={"bg-ghost-white w-full sm:max-w-fit flex flex-col"}
            >
                <div className="flex flex-wrap gap-8 items-center justify-center border-b pb-4 px-8 pt-4">
                    <button
                        type={"button"}
                        className={"icon-btn"}
                        onClick={() => setOpened(false)}
                    >
                        <Icon.X />
                    </button>
                    <Branding />
                </div>


                <div className="flex-grow flex flex-col w-full">
                    <SidebarLink href={"/"}>Home</SidebarLink>
                    <SidebarLink href={"/about"}>About</SidebarLink>
                    <SidebarLink href={"/contact"}>Contact</SidebarLink>
                    <div className="flex-grow" />

                    {(session && session.status === "authenticated") ? (
                        <>
                            <SidebarLink href={"/brands"}>Your brands</SidebarLink>
                            <SidebarProfileToggle />
                        </>
                    ): (
                        <>
                            <SidebarLink href={"/login"}>Login</SidebarLink>
                            <SidebarLink href={"/register"}>Register</SidebarLink>
                        </>
                    )}
                </div>
            </aside>
        </div>
    );
}
