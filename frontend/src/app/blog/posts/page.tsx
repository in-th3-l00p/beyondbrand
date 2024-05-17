'use client';
import React,{useState,useEffect} from "react";
import axios from "axios";
import {FormLabel} from "@/app/brands/create/components/FormLabel";
import Post, {IPost} from "@/app/blog/components/Post";
export default function Page() {
    const [item, setItem] = useState<IPost[]>([]);
    useEffect(() => {
        // Axios request to fetch data
        axios.get(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/posts?populate=banner`)
            .then(response => {
                // Set the data state with the response data
                console.log(response.data.data)
                setItem(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to ensure useEffect only runs once
    return (
        <section className={"py-8 responsive-px bg-gray-100 h-screen"}>
            <div className={"px-4 items-center"}>
                <h1 className="font-bold text-left text-4xl">Blog Posts</h1>
            </div>
            {item.map(item => {
                console.log(item)
                return (
                    <Post post={item}/>
                )
            })}
        </section>
    )
}