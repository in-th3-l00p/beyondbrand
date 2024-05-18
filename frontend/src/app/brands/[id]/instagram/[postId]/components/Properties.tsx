"use client";

import {panel, panelTitle} from "@/app/brands/[id]/instagram/[postId]/components/primitives";
import {button, input} from "@/components/primitives";
import {useContext} from "react";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import {tv} from "tailwind-variants";

const propertiesContainer = tv({
    base: "flex-grow flex flex-col justify-between items-center"
});

const fieldsContainer = tv({
    base: "flex flex-col gap-4 w-full"
});

function PostProperties() {
    const {brand} = useContext(BrandContext);
    const {post, setPost} = useContext(EditorContext);
    const {selectedShape} = useContext(EditorContext);

    if (selectedShape)
        return <></>;
    return (
        <div className={propertiesContainer()}>
            <div className={fieldsContainer()}>
                <div>
                    <label
                        htmlFor={"name"}
                        className={"block"}
                    >Name:</label>
                    <input
                        name={"name"} id={"name"}
                        type="text" className={input()}
                        value={post.name}
                        onChange={e => setPost({...post, name: e.target.value})}
                    />
                </div>
            </div>

            <button
                type={"button"}
                className={button({type: "danger"})}
                onClick={() => {
                    fetch(`/api/brands/${brand._id}/instagram/${post._id}`, {
                        method: "DELETE"
                    })
                        .then(() => window.location.href = `/brands/${brand._id}`)
                }}
            >
                Delete
            </button>
        </div>
    );
}

function ShapeProperties() {
    const {selectedShape} = useContext(EditorContext);

    if (!selectedShape)
        return <></>;
    return (
        <div className={propertiesContainer()}>
            <div className={fieldsContainer()}>
                <div className="mb-auto">
                    <label
                        htmlFor={"name"}
                        className={"block"}
                    >Name:</label>
                    <input
                        name={"name"} id={"name"}
                        type="text" className={input()}
                        value={selectedShape._id}
                    />
                </div>

                <div className="mb-auto">
                    <label
                        htmlFor={"x"}
                        className={"block"}
                    >X:</label>
                    <input
                        name={"numeric"} id={"x"}
                        type="numeric" className={input()}
                        value={selectedShape.data.x}
                    />
                </div>

                <div className="mb-auto">
                    <label
                        htmlFor={"y"}
                        className={"block"}
                    >Y:</label>
                    <input
                        name={"numeric"} id={"y"}
                        type="text" className={input()}
                        value={selectedShape.data.y}
                    />
                </div>

                {selectedShape.shape === "rectangle" && (
                    <>
                        <div className="mb-auto">
                            <label
                                htmlFor={"width"}
                                className={"block"}
                            >Width:</label>
                            <input
                                name={"numeric"} id={"width"}
                                type="text" className={input()}
                                value={selectedShape.data.width}
                            />
                        </div>
                    </>
                )}
            </div>

            <button
                type={"button"}
                className={button({type: "danger"})}
            >
                Delete
            </button>
        </div>
    );
}

export default function Properties() {
    const { selectedShape } = useContext(EditorContext);

    return (
        <section className={panel({ layouts: "properties" }) + " max-w-[300px]"}>
            <h2 className={panelTitle()}>Properties{selectedShape ? ` - ${selectedShape._id}` : ""}</h2>

            <PostProperties />
            <ShapeProperties />
        </section>
    );
}