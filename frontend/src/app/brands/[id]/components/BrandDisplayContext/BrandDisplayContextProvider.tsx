"use client";

import React, {useState} from 'react';
import {IBrand} from "@/database/schema/brand";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";

export default function BrandDisplayContextProvider({ brand, children }: {
    brand: string;
    children?: React.ReactNode;
}) {
    const [statefulBrand, setBrand] = useState<IBrand>(JSON.parse(brand));

    return (
        <BrandDisplayContext.Provider
            value={{ brand: statefulBrand, setBrand }}
        >
            {children}
        </BrandDisplayContext.Provider>
    );
}
