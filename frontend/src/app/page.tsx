import Image from "next/image";
import Link from "next/link";
import {getServerSession} from "next-auth";

export default async function Home() {
    const session = await getServerSession();

    return (
        <section className={
            "py-24 px-8 lg:px-32 xl:px-64 bg-ghost-white " +
            "grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-8"
        }>
            <Image
                src={"/logo.svg"} alt={"logo"}
                width={300}
                height={300}
                className={"justify-self-center md:justify-self-end md:col-start-2 row-start-1"}
            />

            <div className={
                "flex flex-col justify-center items-center gap-16 " +
                "sm:col-start-1 row-start-2 md:row-start-1 "
            }>
                <h1
                    className={
                        "text-6xl bg-clip-text bg-gradient-to-br from-cyan to-tomato text-transparent " +
                        "font-bold text-center"
                    }
                >
                    BeyondBrand
                </h1>
                <p className={"text-center mb-8 text-3xl"}>Build the branding of your business ventures faster, and
                    easier, than ever</p>

                <div className={"flex gap-4 flex-wrap justify-center"}>
                    {!!session ? (
                        <>
                            <Link
                                href={"/brands"}
                                className={"btn"}
                            >
                                My brands
                            </Link>
                            <Link
                                href={"/profile"}
                                className={"btn"}
                            >
                                Profile
                            </Link>
                        </>
                    ): (
                        <>
                            <Link
                                href={"/about"}
                                className={"btn"}
                            >
                                Find more
                            </Link>
                            <Link
                                href={"/register"}
                                className={"btn"}
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
