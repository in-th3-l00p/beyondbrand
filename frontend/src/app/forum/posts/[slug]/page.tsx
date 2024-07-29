import * as Icon from "react-feather";
import Link from "next/link";
import MessageSection from "@/app/forum/components/messageSection";
import React from "react";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

interface Props {
    params: {
        slug: string;
    };
}

const fetchPost = async (slug: string) => {
    const postsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL!}/api/forum-posts?filters[slug][$eq]=${slug}&populate=banner`,
        {cache: "no-cache"}
    );

    await console.log(postsResponse);

    const posts = await postsResponse.json();
    return posts.data[0];
};

export default async function Page({params}: Props) {
    const post = await fetchPost(params.slug);
    return (
        <section className={clsx(pageContainer(),"min-h-screen bg-gray-100 h-full")}>
            <div className="md:px-16 items-center">
                <div className="flex flex-wrap justify-between items-center gap-8 mb-4">
                    <p className="text-4xl font-bold">{post.attributes.title}</p>
                    <Link href="http://localhost:3000/forum/posts" className="btn w-full md:w-auto">
                        <Icon.ArrowLeft className="mx-auto"/>
                    </Link>
                    <p className="text-justify text-2xl">{post.attributes.content}</p>
                </div>
            </div>
            <hr className="w-full rounded-xl my-8" style={{border: "1px solid gray"}}/>
            <MessageSection post={post} />
        </section>
    );
}
