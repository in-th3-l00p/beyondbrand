"use client";

import React, {useState} from 'react';
import {IBrand} from "@/database/schema/brand";
import BrandDisplayContext, {Tabs} from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";

export default function BrandDisplayContextProvider({ brand, children }: {
    brand: string;
    children?: React.ReactNode;
}) {
    const [statefulBrand, setBrand] = useState<IBrand>(JSON.parse(brand));
    const [tab, setTab] = useState<Tabs>(Tabs.Information);

    return (
        <BrandDisplayContext.Provider
            value={{ brand: statefulBrand, setBrand, tab, setTab }}
        >
            {children}
        </BrandDisplayContext.Provider>
    );
}
