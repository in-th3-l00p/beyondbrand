"use client";

import PageTitle from "@/components/PageTitle";
import React, {useContext, useEffect, useState} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import "./style.scss";
import {FormLabel} from "@/app/brands/create/FormLabel";
import {BrandNameInput} from "@/app/brands/create/BrandNameInput";
import {BrandNameGeneration} from "@/app/brands/create/BrandNameGeneration";

function CreateForm() {
    const { step, setStep } = useContext(BrandContext);

    if (step === FormStep.NameInput)
        return <BrandNameInput />;
    if (step === FormStep.NameGeneration)
        return (
            <BrandNameGeneration />
        );
    return (
        <div className={"form-container"}>
            <FormLabel>Are you currently having a business name yet?</FormLabel>
            <div className="flex gap-4">
                <button
                    type={"button"} className={"btn"}
                    onClick={() => setStep(FormStep.NameInput)}
                >Yes</button>
                <button
                    type={"button"} className={"btn"}
                    onClick={() => setStep(FormStep.NameGeneration)}
                >No</button>
            </div>
        </div>
    );
}

export default function CreateBrand() {
    const [name, setName] = useState<string>(
        localStorage.getItem("brand.create.name") || ""
    );
    const [brief, setBrief] = useState<string>(
        localStorage.getItem("brand.create.brief") || ""
    );
    const [step, setStep] = useState<FormStep>(
        Number.parseInt(localStorage.getItem("brand.create.step") || "0") as FormStep
    );

    useEffect(() => {
        console.log("saved nigga");

        localStorage.setItem("brand.create.name", name);
        localStorage.setItem("brand.create.brief", brief);
        localStorage.setItem("brand.create.step", step.toString());
    }, [name, brief, step]);

    return (
        <section className={"py-8 responsive-px flex-grow flex flex-col"}>
            <PageTitle>Create brand</PageTitle>

            <BrandContext.Provider
                value={{
                    name, setName,
                    brief, setBrief,
                    step, setStep
                }}
            >
                <CreateForm />
            </BrandContext.Provider>
        </section>
    );
}