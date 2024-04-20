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

    stepStack: FormStep[];
    setStepStack: React.Dispatch<React.SetStateAction<FormStep[]>>;
    addStep: (step: FormStep) => void;
    popStep: () => void;
}

const BrandContext = createContext<IBrandContext>({
    name: "",
    description: "",
    stepStack: [] as FormStep[],
} as IBrandContext);
export default BrandContext;