"use client";

import PageTitle from "@/components/PageTitle";
import React, {useContext, useEffect, useState} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import "./style.scss";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import {NameInput} from "@/app/brands/create/steps/NameInput";
import {NameGeneration} from "@/app/brands/create/steps/NameGeneration";
import DescriptionInput from "@/app/brands/create/steps/DescriptionInput";

function CreateForm() {
    const { step, setStep } = useContext(BrandContext);

    if (step === FormStep.NameInput)
        return <NameInput />;
    if (step === FormStep.NameGeneration)
        return <NameGeneration />;
    if (step === FormStep.DescriptionInput)
        return <DescriptionInput />
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
    const [description, setDescription] = useState<string>(
        localStorage.getItem("brand.create.description") || ""
    );
    const [step, setStep] = useState<FormStep>(
        Number.parseInt(localStorage.getItem("brand.create.step") || "0") as FormStep
    );
    const [stepStack, setStepStack] = useState<FormStep[]>([
        ...(JSON.parse(localStorage.getItem("brand.create.stepStack") || "[]") as FormStep[])
    ]);

    useEffect(() => {
        localStorage.setItem("brand.create.name", name);
        localStorage.setItem("brand.create.description", description);
        localStorage.setItem("brand.create.step", step.toString());
        localStorage.setItem("brand.create.stepStack", JSON.stringify(stepStack));
    }, [name, description, step, stepStack]);

    return (
        <section className={"py-8 responsive-px flex-grow flex flex-col"}>
            <PageTitle>Create brand</PageTitle>

            <BrandContext.Provider
                value={{
                    name, setName,
                    description: description, setDescription: setDescription,
                    step, setStep,
                    stepStack, setStepStack,
                    addStep: (step: FormStep) => setStepStack([...stepStack, step]),
                }}
            >
                <CreateForm />
            </BrandContext.Provider>
        </section>
    );
}