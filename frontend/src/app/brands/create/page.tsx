"use client";

import PageTitle from "@/components/PageTitle";
import React, {useContext, useEffect, useState} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import "./style.scss";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import {NameInput} from "@/app/brands/create/steps/NameInput";
import {NameGeneration} from "@/app/brands/create/steps/NameGeneration";
import DescriptionInput from "@/app/brands/create/steps/DescriptionInput";
import ColorInput from "@/app/brands/create/steps/ColorInput";

function CreateForm() {
    const { stepStack, addStep} = useContext(BrandContext);

    if (stepStack.length === 0)
        return (
            <div className={"form-container"}>
                <FormLabel>Are you currently having a business name yet?</FormLabel>
                <div className="flex gap-4">
                    <button
                        type={"button"} className={"btn"}
                        onClick={() => addStep(FormStep.NameInput)}
                    >Yes</button>
                    <button
                        type={"button"} className={"btn"}
                        onClick={() => addStep(FormStep.NameGeneration)}
                    >No</button>
                </div>
            </div>
        );
    if (stepStack.at(stepStack.length - 1) === FormStep.NameInput)
        return <NameInput />;
    if (stepStack.at(stepStack.length - 1)  === FormStep.NameGeneration)
        return <NameGeneration />;
    if (stepStack.at(stepStack.length - 1) === FormStep.DescriptionInput)
        return <DescriptionInput />;
    if (stepStack.at(stepStack.length - 1) === FormStep.ColorInput)
        return <ColorInput />;
    return <></>;
}

export default function CreateBrand() {
    const [name, setName] = useState<string>(
        localStorage?.getItem("brand.create.name") || ""
    );
    const [description, setDescription] = useState<string>(
        localStorage?.getItem("brand.create.description") || ""
    );
    const [stepStack, setStepStack] = useState<FormStep[]>([
        ...(JSON.parse(localStorage?.getItem("brand.create.stepStack") || "[]") as FormStep[])
    ]);
    const [colors, setColors] = useState<string[]>(
        JSON.parse(localStorage?.getItem("colors") || "[]") as string[]
    );

    useEffect(() => {
        localStorage.setItem("brand.create.name", name);
        localStorage.setItem("brand.create.description", description);
        localStorage.setItem("brand.create.stepStack", JSON.stringify(stepStack));
        localStorage.setItem("colors", JSON.stringify(colors));
    }, [name, description, stepStack, colors]);

    return (
        <section className={"py-8 responsive-px flex-grow flex flex-col"}>
            <PageTitle>Create brand</PageTitle>

            <BrandContext.Provider
                value={{
                    name, setName,
                    description, setDescription,
                    stepStack, setStepStack,
                    colors, setColors,
                    addStep: (step: FormStep) => setStepStack([...stepStack, step]),
                    popStep: () => setStepStack(stepStack.slice(0, stepStack.length - 1))
                }}
            >
                <CreateForm />
            </BrandContext.Provider>
        </section>
    );
}