import React from "react";
import Link from "next/link";
import * as Icon from "react-feather";

export default function PageTitle({ back, children }: {
    back?: string;
    children: React.ReactNode;
}) {
    if (back)
        return (
            <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link href={back} className="btn">
                    <Icon.ArrowLeft />
                </Link>
                <h1 className={"text-4xl font-bold"}>{children}</h1>
            </div>

        );
    return (
        <h1 className={"text-4xl text-center font-bold pb-4"}>{children}</h1>
    );
}