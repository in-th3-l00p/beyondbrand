"use client";

import React, {useContext, useState} from "react";
import BrandDisplayContext from "@/app/brands/[id]/components/BrandDisplayContext/BrandDisplayContext";
import {button} from "@/components/defaults";
import {label, panel, panelTitle} from "@/app/brands/[id]/components/components";

export default function BrandInformation() {
    const { brand } = useContext(BrandDisplayContext);
    const [name, setName] = useState<string>(brand.name);
    const [description, setDescription] = useState<string>(brand.description);

    const checkChanges = () => {
        return name !== brand.name || description !== brand.description;
    }

    return (
        <div className={panel()}>
            <h2 className={panelTitle()}>Brand information:</h2>

            <h3 className={label()}>Name</h3>
            <input
                type={"text"}
                className={"input mb-4"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                defaultValue={brand.name}
            />

            <h3 className={label()}>Description</h3>
            <textarea
                className={"input mb-4"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
            />

            <div className="flex flex-wrap gap-4">
                <button
                    type={"button"}
                    disabled={!checkChanges()}
                    className={button()}
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
                    }}
                >
                    Discard
                </button>
            </div>
        </div>
    );
}