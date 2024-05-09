import LogoDisplay from "@/app/brands/[id]/components/LogoDisplay/LogoDisplay";
import BrandInformation from "@/app/brands/[id]/components/BrandInformation";
import BrandColorScheme from "@/app/brands/[id]/components/BrandColorScheme";
import React from "react";

export default function EditBrand() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
            <LogoDisplay />
            <BrandInformation />
            <BrandColorScheme />
        </div>
    );
}