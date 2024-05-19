import Post from "@/app/forum/components/Post";
import {IPost} from "@/app/forum/components/Post";

export default async function Page() {
    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/forum-posts`, { cache: 'no-cache' });
    const posts: { data: IPost[] } = await postsResponse.json();
    await console.log(posts);

    return (
        <section className="py-8 container mx-auto h-screen">
            <div className="responsive-px items-center">
                <h1 className="font-bold text-left text-4xl mb-4">Forum</h1>
            </div>
            {posts.data.map(item => (
                <Post post={item}/>
            ))}
        </section>
    )
}