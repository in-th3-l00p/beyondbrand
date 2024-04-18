import React, {useContext} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {FormLabel} from "@/app/brands/create/FormLabel";

export function BrandNameInput() {
    const {name, setName} = useContext(BrandContext);

    return (
        <div className={"form-container"}>
            <FormLabel
                back={FormStep.NameQuestion}
                onBack={() => setName("")}
            >
                Enter your brand name:
            </FormLabel>

            <input
                type={"text"}
                className={"input mb-4"}
                placeholder={"Brand name"}
                value={name}
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
}