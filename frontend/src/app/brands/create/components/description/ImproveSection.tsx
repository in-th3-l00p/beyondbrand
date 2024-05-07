import React, {useContext, useState} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import * as Icon from "react-feather";
import Loading from "@/app/brands/create/components/Loading";

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
                        id="improved" className={"input w-full resize-none"}
                        rows={6}
                        value={improved}
                        readOnly
                    />
                </div>
                <div className="text-center">
                    <button
                        type={"button"} className={"btn mb-2"}
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
                className="btn w-full md:w-auto"
                disabled={loading || !name || !description}
                onClick={() => {
                    setLoading(true);
                    fetch("/api/brands/generateDescription", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            name, description
                        }),
                        cache: "no-cache"
                    })
                        .then(response => response.json())
                        .then((data: { brandDescription?: string }) => {
                            setImproved(data.brandDescription || "");
                        })
                        .finally(() => setLoading(false));
                }}
            >
                Improve
            </button>
        </div>
    );
}