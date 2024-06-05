import React from "react";
import Brand from "@/database/schema/brand";
import BrandContextProvider from "@/app/brands/[id]/components/BrandContext/BrandContextProvider";
import {redirect} from "next/navigation";
import {getSession} from "@auth0/nextjs-auth0";

export default async function BrandLayout(
    { children, params }: {
        children?: React.ReactNode;
        params: { id: string; };
    }
) {
    const session = await getSession();
    let brand;
    try {
        brand = await Brand.findById(params.id);
    } catch (e) {
        redirect("/brands");
    }
    if (!brand) // not found
        redirect("/brands");
    if (!session || brand.owner !== session.user.sub) // unauthorized
        redirect("/brands");

    return (
        <BrandContextProvider initialBrand={JSON.stringify(brand)}>
            {children}
        </BrandContextProvider>
    );
}