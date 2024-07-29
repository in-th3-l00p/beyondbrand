"use client"

import {useEffect} from "react";

export default function LocalStorageToken({ token }: {token?: string}) {
    useEffect(() => {
        if (token)
            localStorage.setItem("token", token);
    }, []);
    return <></>
}