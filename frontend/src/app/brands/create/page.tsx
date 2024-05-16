"use client";

import PageTitle from "@/components/PageTitle";
import React, {useContext, useEffect, useState} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import {NameInput} from "@/app/brands/create/steps/NameInput";
import {NameGeneration} from "@/app/brands/create/steps/NameGeneration";
import DescriptionInput from "@/app/brands/create/steps/DescriptionInput";
import ColorInput from "@/app/brands/create/steps/ColorInput";
import LogoDialog from "@/app/brands/create/steps/LogoDialog";
import LogoGeneration from "@/app/brands/create/steps/LogoGeneration";
import LogoUpload from "@/app/brands/create/steps/LogoUpload";
import Review from "@/app/brands/create/steps/Review";
import {formContainer} from "@/components/form/primitives";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

function CreateForm() {
    const { stepStack, addStep} = useContext(BrandContext);

    if (stepStack.length === 0)
        return (
            <div className={formContainer()}>
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
    if (stepStack.at(stepStack.length - 1) === FormStep.LogoDialog)
        return <LogoDialog />;
    if (stepStack.at(stepStack.length - 1) === FormStep.LogoGeneration)
        return <LogoGeneration />;
    if (stepStack.at(stepStack.length - 1) === FormStep.LogoUpload)
        return <LogoUpload />;
    if (stepStack.at(stepStack.length - 1) === FormStep.Review)
        return <Review />;
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
        JSON.parse(localStorage?.getItem("brand.create.colors") || "[]") as string[]
    );
    const [logo, setLogo] = useState<string>(
        localStorage?.getItem("brand.create.logo") || ""
    );

    useEffect(() => {
        localStorage.setItem("brand.create.name", name);
        localStorage.setItem("brand.create.description", description);
        localStorage.setItem("brand.create.stepStack", JSON.stringify(stepStack));
        localStorage.setItem("brand.create.colors", JSON.stringify(colors));
        localStorage.setItem("brand.create.logo", logo || "");
    }, [name, description, stepStack, colors, logo]);

    return (
        <section className={clsx(pageContainer(), "flex-grow flex flex-col")}>
            <PageTitle>Create brand</PageTitle>

            <BrandContext.Provider
                value={{
                    name, setName,
                    description, setDescription,
                    stepStack, setStepStack,
                    colors, setColors,
                    logo, setLogo,
                    addStep: (step: FormStep) => setStepStack([...stepStack, step]),
                    popStep: () => setStepStack(stepStack.slice(0, stepStack.length - 1))
                }}
            >
                <CreateForm />
            </BrandContext.Provider>
        </section>
    );
}