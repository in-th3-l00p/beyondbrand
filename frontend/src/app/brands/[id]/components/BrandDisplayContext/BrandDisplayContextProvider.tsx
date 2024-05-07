"use client";

import React from 'react';
import {IBrand} from "@/database/schema/brand";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";

export default function BrandDisplayContextProvider({ brand, children }: {
    brand: IBrand;
    children?: React.ReactNode;
}) {
    return (
        <BrandDisplayContext.Provider value={{ brand }}>
            {children}
        </BrandDisplayContext.Provider>
    );
}
