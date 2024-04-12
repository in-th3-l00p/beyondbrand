"use client";

import {useState} from "react";
import * as Icon from "react-feather";
import Sidebar from "@/app/layout/Sidebar";

export default function HeaderLinks() {
    const [opened, setOpened] = useState(false);

    return (
        <>
            {opened && (
                <Sidebar />
            )}
            <button
                type={"button"}
                className={
                    "p-2 border-2 rounded-md " +
                    "border-gray-300 hover:border-gray-500 focus:border-gray-500 "
                }
                onClick={() => setOpened(!opened)}
            >
                <Icon.Sidebar size={30} />
            </button>
        </>
    );
}