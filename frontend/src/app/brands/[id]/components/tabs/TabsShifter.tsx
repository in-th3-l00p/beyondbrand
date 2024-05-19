"use client";

import React, {useContext} from "react";
import InformationTab from "@/app/brands/[id]/components/tabs/InformationTab";
import TabContext, {
    Tabs,
    tabsDisplay
} from "@/app/brands/[id]/components/tabs/TabContext/TabContext";
import SettingsTab from "@/app/brands/[id]/components/tabs/SettingsTab";
import SocialMediaTab from "@/app/brands/[id]/components/tabs/SocialMediaTab";
import Generate from "@/app/brands/[id]/components/tabs/Generate";

function TabButton({ currentTab, order = "middle", children }: {
    currentTab: Tabs;
    order?: "left" | "middle" | "right";
    children?: React.ReactNode;
}) {
    const { tab, setTab } = useContext(TabContext);
    const selected = tab === currentTab;

    return (
        <button
            type={"button"}
            className={
                (selected ? "bg-dark-ghost-white text-dark-ghost-black " : "text-dark-ghost-black ") +
                "px-4 py-2 " +
                (order === "left" ? "rounded-l-md " : "") +
                (order === "right" ? "rounded-r-md " : "") +
                (!selected ? "hover:underline hover:bg-dark-ghost-white transition-all" : "")
            }
            disabled={selected}
            onClick={() => setTab(currentTab)}
        >
            {children}
        </button>
    );
}

export function TabSelection() {
    const { tab } = useContext(TabContext);

    if (tab === Tabs.Information)
        return <InformationTab />
    if (tab === Tabs.Settings)
        return <SettingsTab />
    if (tab === Tabs.SocialMedia)
        return <SocialMediaTab />
    if (tab === Tabs.Generate)
        return <Generate />
    return <></>
}

export default function TabsShifter() {
    return (
        <div className={"w-full rounded-md bg-ghost-white mb-8 shadow-md"}>
            {tabsDisplay.map((tab, index) => (
                <TabButton
                    key={index}
                    currentTab={tab.id}
                    order={(index === 0 ? "left" : (index === tabsDisplay.length - 1 ? "right" : "middle"))}
                >
                    {tab.text}
                </TabButton>
            ))}
        </div>
    );
}
