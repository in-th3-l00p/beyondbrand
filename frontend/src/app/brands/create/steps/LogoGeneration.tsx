"use client";

import React, {useContext, useState} from "react";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import BrandContext from "@/app/brands/create/BrandContext";
import LogoPreview from "@/app/brands/create/components/logo/LogoPreview";
import GenerateButton from "@/app/brands/create/components/logo/GenerateButton";
import useB64Preview from "@/app/brands/create/components/logo/useB64Preview";
import Image from "next/image";

export default function LogoGeneration() {
    const PREVIEW_SIZE = 300;
    const [previewLogo, setPreviewLogo] = useState<string>("");
    const {file, fileReader} = useB64Preview(previewLogo, setPreviewLogo);

    return (
        <div className="form-container">
            <FormLabel back>Generate a logo</FormLabel>

            <div className={
                `w-[${PREVIEW_SIZE}px] h-[${PREVIEW_SIZE}px] rounded-md border-2 border-cyan ` +
                "flex flex-col gap-2 justify-center items-center text-center " +
                "text-zinc-400 mb-4"
            }>
                {(previewLogo && fileReader) ? (
                    <Image
                        src={fileReader.result as string} alt={"Logo preview"}
                        width={PREVIEW_SIZE}
                        height={PREVIEW_SIZE}
                        className={"rounded-md w-full h-full"}
                    />
                ) : (
                    <>
                        <h2 className={"text-lg"}>Here is the preview region</h2>
                        <p className={"font-light"}>
                            Press on the {`"Generate"`} button to get your first logo
                        </p>
                    </>
                )}
            </div>

            <GenerateButton
                previewLogo={previewLogo}
                setPreviewLogo={setPreviewLogo}
            />
        </div>
    );
}