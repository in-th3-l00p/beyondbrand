"use client";

import {FormLabel} from "@/app/brands/create/components/FormLabel";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {useContext} from "react"
import {formContainer} from "@/components/form/primitives";
import {button} from "@/components/primitives";

export default function LogoDialog() {
    const { addStep } = useContext(BrandContext);

    return (
        <div className={formContainer()}>
            <FormLabel back>Are you already having a logo?</FormLabel>
            <div className="flex gap-4">
                <button
                    type={"button"} className={button()}
                    onClick={() => addStep(FormStep.LogoUpload)}
                >Yes</button>
                <button
                    type={"button"} className={button()}
                    onClick={() => addStep(FormStep.LogoGeneration)}
                >No</button>
            </div>
        </div>
    );
}