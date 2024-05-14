"use client";

import React from "react";
import Link from "next/link";
import * as Icon from "react-feather";
import TabContextProvider from "@/app/brands/[id]/components/tabs/TabContext/TabContextProvider";
import BrandTitle from "@/app/brands/[id]/components/BrandTitle";
import TabsShifter, {TabSelection} from "@/app/brands/[id]/components/tabs/TabsShifter";

export default function BrandDisplay() {
    return (
        <TabContextProvider>
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
        </TabContextProvider>
    );
}