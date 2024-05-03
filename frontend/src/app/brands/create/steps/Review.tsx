import {FormLabel} from "@/app/brands/create/components/FormLabel";
import React, {useContext} from "react";
import BrandContext from "@/app/brands/create/BrandContext";
import LogoPreview from "@/app/brands/create/components/logo/LogoPreview";

export default function Review() {
    const { name, description, colors} = useContext(BrandContext);

    return (
        <form className={"form-container"}>
            <FormLabel back>Review your brand</FormLabel>

            <div className="flex flex-col gap-8 w-full">
                <div className={"flex gap-4 items-center"}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        readOnly={true}
                        disabled={true}
                        className={"input"}
                        name={"name"}
                        value={name}
                    />
                </div>

                <div>
                    <label htmlFor="description" className={"w-full"}>Description:</label>
                    <textarea
                        readOnly={true}
                        disabled={true}
                        className={"input"}
                        name={"description"}
                        value={description}
                        rows={6}
                    />
                </div>

                <div>
                    <label htmlFor="colors" className={"w-full"}>Colors:</label>
                    <div className={"flex flex-wrap gap-4 justify-center"}>
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className={"px-4 h-48 flex items-end rounded-md shadow-md"}
                                style={{
                                    backgroundColor: color
                                }}
                            >
                                <p>{color}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="logo">Logo:</label>
                    <LogoPreview />
                </div>

                <button
                    className={"btn mx-auto"}
                >
                    Create
                </button>
            </div>
        </form>
    );
}