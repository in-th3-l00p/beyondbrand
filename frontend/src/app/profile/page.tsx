'use client'
import PageTitle from "@/components/PageTitle";
import {pageContainer} from "@/components/primitives";
import {useSession} from "next-auth/react"
import {useState} from "react";
import React from "react";
import toast from "react-hot-toast";
import Loading from "@/app/brands/create/components/Loading";

export default function Page() {
    const {data: session,status,update} = useSession();
    const [loading, setLoading] = useState(false);

    if (status === "loading" || !session || loading)
        return <Loading />
    return (
        <section className={pageContainer()}>
            <PageTitle>Welcome to your profile, {session.user!.name}</PageTitle>
            <div className={"flex"}>
                <form className={"w-1/2"} onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    setLoading(true);
                    fetch('/api/users', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: formData.get('name'),
                            email: formData.get('email'),
                        }),
                    })
                        .then(resp => resp.json())
                        .then(() => update({
                                name: formData.get('name'),
                                email: formData.get('email')
                        })
                        .then(() => toast.success("Profile updated successfully")))
                        .finally(() => setLoading(false));
                }}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className={"input"}
                        defaultValue={session.user!.name as string}
                    />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className={"input"}
                        defaultValue={session.user!.email as string}
                    />
                    <button type="submit" className={"btn"}>Save</button>
                </form>
                {/*{user.image*/}
                {/*    ? <Image src={user.image} alt={"profile picture"} height={400} width={400}/>*/}
                {/*    : <div className={"w-1/2"}>No profile picture</div>*/}
                {/*}*/}
            </div>
        </section>
    );
}