import BrandContext, {FormStep} from "@/app/brands/create/BrandContext";
import React, {useContext} from "react";
import * as Icon from "react-feather";

export function FormLabel({back, onBack, children}: {
    back?: boolean;
    onBack?: () => void;
    children: React.ReactNode;
}) {
    const {stepStack, popStep} = useContext(BrandContext);

    if (back && stepStack.length > 0)
        return (
            <div className="flex flex-wrap items-center gap-4 mb-4">
                <button
                    type={"button"} className={"btn w-full md:w-auto"}
                    onClick={() => {
                        if (onBack)
                            onBack();
                        popStep();
                    }}
                >
                    <Icon.ArrowLeft className={"mx-auto"}/>
                </button>
                <p className={"form-label"}>{children}</p>
            </div>
        );
    return (
        <p className={"form-label mb-4"}>{children}</p>
    );
}