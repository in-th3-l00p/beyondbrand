"use client";

import {useEffect, useState} from "react";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import Loading from "@/app/brands/create/components/Loading";
import {useParams} from "next/navigation";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import {IInstagramPost} from "@/database/schema/instagramPost";

export default function InstagramPost() {
    const { id, postId } = useParams<{ id: string, postId: string }>();
    const [loading, setLoading] = useState(true);

    const [post, setPost] = useState<IInstagramPost>({} as IInstagramPost);
    const [tool, setTool] = useState<Tools>(Tools.SELECT);

    // todo: better error handling
    useEffect(() => {
        const load = async () => {
            const postResponse = await fetch(`/api/brands/${id}/instagram/${postId}`, {
                cache: "no-cache"
            });
            if (!postResponse.ok)
                console.error("error");
            const post = await postResponse.json();
            setPost(post);
        }

        load()
            .finally(() => setLoading(false));
    }, [id, postId]);

    if (loading)
        return (
            <Loading />
        )
    return (
        <EditorContext.Provider
            value={{
                tool, setTool,
                post, setPost
            }}
        >
            <div className={"flex-grow bg-white flex"}>
            </div>
        </EditorContext.Provider>
    );
}