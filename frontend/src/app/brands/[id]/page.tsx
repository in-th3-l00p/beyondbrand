"use client";

import React, {useContext} from "react";
import TabContextProvider from "@/app/brands/[id]/components/tabs/TabContext/TabContextProvider";
import TabsShifter, {TabSelection} from "@/app/brands/[id]/components/tabs/TabsShifter";
import PageTitle from "@/components/PageTitle";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import {pageContainer} from "@/components/primitives";

export default function BrandDisplay() {
    const { brand } = useContext(BrandContext);

    return (
        <TabContextProvider>
            <section className={pageContainer()}>
                <PageTitle back={"/"}>Brand {`"${brand.name}"`}</PageTitle>
                <TabsShifter />
                <TabSelection />
            </section>
        </TabContextProvider>
    );
}