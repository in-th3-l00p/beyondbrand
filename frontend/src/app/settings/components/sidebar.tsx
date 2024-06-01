'use client'
import React from "react";
import Image from "next/image";
import * as Icon from "react-feather";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useSession} from "next-auth/react";
import Loading from "@/app/brands/create/components/Loading";
import User from "@/app/interfaces/User";



export default function Sidebar() {
    const {data: session, status} = useSession();

    if (status === "loading" || !session)
        return <Loading/>
    const path = usePathname();

    const user = session.user as User;

    return (
        path === "/settings" ?
            <nav className={"flex flex-col h-[85vh] gap-2 w-screen items-start md:items-center "}>
                <div id={"minimal-account-info"} className={"flex gap-4 items-center p-2 h-full"}>
                    {user.image &&
                        <Image src={user.image} alt={"profile"} width={50} height={50}
                               className={"rounded-full"}/>}
                    {!user.image && <Icon.User className={"h-max"}/>}
                    <div>
                        <h1 className={"font-bold"}>{user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div
                    className={path.includes("account") ? "flex gap-4 p-2 rounded-md bg-light-gray h-full items-center" : "flex gap-4 p-2 h-full items-center"}>
                    <Icon.User size={40}/>
                    <Link href={"/settings/account"} className={"text-2xl"}>
                        Your Account
                    </Link>
                </div>
                <div
                    className={path.includes("business") ? "flex gap-4 p-2 rounded-md bg-light-gray h-full items-center" : "flex gap-4 p-2 h-full items-center"}>
                    <Icon.Briefcase size={40}/>
                    <Link href={"/settings/business"} className={"text-2xl"}>
                        Your Business
                    </Link>
                </div>
                <div
                    className={path.includes("security") ? "flex gap-4 p-2 rounded-md bg-light-gray h-full items-center" : "flex gap-4 p-2 h-full items-center"}>
                    <Icon.Lock size={40}/>
                    <Link href={"/settings/security"} className={"text-2xl"}>
                        Login & Security
                    </Link>
                </div>
                <div
                    className={path.includes("notifications") ? "flex gap-4 p-2 rounded-md bg-light-gray h-full items-center" : "flex gap-4 p-2 h-full items-center"}>
                    <Icon.Mail size={40}/>
                    <Link href={"/settings/notifications"} className={"text-2xl"}>
                        Notifications Preferences
                    </Link>
                </div>
                <div
                    className={path.includes("privacy") ? "flex gap-4 p-2 rounded-md bg-light-gray h-full items-center" : "flex gap-4 p-2 h-full items-center"}>
                    <Icon.Lock size={40}/>
                    <Link href={"/settings/privacy"} className={"text-2xl"}>
                        Privacy Settings
                    </Link>
                </div>
            </nav> :
            <>
                <nav className={"md:flex flex-col gap-2 w-full hidden pl-4 pt-4"}>
                    <div id={"minimal-account-info"} className={"flex w-max gap-4 items-center p-2"}>
                        {user.image &&
                            <Image src={user.image} alt={"profile"} width={50} height={50}
                                   className={"rounded-full"}/>}
                        {!user.image && <Icon.User className={"h-max"}/>}
                        <div>
                            <h1 className={"font-bold"}>{user.name}</h1>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <div
                        className={path.includes("account") ? "flex gap-4 p-2 rounded-md bg-light-gray" : "flex gap-4 p-2"}>
                        <Icon.User/>
                        <Link href={"/settings/account"}>
                            Your Account
                        </Link>
                    </div>
                    <div
                        className={path.includes("business") ? "flex gap-4 p-2 rounded-md bg-light-gray" : "flex gap-4 p-2"}>
                        <Icon.Briefcase/>
                        <Link href={"/settings/business"}>
                            Your Business
                        </Link>
                    </div>
                    <div
                        className={path.includes("security") ? "flex gap-4 p-2 rounded-md bg-light-gray" : "flex gap-4 p-2"}>
                        <Icon.Lock/>
                        <Link href={"/settings/security"}>
                            Login & Security
                        </Link>
                    </div>
                    <div
                        className={path.includes("notifications") ? "flex gap-4 p-2 rounded-md bg-light-gray" : "flex gap-4 p-2"}>
                        <Icon.Mail/>
                        <Link href={"/settings/notifications"}>
                            Notifications Preferences
                        </Link>
                    </div>
                    <div
                        className={path.includes("privacy") ? "flex gap-4 p-2 rounded-md bg-light-gray" : "flex gap-4 p-2"}>
                        <Icon.Lock/>
                        <Link href={"/settings/privacy"}>
                            Privacy Settings
                        </Link>
                    </div>
                </nav>
            </>

    )
}