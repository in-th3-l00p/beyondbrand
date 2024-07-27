'use client'
import {tv} from "tailwind-variants";
import clsx from "clsx";
import Image from "next/image";
import {useState} from "react";
import Card from "@/app/about/components/Card";
import Link from "next/link";
import twophoto from "../../../public/twophoto.png";
import sebi from "../../../public/sebi.svg";
import cata from "../../../public/cata.jpg";

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
        <section className="my-12">
            <div className="h-screen px-4">
                <div className="text-center space-y-12">
                    <p className="text-2xl 2xl:text-4xl font-medium text-gray-500">About Us</p>
                    <h1 className="text-6xl 2xl:text-8xl font-extrabold">WE CHANGE THE WAY YOU DO <br/> BRANDING</h1>
                    <p className="text-xl 2xl:text-3xl">
                        <span className={clsx("font-bold", gradientText())}>BeyondBrand</span> helps you build the brand
                        of your business <br/>faster, and easier, than ever
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

            <div
                className="grid mx-4 sm:mx-20 lg:mx-52 2xl:mx-12 grid-cols-1 md:grid-cols-2 2xl:flex 2xl:justify-center gap-16 items-center 2xl:items-start">
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
                            <p className="text-2xl 2xl:text-4xl">Coffe’s drank</p>
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
                            <p className="text-2xl 2xl:text-4xl font-bold">10+</p>
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
                        At BeyondBrand, our mission is to provide accessible, high-quality branding solutions for
                        everyone. We believe that a strong brand is more than just a logo or a tagline; it's an
                        experience, a story, and a connection with your audience. We're here to help you craft that
                        story and create a memorable brand that stands out in today's competitive market.
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
                        <Image src={twophoto} alt="banner" width={1000} height={400}/>
                    </div>
                </div>
            </div>
            {showPopup && (
                <>
                    <div
                        className="fixed px-0 inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white w-5/6 h-5/6 rounded-lg p-8 shadow-lg relative ">
                            <button
                                className="absolute top-2 right-2 text-black text-2xl"
                                onClick={handleCloseClick}
                            >
                                &times;
                            </button>
                            <div className="text-center flex justify-content gap-4 w-full h-full">
                                <Card image={cata.src} cv={""} name={"Tisca Catalin"}
                                      description={"I am 18 years old and an 11th-grade student at the National College of Informatics \"Grigore Moisil\" in Brașov. Besides school activities, I have ten years of experience in web development and dedicate some of my free time to practicing contact sports.\n" +
                                          "\n" +
                                          "Web development is a passion I have cultivated since childhood. Over these ten years, I have gained advanced knowledge and skills in this field, participating in various projects and initiatives that have allowed me to develop my technical competencies. Additionally, practicing contact sports has helped me develop discipline, resilience, and important physical and mental skills."}
                                      website={""}/>
                                <div className={"flex flex-col justify-between items-center w-1/3 gap-4"}>
                                    <div>
                                        <h2 className="text-3xl pb-4 font-bold">MEET THE TEAM</h2>
                                        <p>We're Tisca Catalin and Sebi Pasere, two high school students with a passion
                                            for creativity, innovation, and entrepreneurship. Our journey began with a
                                            simple idea: to empower individuals and small businesses to create unique
                                            and impactful brand identities. Today, we're proud to introduce BeyondBrand,
                                            a project dedicated to helping you take your brand to the next level.
                                        </p>
                                    </div>
                                </div>
                                <Card image={sebi.src} cv={""} name={"Pasere Sebastian"}
                                      description={"I am 19 years old and a 12th-grade student at the National College of Informatics \"Grigore Moisil\" in Brașov. Besides school activities, I am a volleyball player with three years of experience in web development.\n" +
                                          "\n" +
                                          "In the sports field, I actively participate in training and competitions, which have helped me develop skills such as discipline, teamwork, and perseverance. Simultaneously, my passion for technology has led me to get involved in web development, where I have gained valuable knowledge and had the opportunity to work on various projects."}
                                      website={""}/>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
};