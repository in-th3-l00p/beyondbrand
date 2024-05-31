"use client";

import * as Icon from "react-feather";
import {signOut, useSession} from "next-auth/react";
import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";

interface ProfileDropdownLinkProps {
    order?: "first" | "last";
    href: string;
    children: React.ReactNode;
}

interface ProfileDropdownButtonProps {
    order?: "first" | "last";
    children: React.ReactNode;
    onClick: () => void;
}

function getProfileDropdownLinkClasses(order?: "first" | "last") {
    return (
        "px-4 py-2 block bg-white hover:bg-zinc-200 transition-all w-full text-start " +
        (order === "first" ? "rounded-t-md" : "rounded-b-md")
    );
}

function ProfileDropdownLink({ order, href, children }: ProfileDropdownLinkProps) {
    return (
        <Link
            href={href}
            className={getProfileDropdownLinkClasses(order)}
        >
            {children}
        </Link>
    );
}

function ProfileDropdownButton({ onClick, order, children }: ProfileDropdownButtonProps) {
    return (
        <button
            onClick={onClick}
            className={getProfileDropdownLinkClasses(order)}
        >
            {children}
        </button>
    );
}

export default function ProfileDropdown() {
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const session = useSession();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                e.target !== dropdownRef.current
            )
                setOpen(false);
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return (
        <div className={"relative"} ref={dropdownRef}>
            {open && (
                <div
                    className={"absolute z-50 bottom-0 translate-y-full left-0 w-full shadow-lg rounded-b-md"}
                >
                    <ProfileDropdownLink href={"/profile"}>Profile</ProfileDropdownLink>
                    <ProfileDropdownLink href={"/settings/account"}>Settings</ProfileDropdownLink>
                    <ProfileDropdownButton onClick={() => signOut()} order={"last"}>Logout</ProfileDropdownButton>
                </div>
            )}

            <button
                type={"button"}
                className={
                    "flex justify-center items-center gap-4 px-4 py-2 rounded-md " +
                    "hover:bg-zinc-200 transition-all " +
                    (open ? "bg-white" : "bg-ghost-white")
                }
                onClick={() => setOpen(!open)}
            >
                <Icon.User />
                <div>{session.data?.user?.name}</div>
                {!open ? <Icon.ChevronDown /> : <Icon.ChevronUp />}
            </button>
        </div>
    );
}