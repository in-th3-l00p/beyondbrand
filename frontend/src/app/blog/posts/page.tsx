import Post, { IPost, IPostWOdata } from "@/app/blog/components/Post";

export default async function Page() {
    const postsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts`, { cache: 'no-cache' });
    const posts: { data: IPost[] } = await postsResponse.json();

    const transformedPosts: IPostWOdata[] = posts.data.map(post => ({
        id: post.data.id,
        attributes: {
            title: post.data.attributes.title,
            heading: post.data.attributes.heading,
            opening: post.data.attributes.opening,
            banner: post.data.attributes.banner,
            subHeading: post.data.attributes.subHeading,
            content: post.data.attributes.content,
            slug: post.data.attributes.slug
        }
    }));

    return (
        <section className="py-8 container mx-auto h-screen">
            <div className="px-4 items-center">
                <h1 className="font-bold text-left text-4xl mb-4">Blog Posts</h1>
            </div>
            {transformedPosts.map(item => (
                <Post key={item.id} post={item} />
            ))}
        </section>
    );
}
