import React from "react";
import Brand from "@/database/schema/brand";
import BrandContextProvider from "@/app/brands/[id]/components/BrandContext/BrandContextProvider";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export default async function BrandLayout(
    { children, params }: {
        children?: React.ReactNode;
        params: { id: string; };
    }
) {
    const session = await getServerSession(authOptions);
    let brand;
    try {
        brand = await Brand.findById(params.id);
    } catch (e) {
        redirect("/brands");
    }
    if (!brand) // not found
        redirect("/brands");
    if (!session || !brand.owner.equals(session.user.id)) // unauthorized
        redirect("/brands");

    return (
        <BrandContextProvider initialBrand={JSON.stringify(brand)}>
            {children}
        </BrandContextProvider>
    );
}