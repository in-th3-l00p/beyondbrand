'use client'
import axios from "axios";
import {IPost} from "@/app/blog/components/Post";
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Image from "next/image";
import * as Icon from "react-feather";
import Link from "next/link";

export default function Page()
{
    const [post, setPost] = useState<IPost[]>([]);
    const { slug } = useParams();
    useEffect(() => {
        // Axios request to fetch data
        axios.get(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts?filters[slug][$eq]=${slug}&populate=banner`)
            .then(response => {
                // Set the data state with the response data
                console.log(response.data.data)
                setPost(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to ensure useEffect only runs once
    const src = post[0]
        ? `${process.env.NEXT_PUBLIC_CMS_URL!}${post[0].attributes.banner.data.attributes.url!}`
        : ''; // default value when post[0] is not yet available
    return (
        <section className={"py-8 responsive-px bg-gray-100 h-full"}>
            <div className={"px-16 items-center"}>
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <p className={"text-4xl font-bold"}>{post.length > 0 ? post[0].attributes.title : 'Loading...'}</p>
                    <Link href={"/blog/posts"} className={"btn w-full md:w-auto"}>
                        <Icon.ArrowLeft className={"mx-auto"}/>
                    </Link>
                </div>
                <p className={"text-center mb-4 text-3xl"}>{post.length > 0 ? post[0].attributes.heading : 'Loading...'}</p>
                <div className={"flex mb-4 gap-4 flex-col md:flex-row"}>
                    <p className={"text-left text-2xl text-justify"}>{post.length > 0 ? post[0].attributes.opening : 'Loading...'}</p>
                    <Image src={src} width={400} height={600} alt={"post banner"}/>
                </div>
                <p className={"text-center mb-4 text-2xl"}>{post.length > 0 ? post[0].attributes.subHeading : 'Loading...'}</p>
                <p className={"text-left text-justify text-2xl"}>{post.length > 0 ? post[0].attributes.content : 'Loading...'}</p>
            </div>
        </section>
    )
}