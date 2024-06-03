"use client";

import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import React, {useContext} from "react";
import {button} from "@/components/primitives";

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
            className={button()}
            onClick={() => {
                addStep(next);
            }}
        >
            Next
        </button>
    );
}