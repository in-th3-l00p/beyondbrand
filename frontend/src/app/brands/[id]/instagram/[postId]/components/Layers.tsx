import {panel, panelTitle} from "@/app/brands/[id]/instagram/[postId]/components/primitives";
import {useContext} from "react";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import clsx from "clsx";

export default function Layers() {
    const WIDTH = 180;
    const { post, selectedShape, setSelectedShape, setSelectedIndex } = useContext(EditorContext);

    return (
         <section className={panel({ layouts: "properties" })}>
            <h2 className={panelTitle()}>Layers</h2>

            {post.shapes.length === 0 && (
                <div
                    className={`text-center my-auto`}
                    style={{ width: WIDTH }}
                >
                    There are no layers
                </div>
            )}

            <div className={clsx(
                "flex flex-col gap-4 pe-4",
                "overflow-y-scroll overflow-x-hidden no-scrollbar"
            )}>
                {post.shapes.map((shape, index) => (
                    <button
                        type={"button"}
                        key={index}
                        className={clsx(
                            "flex justify-center items-center",
                            `p-2 border-2 border-cyan rounded-md shadow-md`,
                            'hover:shadow-xl hover:bg-dark-cyan hover:text-white transition-all',
                            selectedShape === shape && "bg-cyan text-white"
                        )}
                        style={{ width: WIDTH }}
                        onClick={() => {
                            if (selectedShape === shape) {
                                setSelectedShape(null);
                                setSelectedIndex(null);
                                return;
                            }

                            setSelectedShape(shape);
                            setSelectedIndex(index);
                        }}
                    >
                        {shape.name ? shape.name : `Layer ${index}`}
                    </button>
                ))}
            </div>
        </section>
    );
}