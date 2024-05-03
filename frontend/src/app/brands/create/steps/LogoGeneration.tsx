import React, {useContext} from "react";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import LogoPreview from "@/app/brands/create/components/logo/LogoPreview";
import GenerateButton from "@/app/brands/create/components/logo/GenerateButton";
import FormNext from "@/app/brands/create/components/FormNext";

export default function LogoGeneration() {
    const { logo } = useContext(BrandContext);

    return (
        <div className="form-container">
            <FormLabel back>Generate a logo</FormLabel>

            <div className="mt-4 mb-8">
                <LogoPreview />
            </div>

            <div className={
                "w-[300px] h-[300px] rounded-md border-2 border-cyan " +
                "flex flex-col gap-2 justify-center items-center text-center " +
                "text-zinc-400 mb-4"
            }>
                <h2 className={"text-lg"}>Here is the preview region</h2>
                <p className={"font-light"}>
                    Press on the {`"Generate"`} button to get your first logo
                </p>
            </div>
            <GenerateButton />

            <FormNext
                disabled={!logo}
                next={FormStep.Review}
            />
        </div>
    );
}