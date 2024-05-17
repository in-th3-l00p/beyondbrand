import React, {useContext, useEffect, useRef, useState} from "react";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/tools";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";

type MouseCallback = (ev: MouseEvent) => any;
type NullableMouseCallback = MouseCallback | null;
type Canvas = React.RefObject<HTMLCanvasElement>;
type EventNames = "mousedown" | "mouseup" | "mousemove";

function useUpdateEvent(
    canvas: Canvas,
    eventName: EventNames,
    callback: NullableMouseCallback,
    currentCallback: React.MutableRefObject<NullableMouseCallback>
) {
    useEffect(() => {
        if (!canvas.current)
            return;
        if (currentCallback.current)
            canvas
                .current
                .removeEventListener(eventName, currentCallback.current);
        if (callback)
            canvas
                .current
                .addEventListener(eventName, callback);
        currentCallback.current = callback;

        const cleanupCanvas = canvas.current;
        return () => {
            if (currentCallback.current)
                cleanupCanvas.removeEventListener(
                    eventName,
                    currentCallback.current
                );
        }
    }, [callback, canvas, currentCallback, eventName]);
}

function useStatefulEvent(canvas: Canvas, eventName: EventNames) {
    const [callback, setCallback] = useState<NullableMouseCallback>(null);
    const currentCallback = useRef<NullableMouseCallback>(null);
    useUpdateEvent(canvas, eventName, callback, currentCallback);

    return (newCallback: NullableMouseCallback) => {
        setCallback(() => newCallback);
    };
}

export default function useToolEvents(canvas: Canvas) {
    const { tool, post, setPost , color} = useContext(EditorContext);

    const setMouseDownCallback = useStatefulEvent(canvas, "mousedown");
    const setMouseUpCallback = useStatefulEvent(canvas, "mouseup");
    const setMouseMoveCallback = useStatefulEvent(canvas, "mousemove");

    const rectangleStart = useRef<{ x: number, y: number } | null>(null);
    const circleStart = useRef<{ x: number, y: number } | null>(null);

    useEffect(() => {
        if (!canvas.current)
            return;

        switch (tool) {
            case Tools.SELECT:
                setMouseDownCallback(null);
                setMouseUpCallback(null);
                setMouseMoveCallback(null);
                break;
            case Tools.RECTANGLE:
                setMouseDownCallback((ev: MouseEvent) => {
                    rectangleStart.current = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                });

                setMouseUpCallback((ev: MouseEvent) => {
                    if (!rectangleStart.current)
                        return;
                    const rectangle = {
                        x: rectangleStart.current.x,
                        y: rectangleStart.current.y,
                        width: ev.offsetX - rectangleStart.current.x,
                        height: ev.offsetY - rectangleStart.current.y,
                        color: color
                    };

                    const newPost = {...post};
                    newPost.shapes.push({
                        type: "rectangle",
                        data: rectangle
                    });
                    setPost(newPost);

                    rectangleStart.current = null;
                });
                break;
            case Tools.CIRCLE:
                setMouseDownCallback((ev: MouseEvent) => {
                    circleStart.current = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    };
                });
                setMouseUpCallback((ev: MouseEvent) => {
                    if (!circleStart.current)
                        return;
                    const distance = Math.sqrt(
                        (ev.offsetX - circleStart.current.x) ** 2 +
                        (ev.offsetY - circleStart.current.y) ** 2
                    );
                    const circle = {
                        x: circleStart.current.x,
                        y: circleStart.current.y,
                        radius: distance,
                        color: color
                    };
                    const newPost = {...post};
                    newPost.shapes.push({
                        type: "circle",
                        data: circle
                    });
                    setPost(newPost);

                    circleStart.current = null;
                });
                break;
        }
    }, [canvas, tool, color, post, setPost]);
}