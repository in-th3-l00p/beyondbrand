import Post, {IPost} from "@/app/blog/components/Post";
import PageTitle from "@/components/PageTitle";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";
import Link from "next/link";
import * as Icon from "react-feather";

export default async function Page() {
    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts?populate=banner`, {cache: 'no-cache'});
    const posts: { data: IPost[] } = await postsResponse.json();

    return (
        <section className={clsx(pageContainer(), "container mx-auto h-screen")}>
            <div className="responsive-px flex justify-between items-center">
            <h1 className="font-bold text-left text-4xl mb-4">Blog</h1>
            <Link href={"https://beyondbrand.pro"} className={"btn"}><Icon.ArrowLeft/></Link>
        </div>
    {
        posts.data && (
            <>
                {posts.data.map(item => (
                    <Post post={item}/>
                ))}
            </>
        )
    }
</section>
)
    ;
}
