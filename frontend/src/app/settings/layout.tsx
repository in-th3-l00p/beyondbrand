import React from "react";
import Sidebar from "@/app/settings/components/sidebar";

export default function SettingLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={"flex w-screen"}>
            <div className={"md:w-max"}>
                <Sidebar/>
            </div>
            <div className={"w-screen overflow-x-hidden"}>
                {children}
            </div>
        </div>
    );
}