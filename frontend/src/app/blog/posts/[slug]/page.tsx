import Image from "next/image";
import * as Icon from "react-feather";
import Link from "next/link";
import CommentSection from "@/app/blog/components/commentSection";
import {notFound} from "next/navigation";
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
        `${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts?filters[slug][$eq]=${slug}&populate=banner`,
        { cache: "no-cache" }
    );

    const posts = await postsResponse.json();
    return posts.data[0];
};

export default async function Page({ params }: Props) {
    const post = await fetchPost(params.slug);
    if (!post)
        notFound();
    const src = `${process.env.NEXT_PUBLIC_CMS_URL!}${post.attributes.banner.data.attributes.url!}`;

    return (
        <section className={clsx(pageContainer(),"h-full")}>
            <div className="md:px-16 items-center py-8">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <p className="text-4xl font-bold">{post.attributes.title}</p>
                    <Link href="http://localhost:3000/blog/posts" className="btn w-full md:w-auto">
                        <Icon.ArrowLeft className="mx-auto" />
                    </Link>
                </div>
                <p className="text-center mb-4 text-3xl">{post.attributes.heading}</p>
                <div className="flex mb-4 gap-16 flex-col md:flex-row">
                    <p className="indent-8 text-2xl text-justify">{post.attributes.opening}</p>
                    <Image src={src} width={400} height={400} alt="post banner" className={"rounded-md"} />
                </div>
                <p className="text-center mb-4 text-2xl">{post.attributes.subHeading}</p>
                <p className="indent-8 text-justify text-2xl">{post.attributes.content}</p>
            </div>
            <hr className="w-full rounded-xl my-16" style={{ border: "1px solid gray" }} />
            <CommentSection post={post} />
        </section>
    );
}
