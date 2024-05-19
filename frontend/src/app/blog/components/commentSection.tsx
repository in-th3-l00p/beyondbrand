'use client';
import TextareaAutosize from "react-textarea-autosize";
import { IPost, ICommentWOdata, IComment } from "@/app/blog/components/Post"; // Adjust the import path as needed
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import React from "react";

interface ICommentsResponse {
    data: IComment[];
}

export default function CommentSection({ post }: { post: IPost }) {
    const [comments, setComments] = useState<ICommentWOdata[]>([]);
    const [textAreaContent, setTextAreaContent] = useState('');

    async function fetchComments() {
        const commentsResponse = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/comments?filters[post][$eq]=${post.id}&sort=id:desc`, { cache: 'no-cache' });
        const commentsData: ICommentsResponse = await commentsResponse.json();
        const transformedComments: ICommentWOdata[] = commentsData.data.map(comment => ({
            id: comment.id.toString(),  // Ensure id is a string
            attributes: {
                name: comment.attributes.name,
                content: comment.attributes.content,
                createdAt: comment.attributes.createdAt
            }
        }));
        console.log(transformedComments);
        setComments(transformedComments);
    }

    useEffect(() => {
        fetchComments().catch(error => {
            console.error("Error fetching comments:", error);
        });
    }, [post]);

    const postComment = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const dataObject = {
                data: {
                    name: 'Anonymous',
                    content: textAreaContent,
                    post: post.id
                }
            };
            await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject)
            });
            setTextAreaContent('');
            toast.success('Comment submitted successfully');
            await fetchComments();
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
        <div className="px-4 md:px-16 h-full">
            <h1 className="font-bold text-left text-4xl">{comments.length} {comments.length === 1 ? 'COMMENT' : 'COMMENTS'}</h1>
            <div className="flex flex-col gap-4">
                <p className="text-2xl">Post a comment</p>
                <TextareaAutosize
                    className="min-h-8 rounded-md bg-transparent border-b-2 w-full break-all outline-none"
                    placeholder="Your comment here..."
                    value={textAreaContent}
                    onChange={(e) => setTextAreaContent(e.target.value)}
                />
            </div>
            <div className="flex justify-end gap-4 my-4">
                {textAreaContent !== '' && (
                    <>
                        <button className="text-xl px-4 " onClick={() => setTextAreaContent('')}>Cancel</button>
                        <button className="text-xl px-6 py-2 rounded-3xl bg-[#30BCED]" onClick={postComment}>Submit</button>
                    </>
                )}
            </div>
            {comments.length === 0 ? (
                    <p className="text-2xl">No comments yet</p>
            ) : (
                comments.map(comment => (
                    <div key={comment.id} className="flex flex-col gap-4 shadow-md my-4 p-4 shadow-gray-700 rounded-xl">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-2xl text-center font-bold">Name:</p>
                                <p className="text-2xl">{comment.attributes.name}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-2xl text-center font-bold">Date:</p>
                                <p className="text-2xl">{comment.attributes.createdAt.substring(0, 10).replace(/-/g, '.')}</p>
                            </div>
                        </div>
                        <hr className="w-full rounded-xl" style={{ border: "1px solid gray" }} />
                        <p className="indent-8 text-2xl">{comment.attributes.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}
