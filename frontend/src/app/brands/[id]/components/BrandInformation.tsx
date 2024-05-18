"use client";

import React, {useContext, useState} from "react";
import {button} from "@/components/primitives";
import {label, panel, PanelLoading, panelTitle} from "@/app/brands/[id]/components/components";
import {z} from "zod";
import FormError from "@/components/FormError";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import toast from "react-hot-toast";

export default function BrandInformation() {
    const { brand, setBrand } = useContext(BrandContext);
    const [name, setName] = useState<string>(brand.name);
    const [description, setDescription] = useState<string>(brand.description);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<{
        errors: z.ZodIssue[];
    }>({ errors: [] });

    const checkChanges = () => {
        return name !== brand.name || description !== brand.description;
    }

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Brand information:</h2>

            <div className="mb-4">
                <h3 className={label()}>Name</h3>
                <input
                    type={"text"}
                    className={"input mb-4"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormError errors={error.errors} name={"name"} />
            </div>

            <div className="mb-4">
                <h3 className={label()}>Description</h3>
                <textarea
                    className={"input"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                />
                <FormError errors={error.errors} name={"description"} />
            </div>


            <div className="flex flex-wrap gap-4">
                <button
                    type={"button"}
                    disabled={!checkChanges()}
                    className={button()}
                    onClick={() => {
                        setLoading(true);
                        fetch("/api/brands", {
                            method: "PUT",
                            body: JSON.stringify({
                                _id: brand._id,
                                name: name,
                                description: description
                            }),
                            cache: "no-cache"
                        })
                            .then(async (brand) => {
                                const response = await brand.json();
                                if (!brand.ok) {
                                    setError({
                                        errors: response.error.issues
                                    });
                                    return;
                                }

                                setBrand(response);
                                setError({
                                    errors: []
                                });
                            })
                            .finally(() => setLoading(false));
                        toast.success("Changes saved")
                    }}
                >
                    Save
                </button>

                <button
                    type={"button"}
                    className={button({ type: "danger" })}
                    disabled={!checkChanges()}
                    onClick={() => {
                        setName(brand.name);
                        setDescription(brand.description);
                        toast.success("Changes discarded");
                    }}
                >
                    Discard
                </button>
            </div>

            {loading && <PanelLoading />}
        </div>
    );
}