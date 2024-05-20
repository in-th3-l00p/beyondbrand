import Link from "next/link";

export interface IPost {
    id: string;
    attributes: {
        title: string;
        content: string;
        user: string;
        slug: string;
    };
}

export interface IMessage {
    id: string;
    attributes: {
        content: string;
        createdAt: string;
        user: string;
    };
}
export default function Post({post}: { post:IPost  }) {
    return (
        <Link href={"/forum/posts/" + post.attributes.slug}>
            <div className="py-4 responsive-px w-full mx-auto">
                <div className="bg-white flex justify-between overflow-hidden shadow-xl h-full
            sm:rounded-lg p-6 lg:p-8 border-b border-gray-200
            hover:shadow-2xl transition-all ">
                    <div className={"w-2/3"}>
                        <h1 className="text-2xl font-bold">{post.attributes.title}</h1>
                        <p className="text-2xl truncate">{post.attributes.content}</p>
                    </div>
                    <p className={"text-2xl"}>created by {post.attributes.user}</p>
                </div>
            </div>
        </Link>
    )
}