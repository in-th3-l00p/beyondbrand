"use client";

import {useContext, useEffect, useState} from "react";
import Loading from "@/app/brands/create/components/Loading";
import {useParams, useRouter} from "next/navigation";
import EditorContext from "@/app/brands/[id]/instagram/[postId]/components/EditorContext";
import {IInstagramPost, Shape} from "@/database/schema/instagramPost";
import PageTitle from "@/components/PageTitle";
import BrandContext from "@/app/brands/[id]/components/BrandContext/BrandContext";
import clsx from "clsx";
import {pageContainer} from "@/components/primitives";
import Toolbox from "@/app/brands/[id]/instagram/[postId]/components/Toolbox";
import Canvas from "@/app/brands/[id]/instagram/[postId]/components/Canvas";
import {Tools} from "@/app/brands/[id]/instagram/[postId]/components/tools";
import Properties from "@/app/brands/[id]/instagram/[postId]/components/Properties";
import Layers from "@/app/brands/[id]/instagram/[postId]/components/Layers";
import {useUser} from "@auth0/nextjs-auth0/client";

export default function InstagramPost() {
    const router = useRouter();
    const { id, postId } = useParams<{ id: string, postId: string }>();
    const [loading, setLoading] = useState(true);

    const { user, isLoading } = useUser();
    const { brand } = useContext(BrandContext);
    const [post, setPost] = useState<IInstagramPost | null>(null);

    const [tool, setTool] = useState<Tools>(Tools.SELECT);
    const [color, setColor] = useState<string>("#000000");
    const [selectedShape, setSelectedShape] = useState<Shape | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    // todo: better error handling
    useEffect(() => {
        if (isLoading)
            return;

        const load = async () => {
            const postResponse = await fetch(`/api/brands/${id}/instagram/${postId}`, {
                cache: "no-cache"
            });
            if (!postResponse.ok) {
                router.push("/brands/" + id);
                return;
            }
            const post = await postResponse.json();
            if (!post) {
                router.push("/brands/" + id);
                return;
            }
            setPost(post);
        }

        load()
            .finally(() => setLoading(false));
    }, [id, postId, isLoading]);

    useEffect(() => {
        if (!brand || !post)
            return;
        fetch(`/api/brands/${brand._id}/instagram/${post._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(post)
        })
            .then(resp => resp.json());
    }, [brand, post]);


    if (loading || !post || !brand)
        return (
            <Loading />
        )
    return (
        <EditorContext.Provider
            value={{
                tool, setTool,
                post, setPost,
                color, setColor,
                selectedShape, setSelectedShape,
                selectedIndex, setSelectedIndex
            }}
        >
            <div className={clsx(pageContainer(), "flex-grow flex flex-col px-4 lg:px-4 2xl:px-4")}>
                <PageTitle back={"/brands/" + brand._id}>Instagram post: {post.name}</PageTitle>
                <Toolbox />

                <div className="flex-grow flex gap-8 max-h-[750px]">
                    <Layers />
                    <Canvas />
                    <Properties />
                </div>
            </div>
        </EditorContext.Provider>
    );
}