"use client";

import {panel, panelTitle} from "@/app/brands/[id]/instagram/[postId]/components/primitives";
import {button, input} from "@/components/primitives";
import {useContext, useEffect, useState} from "react";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import toast from "react-hot-toast";
import {tv} from "tailwind-variants";
import UploadRegion from "@/components/logo/UploadRegion";

const propertiesContainer = tv({
    base: "flex-grow flex flex-col justify-between items-center"
});

const fieldsContainer = tv({
    base: "flex flex-col gap-4 w-full h-[500px] overflow-y-scroll no-scrollbar"
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
                        toast.success("Post deleted successfully")
                }}
            >
                Delete
            </button>
        </div>
    );
}

function ShapeProperties() {
    const {
        post, setPost,
        selectedShape, setSelectedShape,
        selectedIndex, setSelectedIndex
    } = useContext(EditorContext);

    const {brand} = useContext(BrandContext);
    const [b64Logo, setB64Logo] = useState<string>("");

    useEffect(() => {
        if (!selectedShape || selectedShape.shape !== "picture" || !b64Logo)
            return;

        fetch(`/api/brands/${brand._id}/instagram/${post._id}/picture`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                index: selectedIndex,
                postId: post._id,
                picture: b64Logo
            })
        })
            .then(resp => resp.json())
            .then(post => setPost(post));
    }, [b64Logo])

    if (!selectedShape)
        return <></>;
    return (
        <div className={propertiesContainer()}>
            <div className={fieldsContainer()}>
                <div className={"flex flex-col gap-4 items-center justify-center"}>
                    <button
                        type={"button"}
                        className={button()}
                        onClick={() => {
                            const newPost = {...post};
                            let size = 0;
                            if (selectedShape.shape === "rectangle")
                                size = selectedShape.data.width!;
                            else if (selectedShape.shape === "circle")
                                size = selectedShape.data.radius! * 2;
                            newPost.shapes[selectedIndex!].data.x = 1080 / 2 - size / 2;
                            setPost(newPost);
                        }}
                    >
                        Center H
                    </button>

                    <button
                        type={"button"}
                        className={button()}
                        onClick={() => {
                            const newPost = {...post};
                            let size = 0;
                            if (selectedShape.shape === "rectangle")
                                size = selectedShape.data.height!;
                            else if (selectedShape.shape === "circle")
                                size = selectedShape.data.radius! * 2;
                            newPost.shapes[selectedIndex!].data.y = 1080 / 2 - size / 2;
                            setPost(newPost);
                        }}
                    >
                        Center V
                    </button>
                </div>

                {selectedShape.shape === "picture" && (
                    <UploadRegion
                        b64Logo={b64Logo}
                        setB64Logo={setB64Logo}
                        noPreview={true}
                    />
                )}

                <div className="mb-auto">
                    <label
                        htmlFor={"name"}
                        className={"block"}
                    >Name:</label>
                    <input
                        name={"name"} id={"name"}
                        type="text" className={input()}
                        value={selectedShape.name || ""}
                        onChange={(e) => {
                            if (selectedIndex === null)
                                return;
                            const newPost = {...post};
                            newPost.shapes[selectedIndex].name = e.target.value;
                            setPost(newPost);
                        }}
                    />
                </div>

                <div className="mb-auto">
                    <label
                        htmlFor={"x"}
                        className={"block"}
                    >X:</label>
                    <input
                        name={"text"} id={"x"}
                        type="text" className={input()}
                        value={selectedShape.data.x}
                        onChange={e => {
                            if (selectedIndex === null)
                                return;
                            const newPost = {...post};
                            newPost.shapes[selectedIndex].data.x =
                                parseInt(e.target.value) || 0;
                            setPost(newPost);
                        }}
                    />
                </div>

                <div className="mb-auto">
                    <label
                        htmlFor={"y"}
                        className={"block"}
                    >Y:</label>
                    <input
                        name={"text"} id={"y"}
                        type="text" className={input()}
                        value={selectedShape.data.y}
                        onChange={e => {
                            if (selectedIndex === null)
                                return;
                            const newPost = {...post};
                            newPost.shapes[selectedIndex].data.y =
                                parseInt(e.target.value) || 0;
                            setPost(newPost);
                        }}
                    />
                </div>

                {(selectedShape.shape === "rectangle" || selectedShape.shape === "picture") && (
                    <>
                        <div className="mb-auto">
                            <label
                                htmlFor={"width"}
                                className={"block"}
                            >Width:</label>
                            <input
                                name={"text"} id={"width"}
                                type="text" className={input()}
                                value={selectedShape.data.width}
                                onChange={e => {
                                    if (selectedIndex === null)
                                        return;
                                    const newPost = {...post};
                                    newPost.shapes[selectedIndex].data.width =
                                        parseInt(e.target.value) || 0;
                                    setPost(newPost);
                                }}
                            />
                        </div>

                        <div className="mb-auto">
                            <label
                                htmlFor={"height"}
                                className={"block"}
                            >Height:</label>
                            <input
                                name={"text"} id={"height"}
                                type="text" className={input()}
                                value={selectedShape.data.height}
                                onChange={e => {
                                    if (selectedIndex === null)
                                        return;
                                    const newPost = {...post};
                                    newPost.shapes[selectedIndex].data.height =
                                        parseInt(e.target.value) || 0;
                                    setPost(newPost);
                                }}
                            />
                        </div>
                    </>
                )}

                {selectedShape.shape === "circle" && (
                    <div className="mb-auto">
                        <label
                            htmlFor={"radius"}
                            className={"block"}
                        >Radius:</label>
                        <input
                            name={"text"} id={"radius"}
                            type="text" className={input()}
                            value={selectedShape.data.radius}
                            onChange={e => {
                                if (selectedIndex === null)
                                    return;
                                const newPost = {...post};
                                newPost.shapes[selectedIndex].data.radius =
                                    parseInt(e.target.value) || 0;
                                setPost(newPost);
                            }}
                        />
                    </div>
                )}

                {(selectedShape.shape === "rectangle" || selectedShape.shape === "circle") && (
                    <div className="mb-auto">
                        <label
                            htmlFor={"color"}
                            className={"block"}
                        >Color:</label>
                        <input
                            name={"color"} id={"color"}
                            type="color" className={"w-full mb-4"}
                            value={selectedShape.data.color}
                            onChange={e => {
                                if (selectedIndex === null)
                                    return;
                                const newPost = {...post};
                                newPost.shapes[selectedIndex].data.color = e.target.value;
                                setPost(newPost);
                            }}
                        />
                    </div>
                )}
            </div>

            <button
                type={"button"}
                className={button({type: "danger"})}
                onClick={() => {
                    const newPost = {...post};
                    newPost.shapes = post.shapes
                        .filter((_, i) => i !== selectedIndex);
                    setPost(newPost);
                    setSelectedShape(null);
                    setSelectedIndex(null);
                }}
            >
                Delete
            </button>
        </div>
    );
}

export default function Properties() {
    return (
        <section className={panel({ layouts: "properties" }) + " max-w-[300px]"}>
            <h2 className={panelTitle()}>Properties</h2>

            <PostProperties />
            <ShapeProperties />
        </section>
    );
}