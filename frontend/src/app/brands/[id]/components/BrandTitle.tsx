"use client";

import React, {useContext} from "react";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";
import PageTitle from "@/components/PageTitle";

export default function BrandTitle() {
    const { brand } = useContext(BrandDisplayContext);

    return (
        <PageTitle>{`Brand "${brand.name}"`}</PageTitle>
    );
}