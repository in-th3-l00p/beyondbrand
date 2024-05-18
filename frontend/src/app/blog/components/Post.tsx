import Link from "next/link";

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

export default function Post({post}: { post:IPost  }) {
    return (
        <Link href={"/blog/posts/" + post.attributes.slug}>
            <div className="py-2 max-w-7xl mx-auto">
                <div className="bg-white overflow-hidden shadow-xl h-full
            sm:rounded-lg p-6 lg:p-8 border-b border-gray-200
            hover:shadow-2xl transition-all ">
                    <h1 className=" text-2xl font-bold">{post.attributes.title}</h1>
                </div>
            </div>
        </Link>
    )
}