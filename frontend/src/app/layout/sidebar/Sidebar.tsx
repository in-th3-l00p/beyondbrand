import React, {useState} from "react";
import {Branding} from "@/app/layout/Header";
import * as Icon from "react-feather";
import Link from "next/link";
import {signOut, useSession} from "next-auth/react";
import "./sidebar.scss";

function SidebarProfileToggle() {
    const session = useSession();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <button
                type={"button"}
                className={
                    "sidebar-link !flex items-center gap-4 " +
                    (open ? "border-b-2 border-b-zinc-200" : "")
                }
                onClick={() => setOpen(!open)}
            >
                <Icon.User />
                {session.data?.user?.name}
            </button>

            {open && (
                <>
                    <SidebarLink href={"/profile"}>Profile</SidebarLink>
                    <SidebarLink href={"/settings"}>Settings</SidebarLink>
                    <button
                        type={"button"}
                        className={"sidebar-link"}
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                </>
            )}
        </div>
    );
}

function SidebarLink({ href, children }: {
    href: string;
    children: React.ReactNode
}) {
    return (
        <Link href={href} className={"sidebar-link"}>
            {children}
        </Link>
    )
}

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
                    <div className="flex-grow" />

                    {!!session ? (
                        <SidebarProfileToggle />
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
