import {signOut, useSession} from "next-auth/react";
import React, {useState} from "react";
import * as Icon from "react-feather";
import {SidebarLink} from "@/app/layout/sidebar/SidebarLink";

export function SidebarProfileToggle() {
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
                <Icon.User/>
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