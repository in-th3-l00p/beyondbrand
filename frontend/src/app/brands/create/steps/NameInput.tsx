import React, {useContext} from "react";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import FormNext from "@/app/brands/create/components/FormNext";
import {formContainer} from "@/components/form/primitives";

export function NameInput() {
    const {name, setName} = useContext(BrandContext);

    return (
        <form className={formContainer()}>
            <FormLabel back>
                Enter your brand name:
            </FormLabel>

            <input
                type={"text"}
                className={"input mb-4"}
                placeholder={"Brand name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <FormNext
                disabled={!name}
                next={FormStep.DescriptionInput}
            />
        </form>
    );
}