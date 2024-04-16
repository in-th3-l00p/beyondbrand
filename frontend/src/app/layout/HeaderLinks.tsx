"use client";

import {useEffect, useState} from "react";
import * as Icon from "react-feather";
import Sidebar from "@/app/layout/sidebar/Sidebar";
import Link from "next/link";
import {useSession} from "next-auth/react";
import ProfileDropdown from "@/app/layout/ProfileDropdown";

export default function HeaderLinks({ windowWidthLimit }: {
    windowWidthLimit?: number;
}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const session = useSession();
    const [opened, setOpened] = useState(false);

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
            <div className={"flex items-center gap-4 text-xl w-full ps-8"}>
                <Link href={"/"}>Home</Link>
                <div className="flex-grow" />

                {session.status !== "loading" && (
                    <>
                        {session.status === "unauthenticated" ? (
                            <>
                                <Link href={"/login"}>Login</Link>
                                <Link href={"/register"}>Register</Link>
                            </>
                        ) : (
                            <ProfileDropdown />
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