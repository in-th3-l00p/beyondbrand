"use client";

import {panel, panelTitle} from "@/app/brands/[id]/components/components";
import React, {useEffect} from "react";
import * as Icon from "react-feather";
import Link from "next/link";
import {useParams} from "next/navigation";
import {IInstagramPost} from "@/database/schema/instagramPost";

export default function InstagramPosts() {
    const { id } = useParams<{ id: string; }>();
    const [posts, setPosts] = React.useState<IInstagramPost[]>([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        if (!id)
            return;
        fetch(`/api/brands/${id}/instagram`)
            .then(resp => resp.json())
            .then(posts => {
                setPosts(posts);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className={panel() + " col-span-2"}>
            <h2 className={panelTitle()}>Instagram posts</h2>

            <div
                className={
                    "grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 " +
                    "justify-center items-center"
                }
            >
                {posts.map((post, index) => (
                    <Link
                        href={`/brands/${id}/instagram/${post._id}`}
                        key={index}
                        className={
                            "bg-white rounded-md shadow-md " +
                            "flex flex-col justify-center items-center aspect-video " +
                            "hover:bg-dark-ghost-white hover:shadow-xl transition-all"
                        }
                    >
                        <div className={"p-4"}>
                            <p className={"text-sm text-center"}>{post.name}</p>
                        </div>
                    </Link>

                ))}

                <Link
                    href={`/brands/${id}/instagram/create`}
                    type={"button"}
                    className={
                        "bg-white rounded-md shadow-md " +
                        "flex flex-col justify-center items-center aspect-video " +
                        "hover:bg-dark-ghost-white hover:shadow-xl transition-all"
                    }
                >
                    <Icon.Plus/>
                </Link>
            </div>
        </div>
    );
}