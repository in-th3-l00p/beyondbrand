'use client'
import Image from "next/image";
import {useSession} from "next-auth/react";
import Loading from "@/app/brands/create/components/Loading";
import React from "react";
import User from "@/app/interfaces/User";
import * as Icon from "react-feather";
import Container from "@/app/settings/components/Container";
import PageTitle from "@/app/settings/components/PageTitle";
import SectionTitle from "@/app/settings/components/SectionTitle";
import SectionContainer from "@/app/settings/components/SectionContainer";
import {button} from "@/components/primitives";

export default function Page() {
    const {data: session, status, update} = useSession();

    if (status === "loading" || !session)
        return <Loading/>

    const user = session.user as User;

    return (
        <Container>
            <PageTitle title={"Your Account"}/>
            <SectionTitle title={"Profile Photo"}/>
            <SectionContainer>
                <div className={"flex md:flex-row flex-col w-full items-center md:items-start gap-4 md:gap-0 md:justify-between mb-4"}>
                    {user.image ? <Image src={user.image} alt={"profile picture"} width={100} height={100} className={"rounded-full"}/>
                        :
                    <div className={"w-20 h-20 rounded-full bg-gray-300"}></div>}
                    <div className={"flex gap-4 md:gap-8 items-center my-auto"}>
                        <button className={"px-8 py-2 text-lg text-dark-gray h-min"}>Remove</button>
                        <button className={button() + "h-min"}>Change Photo</button>
                    </div>
                </div>
            </SectionContainer>
            <SectionTitle title={"Name"}/>
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    <p className={"text-center md:text-left mb-4 md:mb-0"}>{user.name}</p>
                    <button className={button()}>Edit</button>
                </div>
            </SectionContainer>
            <SectionTitle title={"Email"}/>
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    <p className={"text-center md:text-left mb-4 md:mb-0"}>{user.email}</p>
                    <button className={button()}>Edit</button>
                </div>
            </SectionContainer>
            <SectionTitle title={"Subscription"}/>
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    <p className={"text-center md:text-left mb-4 md:mb-0"}>PRO</p>
                    <button className={button({type: 'primary'})}>View Plans</button>
                </div>
            </SectionContainer>
            <SectionTitle title={"What will you be using BeyondBrand for?"}/>
            <SectionContainer>
                <select name="" id="" className={"md:w-1/3 input mb-4"}>
                    <option selected value="">Small business</option>
                    <option value="">Large company</option>
                    <option value="">Both</option>
                </select>
            </SectionContainer>
            <SectionTitle title={"Linked social accounts"}/>
            <SectionContainer withLine={false}>
                <div className={"w-full rounded-md border border-black p-4"}>
                    <div className={"my-4 space-y-4"}>
                        <div
                            className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                            <div
                                className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                                <Icon.Instagram/>
                                <hr className={"rotate-90 w-16 border-black"}/>
                                <div>
                                    <p>Instagram</p>
                                    <p>@cata0303</p>
                                </div>
                            </div>
                            <button className={button()}>Disconnect</button>
                        </div>
                        
                        <div
                            className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                            <div
                                className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                                <Icon.Instagram/>
                                <hr className={"rotate-90 w-16 border-black"}/>
                                <div>
                                    <p>Instagram</p>
                                    <p>@cata0303</p>
                                </div>
                            </div>
                            <button className={button()}>Disconnect</button>
                        </div>
                        
                        <div
                            className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                            <div
                                className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                                <Icon.Instagram/>
                                <hr className={"rotate-90 w-16 border-black"}/>
                                <div>
                                    <p>Instagram</p>
                                    <p>@cata0303</p>
                                </div>
                            </div>
                            <button className={button()}>Disconnect</button>
                        </div>
                        
                        <div
                            className={"w-full flex flex-col justify-center md:gap-0 gap-4 md:flex-row md:justify-between items-center"}>
                            <div
                                className={"flex items-center border border-black rounded-md px-4 py-2 overflow-y-hidden"}>
                                <Icon.Instagram/>
                                <hr className={"rotate-90 w-16 border-black"}/>
                                <div>
                                    <p>Instagram</p>
                                    <p>@cata0303</p>
                                </div>
                            </div>
                            <button className={button()}>Disconnect</button>
                        </div>
                    </div>
                </div>
            </SectionContainer>
        </Container>
    )
}