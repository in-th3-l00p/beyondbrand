import React from "react";
import Brand from "@/database/schema/brand";
import Link from "next/link";
import * as Icon from "react-feather";
import BrandDisplayContextProvider from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContextProvider";
import BrandTitle from "@/app/brands/[id]/components/BrandTitle";
import TabsShifter, {TabSelection} from "@/app/brands/[id]/components/tabs/TabsShifter";

export default async function BrandDisplay({ params }: {
    params: {
        id: string;
    };
}) {
    const brand = await Brand.findOne({ _id: params.id });

    return (
        <BrandDisplayContextProvider brand={JSON.stringify(brand)}>
            <section className="py-8 responsive-px">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <Link href={"/"} className="btn">
                        <Icon.ArrowLeft />
                    </Link>
                    <BrandTitle />
                </div>

                <TabsShifter />
                <TabSelection />
            </section>
        </BrandDisplayContextProvider>
    );
}