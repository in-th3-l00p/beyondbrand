"use client";

import {IBrand} from "@/database/schema/brand";
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
    brand: IBrand;
    setBrand: (brand: IBrand) => void;
    tab: Tabs,
    setTab: (tab: Tabs) => void;
}

const BrandDisplayContext = React.createContext<IBrandDisplayContext>(
    {} as IBrandDisplayContext
);

export default BrandDisplayContext;