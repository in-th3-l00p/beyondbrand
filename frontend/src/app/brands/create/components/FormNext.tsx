"use client";

import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import React, {useContext} from "react";

export default function FormNext({
    disabled, next
}: {
    disabled?: boolean;
    next: FormStep;
}) {
    const { addStep } = useContext(BrandContext);

    return (
        <button
            type={"submit"}
            disabled={disabled}
            className={"btn"}
            onClick={() => {
                addStep(next);
            }}
        >
            Next
        </button>
    );
}