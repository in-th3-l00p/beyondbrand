import React from "react";
import {tv} from "tailwind-variants";
import {button} from "@/components/primitives";
import * as Icon from "react-feather";

const modalContainer = tv({
    base:
        "fixed z-50 inset-0 bg-black bg-opacity-50 " +
        "flex justify-center items-center px-8 py-32"
});

const modal = tv({
    base:
        "bg-ghost-white p-4 rounded-md shadow-md " +
        "max-w-3xl w-full overflow-auto"
});

const modalHeader = tv({
    base: "flex justify-between items-center w-full flex-grow gap-4 pb-4 mb-4 border-b border-black"
});

export const modalFooter = tv({
    base: "flex justify-end gap-4 pt-4 mt-4 border-t"
});

const modalTitle = tv({
    base: "text-2xl"
});

function ModalHeader({ title, setShow }: {
    title?: string;
    setShow?: (show: boolean) => void;
}) {
    if (!title && !setShow)
        return <></>;
    return (
        <div className={modalHeader()}>
            {title && <h2 className={modalTitle()}>{title}</h2>}
            {setShow  && (
                <button
                    className={button({ type: "danger" })}
                    onClick={() => setShow(false)}
                >
                    <Icon.X />
                </button>
            )}
        </div>
    );
}

export default function Modal({ title, show, setShow, children }: {
    title?: string;
    show?: boolean;
    setShow?: (show: boolean) => void;
    children?: React.ReactNode;
}) {
    if (!show && show !== undefined)
        return <></>;
    return (
        <div
            onClick={(e) => {
                if (e.target !== e.currentTarget || !setShow)
                    return;
                setShow(false);
            }}
            className={modalContainer()}
        >
            <div className={modal()}>
                <ModalHeader
                    title={title}
                    setShow={setShow}
                />
                {children}
            </div>
        </div>
    );
}