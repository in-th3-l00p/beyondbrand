"use client";

import React, {createContext} from "react";

export enum FormStep {
    NameQuestion,
    NameInput,
    NameGeneration
}

export interface IBrandContext {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    brief: string;
    setBrief: React.Dispatch<React.SetStateAction<string>>;
    step: FormStep;
    setStep: React.Dispatch<React.SetStateAction<FormStep>>;
}

const BrandContext = createContext<IBrandContext>({
    name: "",
    brief: "",
    step: FormStep.NameQuestion,
} as IBrandContext);
export default BrandContext;