import React from "react";
import Link from "next/link";

export function SidebarLink({href, children}: {
    href: string;
    children: React.ReactNode
}) {
    return (
        <Link href={href} className={"sidebar-link"}>
            {children}
        </Link>
    )
}