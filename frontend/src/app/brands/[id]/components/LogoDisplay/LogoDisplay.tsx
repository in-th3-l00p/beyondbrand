"use client";

import React, {useContext, useState} from "react";
import style from "@/app/brands/[id]/components/LogoDisplay/style.module.scss";
import Link from "next/link";
import * as Icon from "react-feather";
import {tv} from "tailwind-variants";
import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import {UploadLogoModal} from "@/app/brands/[id]/components/LogoDisplay/UploadLogoModal";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

const LogoButton = tv({
    base:
        "text-white flex flex-col justify-center items-center " +
        "hover:bg-black transition-all",
    variants: {
        border: {
            left: "border-l-2 border-white",
            right: "border-r-2 border-white"
        }
    }
});

function LogoOverlay({ setShowUpload }: {
    setShowUpload: (show: boolean) => void;
}) {
    return (
        <div
            id={"logo-overlay"}
            className={
                "absolute top-0 left-0 w-full h-full rounded-md " +
                "hidden grid-cols-2 " +
                "bg-black bg-opacity-80"
            }
        >
            <button
                className={LogoButton({ border: "right" })}
                onClick={() => setShowUpload(true)}
            >
                <Icon.Upload />
                Upload
            </button>
            <Link
                href={"#"}
                className={LogoButton({ border: "left" })}
            >
                <Icon.Edit />
                Create
            </Link>
        </div>
    );
}

export default function LogoDisplay() {
    const { brand } = useContext(BrandContext);
    const [showUpload, setShowUpload] = useState(false);

    return (
        <>
            <UploadLogoModal show={showUpload} setShow={setShowUpload} />
            <div className={panel()}>
                <h2 className={panelTitle()}>Logo:</h2>
                <div
                    className={
                        "max-w-fit max-h-fit mx-auto " +
                        "bg-black aspect-square rounded-md border-2 border-cyan shadow-md " +
                        "self-start flex justify-center items-center relative " +
                        style.logoContainer
                    }
                >
                    <img
                        src={brand.logo}
                        alt={"logo"}
                        width={300}
                        height={300}
                    />

                    <LogoOverlay setShowUpload={setShowUpload} />
                </div>
            </div>
        </>
    );
}
