import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import React, {useEffect, useRef, useState} from "react";

type MouseCallback = (this:HTMLCanvasElement, ev: MouseEvent) => any;
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
    }, [callback, canvas, currentCallback, eventName]);
}

function useStatefulEvent(canvas: Canvas, eventName: EventNames) {
    const [callback, setCallback] = useState<NullableMouseCallback>(null);
    const currentCallback = useRef<NullableMouseCallback>(null);
    useUpdateEvent(canvas, eventName, callback, currentCallback);

    return [callback, setCallback] as const;
}

export default function useToolEvents(canvas: Canvas, tool: Tools) {
    const [mouseDownCallback, setMouseDownCallback] = useStatefulEvent(canvas, "mousedown");
    const [mouseUpCallback, setMouseUpCallback] = useStatefulEvent(canvas, "mouseup");
    const [mouseMoveCallback, setMouseMoveCallback] = useStatefulEvent(canvas, "mousemove");

    useEffect(() => {
        if (!canvas.current)
            return;

        switch (tool) {
            case Tools.SELECT:
                setMouseDownCallback(() => {
                    return () => {
                        console.log("Selecting");
                    }
                });
                break;
            case Tools.RECTANGLE:
                setMouseDownCallback(() => {
                    return () => {
                        console.log("Rectangle");
                    }
                });
                break;
            case Tools.CIRCLE:
                setMouseDownCallback(() => {
                    return () => {
                        console.log("Circle");
                    }
                });
                break;
        }
    }, [canvas, setMouseDownCallback, tool]);

}