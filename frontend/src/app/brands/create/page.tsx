"use client";

import PageTitle from "@/components/PageTitle";
import React, {useState} from "react";
import * as Icon from "react-feather";
import "./style.scss";

enum FormStep {
    NameQuestion,
    NameInput,
    NameGeneration
}

function FormLabel({ back, setStep, children }: {
    back?: FormStep;
    setStep?: React.Dispatch<React.SetStateAction<FormStep>>;
    children: React.ReactNode;
}) {
    if (back !== undefined && setStep)
        return (
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                    type={"button"} className={"btn"}
                    onClick={() => setStep(back)}
                >
                    <Icon.ArrowLeft />
                </button>
                <p className={"form-label"}>{children}</p>
            </div>
        );
    return (
        <p className={"form-label mb-4"}>{children}</p>
    );
}

function CreateForm() {
    const [step, setStep] = useState<FormStep>(FormStep.NameQuestion);
    const [name, setName] = useState<string>("");
    const [brief, setBrief] = useState<string>("");

    if (step === FormStep.NameInput)
        return (
            <div className={"form-container"}>
                <FormLabel back={FormStep.NameQuestion} setStep={setStep}>
                    Enter your brand name:
                </FormLabel>

                <input
                    type={"text"} className={"input mb-4"} placeholder={"Brand name"}
                    onChange={(e) => setName(e.target.value)}
                />

                <button
                    type={"button"} className={"btn"}
                    disabled={!name}
                >
                    Next
                </button>
            </div>
        );
    if (step === FormStep.NameGeneration)
        return (
            <div className={"form-container"}>
                <FormLabel back={FormStep.NameQuestion} setStep={setStep}>
                    Give us a brief about your business idea. We will generate a name for you.
                </FormLabel>
                <textarea
                    className={"input mb-4"}
                    onChange={(e) => setBrief(e.target.value)}
                    rows={6}
                >{brief}</textarea>

                <button
                    type={"button"} className={"btn mb-4"}
                    disabled={!brief}
                >
                    Generate
                </button>

                <label htmlFor="name" className={"self-start"}>Generated name:</label>
                <input
                    type="text"
                    readOnly={true}
                    value={name}
                    className={"input mb-4"}
                />

                <button
                    type={"button"} disabled={!name}
                    className={"btn"}
                >
                    Next
                </button>
            </div>
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
    return (
        <section className={"py-8 responsive-px flex-grow flex flex-col"}>
            <PageTitle>Create brand</PageTitle>
            <CreateForm />
        </section>
    );
}