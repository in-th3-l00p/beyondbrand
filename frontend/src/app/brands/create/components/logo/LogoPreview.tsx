import useB64Preview from "@/app/brands/create/components/logo/useB64Preview";
import Image from "next/image";
import React from "react";

export default function LogoPreview() {
    const PREVIEW_SIZE = 300; // in px
    const {file, fileReader} = useB64Preview();

    if (!file)
        return <></>
    return (
        <div className={"w-full text-center flex flex-col items-center"}>
            <p>Preview:</p>
            {fileReader ? (
                <Image
                    src={fileReader.result as string} alt={"Logo preview"}
                    width={PREVIEW_SIZE}
                    height={PREVIEW_SIZE}
                    className={"border border-cyan mb-4 rounded-md"}
                />
            ): (
                <div className={
                    `border border-cyan mb-4 w-[${PREVIEW_SIZE}px] h-[${PREVIEW_SIZE}px] p-2 rounded-md ` +
                    "flex justify-center items-center"
                }>
                    <p>Loading...</p>
                </div>
            )}

            <p>Uploaded: {file.name}</p>
        </div>
    );
}
