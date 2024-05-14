"use client";

import {IBrand} from "@/database/schema/brand";
import {ReactNode, useState} from "react";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

export default function BrandContextProvider({ initialBrand, children }: {
    initialBrand: string;
    children?: ReactNode;
}) {
    const [brand, setBrand] = useState<IBrand>(JSON.parse(initialBrand));

    return (
        <BrandContext.Provider value={{ brand, setBrand, }}>
            {children}
        </BrandContext.Provider>
    );
}