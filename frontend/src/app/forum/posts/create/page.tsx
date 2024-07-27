'use client';
import {ChangeEvent, FormEvent, useState} from "react";
import toast from "react-hot-toast";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

export default function Page() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        user: "Anonymous",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const dataObject = {
                data: {
                    ...formData
                }
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/forum-posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject),
                cache: 'no-cache'
            });

            toast.success("Form submitted successfully!");

            console.log(JSON.stringify(dataObject));
            // Optionally, clear the form fields after successful submission
            setFormData({
                title: "",
                content: "",
                user: "Anonymous",
            });

            window.location.href = '/forum/posts';

        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to submit the form. Please try again.");
        }
    };

    return (
        <section className={clsx(pageContainer())}>
            <h1 className="font-bold text-left text-4xl mb-4">Create forum post</h1>
            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="input"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        maxLength={255}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        name="content"
                        className="input"
                        required
                        value={formData.content}
                        onChange={handleChange}
                        maxLength={10000}
                        rows={10}
                    />
                </div>
                <div className="w-full justify-end flex">
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
        </section>
    );
}
