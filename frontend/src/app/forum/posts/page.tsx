import Post, {IPost} from "@/app/forum/components/Post";
import * as Icon from 'react-feather';
import Link from "next/link";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

export default async function Page() {
    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/forum-posts`, { cache: 'no-cache' });
    const posts: { data: IPost[] } = await postsResponse.json();

    return (
        <section className={clsx(pageContainer(),"h-screen")}>
            <div className="responsive-px flex justify-between items-center py-8">
                <h1 className="font-bold text-left text-4xl mb-4">Forum</h1>
                <Link href={"http://localhost:3000/forum/posts/create"} className={"btn"}><Icon.Plus/></Link>
            </div>

            {posts.data && (
                <>
                    {posts.data.reverse().map(item => (
                        <Post post={item}/>
                    ))}
                </>
            )}
        </section>
    )
}