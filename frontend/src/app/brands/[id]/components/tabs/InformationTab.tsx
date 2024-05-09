import LogoDisplay from "@/app/brands/[id]/components/LogoDisplay/LogoDisplay";
import BrandInformation from "@/app/brands/[id]/components/BrandInformation";
import BrandColorScheme from "@/app/brands/[id]/components/BrandColorScheme";
import React from "react";
import {panelContainer} from "@/app/brands/[id]/components/components";

export default function InformationTab() {
    return (
        <div className={panelContainer()}>
            <LogoDisplay />
            <BrandInformation />
            <BrandColorScheme />
        </div>
    );
}