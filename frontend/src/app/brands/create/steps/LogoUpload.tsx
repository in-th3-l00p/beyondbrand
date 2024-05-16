import React, {useContext} from "react";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import UploadRegion from "@/components/logo/UploadRegion";
import FormNext from "@/app/brands/create/components/FormNext";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import {formContainer} from "@/components/form/primitives";

export default function LogoGeneration() {
    const { logo } = useContext(BrandContext);

    return (
        <div className={formContainer()}>
            <FormLabel back>Upload your logo</FormLabel>
            <UploadRegion />
            <FormNext
                disabled={!logo}
                next={FormStep.Review}
            />
        </div>
    );
}