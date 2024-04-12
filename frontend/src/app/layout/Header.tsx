import Image from "next/image";
import HeaderLinks from "@/app/layout/HeaderLinks";

export default async function Header() {
    const LOGO_SIZE = 40;

    return (
        <header className={
            "flex justify-between items-center gap-8 " +
            "px-4 py-4 "
        }>
            <div className={"flex gap-4 items-center"}>
                <Image
                    src={"/logo.svg"}
                    alt={"logo"}
                    width={LOGO_SIZE}
                    height={LOGO_SIZE}
                />
                <h2 className={"text-xl"}>BeyondBrand</h2>
            </div>

            <HeaderLinks />
        </header>
    )
}