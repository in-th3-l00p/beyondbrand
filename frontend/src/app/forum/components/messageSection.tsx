'use client';
import TextareaAutosize from "react-textarea-autosize";
import { IPost, IMessage } from "@/app/forum/components/Post"; // Adjust the import path as needed
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import React from "react";

interface IMessageResponse {
    data: IMessage[];
}

export default function CommentSection({ post }: { post: IPost }) {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [textAreaContent, setTextAreaContent] = useState('');
    const [lastFetchData, setLastFetchData] = useState<IMessage[]>([]);

    async function fetchMessages(): Promise<IMessage[]> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/forum-post-messages?filters[forum_post][$eq]=${post.id}&sort=id:desc`, { cache: 'no-cache' });
        const messagesData: IMessageResponse = await response.json();
        return messagesData.data.map(message => ({
            id: message.id.toString(),
            attributes: {
                user: message.attributes.user,
                content: message.attributes.content,
                createdAt: message.attributes.createdAt
            }
        }));
    }

    useEffect(() => {
        fetchMessages().then(data => {
            setMessages(data);
            setLastFetchData(data);
        }).catch(error => {
            console.error("Error fetching messages:", error);
        });

        const intervalId = setInterval(async () => {
            try {
                const newData = await fetchMessages();
                if (JSON.stringify(newData) !== JSON.stringify(lastFetchData)) {
                    setMessages(newData);
                    setLastFetchData(newData);
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        }, 5000); // Check every 5 seconds

        return () => clearInterval(intervalId);
    }, [post.id, lastFetchData]);

    const postComment = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const dataObject = {
                data: {
                    user: 'Anonymous',
                    content: textAreaContent,
                    forum_post: post.id
                }
            };
            await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/forum-post-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject)
            });
            setTextAreaContent('');
            toast.success('Comment submitted successfully');
            const data = await fetchMessages();
            setMessages(data);
            setLastFetchData(data);
        } catch (error) {
            console.error("Error submitting message:", error);
        }
    };

    return (
        <div className="px-4 md:px-16 h-full">
            <h1 className="font-bold text-left text-4xl">{messages.length} {messages.length === 1 ? 'MESSAGE' : 'MESSAGES'}</h1>
            <div className="flex flex-col gap-4">
                <p className="text-2xl">Post a message</p>
                <TextareaAutosize
                    className="min-h-8 rounded-md bg-transparent border-b-2 w-full break-all outline-none"
                    placeholder="Your message here..."
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
            {messages.length === 0 ? (
                <div className="flex flex-col gap-4 shadow-md my-4 p-4 shadow-gray-700 rounded-xl">
                    <p className="text-2xl">No messages yet</p>
                </div>
            ) : (
                messages.map(message => (
                    <div key={message.id} className="flex flex-col gap-4 shadow-md my-4 p-4 shadow-gray-700 rounded-xl">
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <p className="text-2xl text-center font-bold">Name:</p>
                                <p className="text-2xl">{message.attributes.user}</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-2xl text-center font-bold">Date:</p>
                                <p className="text-2xl">{message.attributes.createdAt.substring(0, 10).replace(/-/g, '.')}</p>
                            </div>
                        </div>
                        <hr className="w-full rounded-xl" style={{ border: "1px solid gray" }} />
                        <p className="text-2xl">{message.attributes.content}</p>
                    </div>
                ))
            )}
        </div>
    );
}
