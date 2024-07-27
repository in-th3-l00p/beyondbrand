import Post, {IPost} from "@/app/blog/components/Post";
import PageTitle from "@/components/PageTitle";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

export default async function Page() {
    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts?populate=banner`, {cache: 'no-cache'});
    const posts: { data: IPost[] } = await postsResponse.json();

    return (
        <section className={clsx(pageContainer(),"container mx-auto h-screen")}>
            <PageTitle back={"/"}>Blog posts:</PageTitle>
            {posts.data && (
                <>
                    {posts.data.map(item => (
                        <Post post={item}/>
                    ))}
                </>
            )}
        </section>
    );
}
