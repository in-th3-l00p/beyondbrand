'use client'
import { tv } from "tailwind-variants";
import clsx from "clsx";
import Image from "next/image";
import wp from "../../../public/wp.png";
import { useState } from "react";
import Card from "@/app/about/components/Card";
import Link from "next/link";

const gradientText = tv({
    base: "bg-clip-text bg-gradient-to-br from-cyan to-tomato text-transparent",
});

export default function Page() {
    const [showPopup, setShowPopup] = useState(false);

    const handleButtonClick = () => {
        setShowPopup(true);
    };

    const handleCloseClick = () => {
        setShowPopup(false);
    };

    return (
        <section className="my-12 ">
            <div className="h-screen px-4 ">
                <div className="text-center space-y-12">
                    <p className="text-2xl 2xl:text-4xl font-medium text-gray-500">About Us</p>
                    <h1 className="text-6xl 2xl:text-8xl font-extrabold">WE CHANGE THE WAY YOU DO <br /> BRANDING</h1>
                    <p className="text-xl 2xl:text-3xl">
                        <span className={clsx("font-bold", gradientText())}>BeyondBrand</span> helps you build the brand of your business <br />faster, and easier, than ever
                    </p>
                </div>
                <div className="flex w-full justify-center my-6">
                    <button
                        className="btn text-xl 2xl:text-3xl py-4"
                    >
                        Try <span className={clsx("font-bold", gradientText())}>BeyondBrand</span> now
                    </button>
                </div>
            </div>

            <div className="grid mx-4 sm:mx-20 lg:mx-52 2xl:mx-12 grid-cols-1 md:grid-cols-2 2xl:flex 2xl:justify-center gap-16 items-center 2xl:items-start">
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">5000+</p>
                            <p className="text-2xl 2xl:text-4xl">Rewritten lines of code</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">1000+</p>
                            <p className="text-2xl 2xl:text-4xl">Coffe’s drinked</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">10+</p>
                            <p className="text-2xl 2xl:text-4xl">Oops i pushed to main</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-gray-200 rounded-xl shadow-md shadow-gray-500/50">
                        <div className="pt-4 pl-6">
                            <p className="text-2xl 2xl:text-4xl font-bold">5+</p>
                            <p className="text-2xl 2xl:text-4xl">Unslept nights</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-screen flex flex-col md:flex-row items-center py-16 px-24">
                <div className="md:w-2/3 text-center md:text-left space-y-6">
                    <h1 className="text-4xl 2xl:text-6xl">
                        Our mission: to simplify all things about brand creation and management
                    </h1>
                    <p className="mt-4">
                        Lore ipsum Lore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore
                        ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ipsumLore ippsu
                    </p>
                    <button
                        className="btn"
                        onClick={handleButtonClick}
                    >
                        Meet the team
                    </button>
                </div>
                <div className="md:w-1/3 h-full flex justify-center mt-8 md:mt-0">
                    <div className="w-full h-full relative">
                        <Image src={wp} alt="banner" />
                    </div>
                </div>
            </div>
            {showPopup && (
                <>
                    <div className="fixed px-0 inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-5/6 h-5/6 rounded-lg p-8 shadow-lg relative ">
                            <button
                                className="absolute top-2 right-2 text-black text-2xl"
                                onClick={handleCloseClick}
                            >
                                &times;
                            </button>
                            <div className="text-center flex justify-content gap-4 w-full h-full">
                                <Card image={""} cv={""} name={"Tisca Catalin"} description={""} website={""}/>
                                <div className={"flex flex-col items-center w-1/3 gap-4"}>
                                    <h2 className="text-3xl font-bold">MEET THE TEAM</h2>
                                    <p>yap yap yap</p>
                                    <Link
                                        href={"https://cns-media.com"}
                                        className="btn"
                                    >
                                        Our Website
                                    </Link>
                                </div>
                                <Card image={""} cv={""} name={"Pasere Sebastian"} description={""} website={""}/>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};