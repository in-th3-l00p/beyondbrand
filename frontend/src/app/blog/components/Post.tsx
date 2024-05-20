import Link from "next/link";
import {notFound} from "next/navigation";
import Image from "next/image";

export interface IPost {
    id: string;
    attributes: {
        title: string;
        heading: string;
        opening: string;
        banner: {
            data: {
                attributes: {
                    url: string;
                };
            };
        };
        subHeading: string;
        content: string;
        slug: string;
    };
}

export interface IComment {
    id: string;
    attributes: {
        name: string;
        content: string;
        createdAt: string; // Ensure createdAt is here
    };
}

export interface ICommentWOdata {
    id: string;
    attributes: {
        name: string;
        content: string;
        createdAt: string; // Ensure createdAt is here
    };
}

export default async function Post({post}: { post:IPost  }) {
    if (!post)
        notFound();
    const src = `${process.env.NEXT_PUBLIC_CMS_URL!}${post.attributes.banner.data.attributes.url!}`;
    return (
        <Link href={"/blog/posts/" + post.attributes.slug}>
            <div className="py-4 responsive-px w-full mx-auto">
                <div className="bg-white overflow-hidden shadow-xl h-full
            sm:rounded-lg p-6 lg:p-8 border-b border-gray-200
            hover:shadow-2xl transition-all ">
                    <div className={"flex justify-between"}>
                        <div className={"w-2/3"}>
                            <h1 className="text-2xl font-bold">{post.attributes.title}</h1>
                            <p className="text-xl">{post.attributes.heading}</p>
                            <p className={"text-lg truncate"}>{post.attributes.opening}</p>
                        </div>
                        <Image src={src} alt={"banner"} width={100} height={100} className={"rounded-md"}/>
                    </div>
                </div>
            </div>
        </Link>
    )
}