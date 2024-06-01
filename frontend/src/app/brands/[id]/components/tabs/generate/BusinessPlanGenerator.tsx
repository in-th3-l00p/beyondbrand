"use client";

import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import {useContext, useState} from "react";
import clsx from "clsx";
import {button, input} from "@/components/primitives";
import {marked} from "marked";
import "./business-plan-generator.scss";
import generationService from "@/service/generationService";

export default function BusinessPlanGenerator() {
    const [generatedBusinessPlan, setGeneratedBusinessPlan] = useState<string>("");
    const [prompt, setPrompt]  = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [html, setHtml] = useState<string>("");

    const { brand} = useContext(BrandContext);

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Generate business plan</h2>

            <div>
                <label htmlFor="query">Business plan prompt:</label>

                <textarea
                    id={"query"}
                    className={clsx(input(), "mb-4")}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={6}
                    defaultValue={prompt}
                />

                <button
                    type={"button"} className={clsx(button(), "mb-4")}
                    disabled={!prompt && prompt.length < 10 && loading}
                    onClick={() => {
                        setLoading(true);
                        generationService.businessPlan(brand._id.toString(), prompt)
                            .then(async (data: { businessPlan?: string }) => {
                                setGeneratedBusinessPlan(data.businessPlan || "");
                                setHtml(await marked(data.businessPlan || ""));
                            })
                            .finally(() => setLoading(false));
                    }}
                >
                    Generate
                </button>
            </div>

            <div>
                {loading && <p>Loading...</p>}
                {html && (
                    <div
                        id={"business-plan"}
                        className={"border p-4"}
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                )}
                {generatedBusinessPlan && (
                    <button
                        type={"button"}
                        className={clsx(button(), "mt-4")}
                        onClick={() => {
                            const blob = new Blob([generatedBusinessPlan], { type: "text/plain" });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement("a");
                            a.href = url;
                            a.download = "business-plan.md";
                            a.click();
                        }}
                    >
                        Download
                    </button>

                )}
            </div>
        </div>
    );
}