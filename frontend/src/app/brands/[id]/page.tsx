import React from "react";
import PageTitle from "@/components/PageTitle";
import Brand from "@/database/schema/brand";
import Link from "next/link";
import * as Icon from "react-feather";
import LogoDisplay from "@/app/brands/[id]/components/LogoDisplay/LogoDisplay";
import BrandDisplayContextProvider from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContextProvider";
import BrandInformation from "@/app/brands/[id]/components/BrandInformation";
import BrandDesign from "@/app/brands/[id]/components/BrandDesign";

// @ts-ignore
export default async function BrandDisplay({ params }) {
    const brand = await Brand.findOne({ _id: params.id });

    return (
        <BrandDisplayContextProvider brand={brand}>
            <section className="py-8 responsive-px">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Link href={"/"} className="btn"><Icon.ArrowLeft /></Link>
                    <PageTitle>{`Brand "${brand.name}"`}</PageTitle>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-center items-center gap-8">
                    <LogoDisplay />
                    <BrandInformation />
                    <BrandDesign />
                </div>
            </section>
        </BrandDisplayContextProvider>
    );
}