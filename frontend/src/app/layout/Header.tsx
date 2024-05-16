import Image from "next/image";
import HeaderLinks from "@/app/layout/HeaderLinks";
import Link from "next/link";
import clsx from "clsx";

export function Branding() {
    const LOGO_SIZE = 60;

    return (
        <Link
            className={"flex gap-4 items-center"}
            href={"/"}
        >
            <Image
                src={"/logo.svg"}
                alt={"logo"}
                width={LOGO_SIZE}
                height={LOGO_SIZE}
            />
            <h2 className={"text-2xl"}>BeyondBrand</h2>
        </Link>
    );
}

export default async function Header() {
    return (
        <header className={clsx(
            "flex items-center gap-8 responsive-px",
            "py-4 bg-ghost-white shadow-md"
        )}>
            <Branding />
            <HeaderLinks windowWidthLimit={768} />
        </header>
    )
}