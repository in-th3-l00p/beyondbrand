import Post, {IPost} from "@/app/blog/components/Post";

export default async function Page() {

    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts`,{ cache: 'no-cache' });

    const posts : IPost[] = await postsResponse.json();

    await console.log(posts)

    return (
        <section className={"py-8 responsive-px bg-gray-100 h-screen"}>
            <div className={"px-4 items-center"}>
                <h1 className="font-bold text-left text-4xl mb-4">Blog Posts</h1>
            </div>
            {posts.data.map(item => {
                console.log(item)
                return (
                    <Post post={item}/>
                )
            })}
        </section>
    )
}