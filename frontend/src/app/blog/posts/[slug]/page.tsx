'use client'
import axios from "axios";
import {IPost,IComment} from "@/app/blog/components/Post";
import React, {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import Image from "next/image";
import * as Icon from "react-feather";
import Link from "next/link";
import TextareaAutosize from 'react-textarea-autosize';

export default function Page()
{
    const [post, setPost] = useState<IPost[]>([]);
    const [comments, setComments] = useState<IComment[]>([]);
    const [textAreaContent, setTextAreaContent] = useState("");
    const { slug } = useParams();
    const fetchComments = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/comments?filters[post][$eq]=${post[0]?.id}&sort=id:desc`)
            .then(response => {
                setComments(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
    const postComment = async () => {
        try {
            const dataObject = {
                data: {
                    name: 'Anonymous',
                    content: textAreaContent,
                    post: post[0].id
                }
            };
            await axios.post('http://localhost:1337/api/comments', dataObject)
            setTextAreaContent("");
            fetchComments(); // Fetch comments after posting
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };
    useEffect(() => {
// Axios request to fetch data
        axios.get(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts?filters[slug][$eq]=${slug}&populate=banner`)
            .then(response => {
                console.log(response.data.data)
                setPost(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    useEffect(() => {
        fetchComments(); // Fetch comments on component mount or when 'post' changes
    }, [post]);
    const src = post[0]
        ? `${process.env.NEXT_PUBLIC_CMS_URL!}${post[0].attributes.banner.data.attributes.url!}`
        : ''; // default value when post[0] is not yet available
    return (
        <section className={"py-8 px-4 md:px-16 bg-gray-100 h-full"}>
            <div className={"md:px-16 items-center"}>
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
                <div>

                </div>
            </div>
            <hr className={"w-full rounded-xl my-4"}
                style={{border: "1px solid gray"}}/>
            <div className={"px-4 md:px-16 h-full"}>
                <h1 className="font-bold text-left text-4xl">{comments.length} {comments.length === 1 ? 'COMMENT' : 'COMMENTS'}</h1>
                <div className={"flex flex-col gap-4"}>
                    <p className={"text-2xl"}>Post a comment</p>
                    <TextareaAutosize
                        type="text"
                        className={"min-h-8 rounded-md bg-transparent border-b-2 w-full break-all outline-none"}
                        value={textAreaContent}
                        onChange={(e) => setTextAreaContent(e.target.value)}
                    />
                </div>
                <div className={"flex justify-end gap-4 my-4"}>
                    {textAreaContent && (
                        <>
                            <button className={"text-xl px-4 "} onClick={() => setTextAreaContent('')}>Cancel</button>
                            <button className={"text-xl px-6 py-2 rounded-3xl bg-[#30BCED]"} onClick={postComment}>Submit</button>
                        </>
                    )}
                </div>
                {comments.map(comment => {
                    return (
                        <div className={"flex flex-col gap-4 shadow-md my-4 p-4 shadow-gray-700 rounded-xl"}>
                            <div className={"flex justify-between"}>
                                <div className={"flex flex-col"}>
                                    <p className={"text-2xl text-center font-bold"}>Name:</p>
                                    <p className={"text-2xl"}>{comment.attributes.name}</p>
                                </div>
                                <div className={"flex flex-col"}>
                                    <p className={"text-2xl text-center font-bold"}>Date:</p>
                                    <p className={"text-2xl"}>{comment.attributes.createdAt.substring(0, 10).replace(/-/g, '.')}</p>
                                </div>
                            </div>
                            <hr className={"w-full rounded-xl"}
                                style={{border: "1px solid gray"}}/>
                            <p className={"text-2xl"}>{comment.attributes.content}</p>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}