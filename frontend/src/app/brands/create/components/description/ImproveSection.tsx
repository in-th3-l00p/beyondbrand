import React, {useContext, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import * as Icon from "react-feather";
import Loading from "@/app/brands/create/components/Loading";
import toast from "react-hot-toast";
import generationService from "@/service/generationService";
import clsx from "clsx";
import {button, input} from "@/components/primitives";

export function ImproveSection() {
    const [improved, setImproved] = useState<string | null>(null);
    const {name, description, setDescription} = useContext(BrandContext);
    const [loading, setLoading] = useState<boolean>(false);

    if (loading)
        return <Loading />;
    if (improved !== null)
        return (
            <div className={"mt-4 mb-8 w-full flex gap-4 flex-wrap items-center"}>
                <div className={"flex-grow"}>
                    <p>Improved AI generated description:</p>
                    <textarea
                        name="improved"
                        id="improved" className={clsx(input(), "w-full resize-none")}
                        rows={6}
                        value={improved}
                        readOnly
                    />
                </div>
                <div className="text-center">
                    <button
                        type={"button"} className={clsx(button(), "mb-2")}
                        title={"Accept improved description"}
                        onClick={() => {
                            setImproved(null);
                            setDescription(improved);
                        }}
                    >
                        <Icon.ArrowUp/>
                    </button>
                    <p>Accept?</p>
                </div>
            </div>
        );

    return (
        <div className="flex flex-wrap justify-between md:items-center gap-4 mb-4">
            <p>Press the following button to get AI improvement:</p>
            <button
                type={"button"}
                className={clsx(button(), "w-full md:w-auto")}
                disabled={loading || !name || !description}
                onClick={() => {
                    setLoading(true);
                    generationService.descriptionPrompted(name, description)
                        .then((data: { brandDescription?: string }) => {
                            setImproved(data.brandDescription || "");
                            toast.success("Description improved successfully")
                        })
                        .finally(() => setLoading(false));
                }}
            >
                Improve
            </button>
        </div>
    );
}