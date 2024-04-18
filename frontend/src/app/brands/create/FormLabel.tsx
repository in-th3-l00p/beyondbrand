import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import React, {useContext} from "react";
import * as Icon from "react-feather";

export function FormLabel({back, onBack, children}: {
    back?: FormStep;
    onBack?: () => void;
    children: React.ReactNode;
}) {
    const {setStep} = useContext(BrandContext);

    if (back !== undefined && setStep)
        return (
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                    type={"button"} className={"btn"}
                    onClick={() => {
                        if (onBack)
                            onBack();
                        setStep(back);
                    }}
                >
                    <Icon.ArrowLeft/>
                </button>
                <p className={"form-label"}>{children}</p>
            </div>
        );
    return (
        <p className={"form-label mb-4"}>{children}</p>
    );
}