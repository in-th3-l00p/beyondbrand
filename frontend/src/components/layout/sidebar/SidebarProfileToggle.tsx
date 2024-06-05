"use client";

import React, {useState} from "react";
import * as Icon from "react-feather";
import {SidebarLink} from "@/components/layout/sidebar/SidebarLink";
import {useUser} from "@auth0/nextjs-auth0/client";

export function SidebarProfileToggle() {
    const { user, isLoading } = useUser();
    const [open, setOpen] = useState(false);

    if (isLoading) return null;
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
                {user?.name}
            </button>

            {open && (
                <>
                    <SidebarLink href={"/profile"}>Profile</SidebarLink>
                    <SidebarLink href={"/settings"}>Settings</SidebarLink>
                    <SidebarLink href={"/api/auth/logout"}>
                        Logout
                    </SidebarLink>
                </>
            )}
        </div>
    );
}