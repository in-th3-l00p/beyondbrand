import React, {useContext, useEffect, useRef} from "react";
import clsx from "clsx";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import useToolEvents from "@/app/brands/[id]/instagram/[postId]/components/useToolEvents";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import {panel} from "@/app/brands/[id]/instagram/[postId]/components/primitives";

export default function Canvas() {
    const { brand } = useContext(BrandContext);
    const { post} = useContext(EditorContext);
    const container = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);

    useToolEvents(canvas);
    useEffect(() => {
        if (!canvas.current || !container.current)
            return;

        const { width, height } = container.current.getBoundingClientRect();
        canvas.current.width = canvas.current.height = Math.min(width, height);
        container.current.addEventListener("resize", () => {
            if (!canvas.current || !container.current)
                return;
            const { width, height } =
                container.current.getBoundingClientRect();
            canvas.current.width = canvas.current.height = Math.min(width, height);
        });
    }, []);

    useEffect(() => {
        if (!canvas.current || !container.current)
            return;

        const ctx = canvas.current.getContext("2d");
        if (!ctx)
            return;

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);

        for (const shape of post.shapes) {
            switch (shape.shape) {
                case "rectangle":
                    ctx.fillStyle = shape.data.color;
                    ctx.fillRect(
                        shape.data.x,
                        shape.data.y,
                        shape.data.width!,
                        shape.data.height!
                    );
                    break;
                case "circle":
                    ctx.fillStyle = shape.data.color;
                    ctx.beginPath();
                    ctx.arc(
                        shape.data.x,
                        shape.data.y,
                        shape.data.radius!,
                        0,
                        2 * Math.PI
                    );
                    ctx.fill();
                    break;
            }
        }
    }, [post]);

    useEffect(() => {
        fetch(`/api/brands/${brand._id}/instagram/${post._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        });
    }, [brand, post]);

    return (
        <section
            ref={container}
            className={clsx(panel(), "flex-grow flex justify-center items-center")}
        >
            <canvas
                ref={canvas}
                className={"border-2 border-cyan"}
            />
        </section>
    );
}