import React, {useContext, useEffect, useRef} from "react";
import clsx from "clsx";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";

export default function Canvas() {
    const { post } = useContext(EditorContext);
    const container = useRef<HTMLDivElement>(null);
    const canvas = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvas.current || !container.current)
            return;

        const ctx = canvas.current.getContext("2d");
        if (!ctx)
            return;

        const { width, height } = container.current.getBoundingClientRect();
        canvas.current.width = canvas.current.height = Math.min(width, height);

        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, width, height);
    }, [])

    return (
        <section
            ref={container}
            className={clsx(
                "bg-ghost-white w-full shadow-md rounded-md p-8",
                "flex flex-grow justify-center items-center",
            )}
        >
            <canvas
                ref={canvas}
                className={"border-2 border-cyan"}
            />
        </section>
    );
}