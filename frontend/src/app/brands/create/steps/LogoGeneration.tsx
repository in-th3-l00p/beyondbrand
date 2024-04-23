import React from "react";
import {FormLabel} from "@/app/brands/create/components/FormLabel";

export default function LogoGeneration() {
    return (
        <div className="form-container">
            <FormLabel back>Generate a logo</FormLabel>

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

            <button
                type={"button"}
                className={"btn"}
            >
                Generate
            </button>
        </div>
    );
}