"use client";

import React, {useEffect, useState} from "react";
import * as Icon from "react-feather";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import Link from "next/link";
import ProfileDropdown from "@/components/layout/ProfileDropdown";
import {useUser} from "@auth0/nextjs-auth0/client";

function DesktopLink({ href, children }: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className={"hover:underline"}
        >
            {children}
        </Link>
    );
}

export default function HeaderLinks({ windowWidthLimit }: {
    windowWidthLimit?: number;
}) {
    const [windowWidth, setWindowWidth] = useState(0);
    const [opened, setOpened] = useState(false);
    const { user, isLoading } = useUser();

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (windowWidthLimit && window.innerWidth > windowWidthLimit) {
                setOpened(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidthLimit]);

    if (windowWidthLimit && windowWidth > windowWidthLimit)
        return (
            <div className={"flex items-center gap-4 text-xl ps-8 flex-grow"}>
                <DesktopLink href={"/"}>Home</DesktopLink>
                <DesktopLink href={"/about"}>About</DesktopLink>
                <DesktopLink href={"/contact"}>Contact</DesktopLink>
                <DesktopLink href={"/blog/posts"}>Blog</DesktopLink>
                <DesktopLink href={"/forum/posts"}>Forum</DesktopLink>

                <div className="flex-grow ms-auto" />
                {!isLoading && (
                    <>
                        {!user ? (
                            <>
                                <DesktopLink href={"/api/auth/login"}>Login</DesktopLink>
                            </>
                        ) : (
                            <div className="flex gap-4 items-center">
                                <DesktopLink href={"/brands"}>Your brands</DesktopLink>
                                <ProfileDropdown />
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    return (
        <>
            {opened && (
                <Sidebar setOpened={setOpened} />
            )}
            <button
                type={"button"}
                className={"icon-btn ms-auto"}
                onClick={() => setOpened(!opened)}
            >
                <Icon.Sidebar size={30} />
            </button>
        </>
    );
}