import React, {useContext} from "react";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import UploadRegion from "@/app/brands/create/components/logo/UploadRegion";
import FormNext from "@/app/brands/create/components/FormNext";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";

export default function LogoGeneration() {
    const { logo } = useContext(BrandContext);

    return (
        <div className="form-container">
            <FormLabel back>Upload your logo</FormLabel>
            <UploadRegion />
            <FormNext
                disabled={!logo}
                next={FormStep.LogoUpload}
            />
        </div>
    );
}