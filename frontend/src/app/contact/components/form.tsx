'use client';
import {ChangeEvent, FormEvent, useState} from "react";
import toast from "react-hot-toast";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
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

            await fetch(`${process.env.NEXT_PUBLIC_CMS_URL!}/api/contact-forms`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObject),
                cache: 'no-cache'
            });

            toast.success("Form submitted successfully!");
            // Optionally, clear the form fields after successful submission
            setFormData({
                name: "",
                email: "",
                phone: "",
                message: ""
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            // Handle error appropriately, e.g., display error message to the user
        }
    };
return (
    <form className={"w-full md:w-1/2 flex flex-col"} onSubmit={handleSubmit}>
        <label htmlFor={"name"} className={"mt-4"}>Name</label>
        <input
            type="text"
            id="name"
            name="name"
            className={"input"}
            value={formData.name}
            onChange={handleChange}
            max={255}
            required
        />
        <div className={"flex gap-8"}>
            <div className={"w-1/2 flex flex-col justify-end"}>
                <label htmlFor={"email"} className={"mt-4"}>Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className={"input"}
                    value={formData.email}
                    onChange={handleChange}
                    max={255}
                    required
                />
            </div>
            <div className={"w-1/2 flex flex-col justify-end"}>
                <label htmlFor={"phone"} className={"mt-4"}>Phone Number</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    className={"input"}
                    value={formData.phone}
                    onChange={handleChange}
                    max={15}
                    min={9}
                    required
                />
            </div>
        </div>
        <label htmlFor={"message"} className={"mt-4"}>Message</label>
        <textarea
            id="message"
            name="message"
            className={"input"}
            value={formData.message}
            onChange={handleChange}
            maxLength={10000}
            required
            rows={7}
        />
        <button className={"btn mt-4"}>Submit</button>
    </form>
)
}