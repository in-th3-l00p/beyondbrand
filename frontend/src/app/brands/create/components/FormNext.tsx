"use client";

import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import React, {useContext} from "react";

export default function FormNext({
    disabled, current, next
}: {
    disabled?: boolean;
    current: FormStep;
    next: FormStep;
}) {
    const { addStep, setStep } = useContext(BrandContext);

    return (
        <button
            type={"button"}
            disabled={disabled}
            className={"btn"}
            onClick={() => {
                addStep(current);
                setStep(next);
            }}
        >
            Next
        </button>
    );
}