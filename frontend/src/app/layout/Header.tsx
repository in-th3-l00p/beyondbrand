import Image from "next/image";
import HeaderLinks from "@/app/layout/HeaderLinks";
import Link from "next/link";

export function Branding() {
    const LOGO_SIZE = 60;

    return (
        <Link
            className={"flex gap-4 items-center mx-w-fit"}
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
        <header className={"py-4 bg-ghost-white shadow-md"}>
            <div className="container mx-auto flex items-center">
                <Branding />
                <HeaderLinks windowWidthLimit={768} />
            </div>
        </header>
    )
}