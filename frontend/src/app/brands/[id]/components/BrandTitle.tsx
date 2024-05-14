"use client";

import React, {useContext} from "react";
import PageTitle from "@/components/PageTitle";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

export default function BrandTitle() {
    const { brand } = useContext(BrandContext);

    return (
        <PageTitle>{`Brand "${brand.name}"`}</PageTitle>
    );
}