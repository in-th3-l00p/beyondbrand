"use client"

import React, {useContext} from "react";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import FormNext from "@/app/brands/create/components/FormNext";
import {ImproveSection} from "@/app/brands/create/components/ImproveSection";
import GenerateDescriptionPrompted from "@/app/brands/create/components/GenerateDescriptionPrompted";

export default function DescriptionInput() {
    const { description, setDescription } = useContext(BrandContext);

    return (
        <div className={"form-container"}>
            <FormLabel back>Tell us about your business idea.</FormLabel>
            <textarea
                className={"input mb-4"}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                value={description}
            />
            <ImproveSection />
            <GenerateDescriptionPrompted />
            <FormNext
                disabled={!description}
                current={FormStep.DescriptionInput}
                next={FormStep.DescriptionInput}
            />
        </div>
    )
}