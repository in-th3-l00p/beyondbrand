'use client'
import Image from "next/image";
import {useSession} from "next-auth/react";
import Loading from "@/app/brands/create/components/Loading";
import React from "react";
import User from "@/app/interfaces/User";
import * as Icon from "react-feather";

export default function Page() {
    const {data: session, status, update} = useSession();

    if (status === "loading" || !session)
        return <Loading/>

    const user = session.user as User;

    return (
        <div className={"p-6 overflow-x-hidden lg:mr-64 xl:mr-72 2xl:mr-80"}>
            <h1 className={"font-bold text-2xl mb-8 text-center md:text-left"}>Your Account</h1>
            <p className={"mb-4 font-bold text-center md:text-left"}>Profile Photo</p>
            <div className={"w-full mb-4"}>
                <div className={"flex md:flex-row flex-col w-full items-center md:items-start gap-4 md:gap-0 md:justify-between mb-4"}>
                    <Image src={user.image} alt={"profile picture"} width={100} height={100}
                           className={"rounded-full"}/>
                    <div className={"flex gap-4 md:gap-8 items-center my-auto"}>
                        <button className={"px-8 py-2 text-lg text-dark-gray h-min"}>Remove</button>
                        <button className={"btn h-min"}>Change Photo</button>
                    </div>
                </div>
                <hr className={"border-black"}/>
            </div>
            <p className={"mb-4 font-bold text-center md:text-left"}>Name</p>
            <div className={"w-full mb-4"}>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    <p className={"text-center md:text-left mb-4 md:mb-0"}>{user.name}</p>
                    <button className={"btn"}>Edit</button>
                </div>
                <hr className={"border-black"}/>
            </div>
            <p className={"mb-4 font-bold text-center md:text-left"}>Email</p>
            <div className={"w-full mb-4"}>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    <p className={"text-center md:text-left mb-4 md:mb-0"}>{user.email}</p>
                    <button className={"btn"}>Edit</button>
                </div>
                <hr className={"border-black"}/>
            </div>
            <p className={"mb-4 font-bold text-center md:text-left"}>Subscription</p>
            <div className={"w-full mb-4"}>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    <p className={"text-center md:text-left mb-4 md:mb-0"}>PRO</p>
                    <button className={"btn"}>View Plans</button>
                </div>
                <hr className={"border-black"}/>
            </div>
            <p className={"mb-4"}>What will you be using BeyondBrand for?</p>
            <div className={"w-full mb-4"}>
                <select name="" id="" className={"md:w-1/3 input mb-4"}>
                    <option selected value="">Small business</option>
                    <option value="">Large company</option>
                    <option value="">Both</option>
                </select>
                <hr className={"border-black"}/>
            </div>
            <p className={"mb-4"}>Linked social accounts</p>
            <div className={"w-full rounded-md border border-black p-4"}>
                <div className={"my-4 space-y-4"}>
                    <div
                        className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                        <div className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                            <Icon.Instagram/>
                            <hr className={"rotate-90 w-16 border-black"}/>
                            <div>
                                <p>Instagram</p>
                                <p>@cata0303</p>
                            </div>
                        </div>
                        <button className={"btn"}>Disconnect</button>
                    </div>
                    <hr className={"border-black"}/>
                    <div
                        className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                        <div className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                            <Icon.Instagram/>
                            <hr className={"rotate-90 w-16 border-black"}/>
                            <div>
                                <p>Instagram</p>
                                <p>@cata0303</p>
                            </div>
                        </div>
                        <button className={"btn"}>Disconnect</button>
                    </div>
                    <hr className={"border-black"}/>
                    <div
                        className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                        <div className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                            <Icon.Instagram/>
                            <hr className={"rotate-90 w-16 border-black"}/>
                            <div>
                                <p>Instagram</p>
                                <p>@cata0303</p>
                            </div>
                        </div>
                        <button className={"btn"}>Disconnect</button>
                    </div>
                    <hr className={"border-black"}/>
                    <div
                        className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                        <div className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                            <Icon.Instagram/>
                            <hr className={"rotate-90 w-16 border-black"}/>
                            <div>
                                <p>Instagram</p>
                                <p>@cata0303</p>
                            </div>
                        </div>
                        <button className={"btn"}>Disconnect</button>
                    </div>
                </div>
            </div>
        </div>
    )
}