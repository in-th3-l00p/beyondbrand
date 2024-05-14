import React from "react";
import Brand from "@/database/schema/brand";
import BrandContextProvider from "@/app/brands/[id]/components/BrandContext/BrandContextProvider";

export default async function BrandLayout(
    { children, params }: {
        children?: React.ReactNode;
        params: { id: string; };
    }
) {
    const brand = await Brand.findById(params.id);

    return (
        <BrandContextProvider initialBrand={JSON.stringify(brand)}>
            {children}
        </BrandContextProvider>
    );
}