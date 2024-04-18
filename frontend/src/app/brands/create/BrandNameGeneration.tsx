import React, {useContext} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {FormLabel} from "@/app/brands/create/FormLabel";

export function BrandNameGeneration() {
    const {
        name, setName,
        brief, setBrief
    } = useContext(BrandContext);

    return (
        <div className={"form-container"}>
            <FormLabel
                back={FormStep.NameQuestion}
                onBack={() => {
                    setName("");
                    setBrief("");
                }}
            >
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
                onClick={() => {
                }}
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
}