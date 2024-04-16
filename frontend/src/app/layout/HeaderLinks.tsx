"use client";

import {useEffect, useState} from "react";
import * as Icon from "react-feather";
import Sidebar from "@/app/layout/Sidebar";
import Link from "next/link";

export default function HeaderLinks({ windowWidthLimit }: {
    windowWidthLimit?: number;
}) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [opened, setOpened] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (windowWidthLimit && window.innerWidth > windowWidthLimit) {
                setOpened(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (windowWidthLimit && windowWidth > windowWidthLimit)
        return (
            <div className={"flex gap-4 text-xl w-full"}>
                <Link href={"/"}>Home</Link>
                <Link href={"/login"} className={"ms-auto"}>Login</Link>
                <Link href={"/register"}>Register</Link>
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