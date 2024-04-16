import Image from "next/image";
import HeaderLinks from "@/app/layout/HeaderLinks";

export function Branding() {
    const LOGO_SIZE = 60;

    return (
        <div className={"flex gap-4 items-center me-8"}>
            <Image
                src={"/logo.svg"}
                alt={"logo"}
                width={LOGO_SIZE}
                height={LOGO_SIZE}
            />
            <h2 className={"text-2xl"}>BeyondBrand</h2>
        </div>
    );
}

export default async function Header() {
    return (
        <header className={
            "flex items-center gap-8 " +
            "px-4 sm:px-8 md:px-16 lg:px-32 xl:px-64 " +
            "py-4 bg-ghost-white shadow-md"
        }>
            <Branding />
            <HeaderLinks windowWidthLimit={768} />
        </header>
    )
}