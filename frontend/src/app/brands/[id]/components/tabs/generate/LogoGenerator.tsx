import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import React, {useContext, useState} from "react";
import LogoPreview from "@/components/logo/LogoPreview";
import clsx from "clsx";
import {button, input} from "@/components/primitives";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import generationService from "@/service/generationService";

export default function LogoGenerator() {
    const { brand } = useContext(BrandContext);
    const [logo, setLogo] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [prompt, setPrompt] = useState<string>("");

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Generate logo</h2>

            <div className="flex flex-col gap-4 items-center">
                {logo && (
                    <div className="mt-4 mb-8">
                        <LogoPreview
                            logo={logo}
                            setLogo={setLogo}
                        />
                    </div>
                )}

                {!logo && (
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
                )}
                {logo && (
                    <div className="flex items-center flex-wrap gap-4">
                        <button
                            type={"button"}
                            className={clsx(button())}
                            onClick={() => {
                                setLoading(true);
                                fetch("/api/brands", {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        _id: brand._id,
                                        logo
                                    }),
                                    cache: "no-cache"
                                })
                                    .then(resp => resp.json())
                                    .then((data) => {
                                        brand.logo = data.logo;
                                        window.location.reload();
                                    })
                                    .finally(() => setLoading(false));
                            }}
                        >
                            Save
                        </button>
                        <button
                            type={"button"}
                            className={clsx(button())}
                            onClick={() => setLogo("")}
                        >
                            Regenerate
                        </button>
                    </div>
                )}

                {loading && <p>Loading...</p>}
            </div>

            {!loading && (
                <div className={"flex flex-col items-center"}>
                    <label
                        htmlFor="prompt"
                        className={"self-start"}
                    >Prompt:</label>
                    <textarea
                        name={"prompt"}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className={clsx(input(), "mb-4")}
                    />

                    <button
                        type={"button"}
                        className={button()}
                        disabled={!prompt || !brand.colors.length || loading}
                        onClick={() => {
                            setLoading(true);
                            generationService.logoPrompted(prompt, brand.colors)
                                .then((data: { b64_json: string }) => setLogo("data:image/jpeg;base64," + data.b64_json))
                                .finally(() => setLoading(false));
                        }}
                    >
                        Generate
                    </button>
                </div>
            )}
        </div>
    )
}