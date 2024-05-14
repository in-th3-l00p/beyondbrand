"use client";

import React from "react";

export enum Tabs {
    Information,
    Generate,
    SocialMedia,
    Settings
}

export const tabsDisplay = [
    { id: Tabs.Information, text: "Information" },
    { id: Tabs.Generate, text: "Generate" },
    { id: Tabs.SocialMedia, text: "Social media" },
    { id: Tabs.Settings, text: "Settings" }
];

export interface IBrandDisplayContext {
    tab: Tabs,
    setTab: (tab: Tabs) => void;
}

const TabContext = React.createContext<IBrandDisplayContext>(
    {} as IBrandDisplayContext
);

export default TabContext;