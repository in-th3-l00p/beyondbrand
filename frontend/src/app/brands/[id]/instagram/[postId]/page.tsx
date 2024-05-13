"use client";

import {useEffect, useState} from "react";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import Loading from "@/app/brands/create/components/Loading";
import {useParams} from "next/navigation";
import {IBrand} from "@/database/schema/brand";

export default function InstagramPost() {
    const { id, postId } = useParams<{ id: string, postId: string }>();
    const [loading, setLoading] = useState(true);

    const [brand, setBrand] = useState<IBrand>({} as IBrand);
    const [tool, setTool] = useState<Tools>(Tools.SELECT);

    // todo: better error handling
    useEffect(() => {
        const load = async () => {
            const brandResponse = await fetch(`/api/brands/${id}`);
            if (!brandResponse.ok)
                console.error("error");
            const brand = await brandResponse.json();
            setBrand(brand);
        }

        load()
            .finally(() => setLoading(false));
    }, [id, postId]);

    if (loading)
        return (
            <Loading />
        )
    return (
        // <EditorContext.Provider
        //     value={{
        //         tool,
        //         setTool
        //     }}
        // >
            <div className={"flex-grow bg-white flex"}>
            </div>
        // </EditorContext.Provider>
    );
}