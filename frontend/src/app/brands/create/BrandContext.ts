"use client";

import React, {createContext} from "react";

export enum FormStep {
    NameQuestion,
    NameInput,
    NameGeneration,
    DescriptionInput
}

export interface IBrandContext {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<string>>;

    step: FormStep;
    setStep: React.Dispatch<React.SetStateAction<FormStep>>;
    stepStack: FormStep[];
    setStepStack: React.Dispatch<React.SetStateAction<FormStep[]>>;
    addStep: (step: FormStep) => void;
}

const BrandContext = createContext<IBrandContext>({
    name: "",
    description: "",
    step: FormStep.NameQuestion,
    stepStack: [] as FormStep[],
} as IBrandContext);
export default BrandContext;