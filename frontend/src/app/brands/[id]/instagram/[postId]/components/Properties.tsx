"use client";

import {panel} from "@/app/brands/[id]/instagram/[postId]/components/primitives";
import clsx from "clsx";
import {button, input} from "@/components/primitives";
import {useContext} from "react";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";

export default function Properties() {
    const { brand } = useContext(BrandContext);
    const { post, setPost } = useContext(EditorContext);

    return (
        <section className={clsx(
            panel({ layouts: "properties" }),
            "max-w-fit"
        )}>
            <h2 className={"text-xl mb-2 border-b pb-2"}>Properties</h2>

            <div className="mb-auto">
                <label
                    htmlFor={"name"}
                    className={"block"}
                >Name</label>
                <input
                    name={"name"} id={"name"}
                    type="text" className={input()}
                    value={post.name}
                    onChange={e => setPost({ ...post, name: e.target.value })}
                />

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
        </section>
    );
}