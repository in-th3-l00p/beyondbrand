"use client";

import {useContext, useEffect, useState} from "react";
import Loading from "@/app/brands/create/components/Loading";
import {useParams} from "next/navigation";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import {IInstagramPost} from "@/database/schema/instagramPost";
import PageTitle from "@/components/PageTitle";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import clsx from "clsx";
import {pageContainer} from "@/components/primitives";
import Toolbox from "@/app/brands/[id]/instagram/[postId]/components/Toolbox";
import Canvas from "@/app/brands/[id]/instagram/[postId]/components/Canvas";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/tools";
import Properties from "@/app/brands/[id]/instagram/[postId]/components/Properties";

export default function InstagramPost() {
    const { id, postId } = useParams<{ id: string, postId: string }>();
    const [loading, setLoading] = useState(true);

    const { brand } = useContext(BrandContext);
    const [post, setPost] = useState<IInstagramPost>({} as IInstagramPost);

    const [tool, setTool] = useState<Tools>(Tools.SELECT);
    const [color, setColor] = useState<string>("#000000");

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
            .catch(console.error)
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
                post, setPost,
                color, setColor
            }}
        >
            <div className={clsx(pageContainer(), "flex-grow flex flex-col")}>
                <PageTitle back={"/brands/" + brand._id}>Instagram post: {post.name}</PageTitle>
                <Toolbox />

                <div className="flex-grow flex gap-8">
                    <Canvas />
                    <Properties />
                </div>
            </div>
        </EditorContext.Provider>
    );
}