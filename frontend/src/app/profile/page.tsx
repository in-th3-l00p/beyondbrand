'use client'
import { useState, ChangeEvent, FormEvent } from 'react';
import clsx from 'clsx';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { pageContainer } from "@/components/primitives";


export default function Page() {
    const { user, isLoading } = useUser();
    const [name, setName] = useState(user?.name ?? '');
    const [email, setEmail] = useState(user?.email ?? '');

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const onNameSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Name submitted:', name);
    }

    const onEmailSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Email submitted:', email);
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }

    const pfpUrl = user?.picture ?? '';
    const profilePicture = (url: string | undefined) => {
        if (!url) return '';
        return url.replace('s96-c', 's400-c');
    }

    return (
        <section className={clsx(pageContainer(), 'flex flex-col gap-16')}>
            <div className={"flex flex-col md:flex-row gap-8"}>
                <div className={clsx('space-y-8 md:w-1/2')}>
                    <h1 className="text-6xl font-bold">Your Profile</h1>
                    <p className="text-xl">
                        This is your profile page. You can see your personal information here.
                    </p>
                    <form className={clsx('flex gap-8')} onSubmit={onNameSubmit}>
                        <input
                            className={clsx('input')}
                            type="text"
                            value={name}
                            onChange={onNameChange}
                        />
                        <button className={clsx('btn')} type="submit">Change</button>
                    </form>
                    <form className={clsx('flex gap-8')} onSubmit={onEmailSubmit}>
                        <input
                            className={clsx('input')}
                            type="text"
                            value={email}
                            onChange={onEmailChange}
                        />
                        <button className={clsx('btn')} type="submit">Change</button>
                    </form>
                </div>
                <div className={"flex flex-col gap-8 mx-auto"}>
                    <Image src={profilePicture(pfpUrl)} alt={"profile picture"}
                           className={clsx("rounded-md mx-auto w-fit")}
                           width={200} height={100}
                    />
                    <div className={"mx-auto"}>
                        <button className={clsx('btn')} type="submit">Change</button>
                    </div>
                </div>
            </div>
            <div
                className="grid mx-4 sm:mx-20 lg:mx-52 2xl:mx-12 grid-cols-1 md:grid-cols-3 2xl:flex 2xl:justify-center gap-16 items-center 2xl:items-start">
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-ghost-white rounded-xl shadow-md shadow-gray-500/50">
                        <div className="px-4 py-4 flex flex-col h-full justify-between">
                            <p className="text-2xl text-center 2xl:text-4xl">Number of Brands</p>
                            <p className="text-2xl text-center 2xl:text-4xl font-bold">4</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-ghost-white rounded-xl shadow-md shadow-gray-500/50">
                        <div className="px-4 py-4 flex flex-col h-full justify-between">
                            <p className="text-2xl text-center 2xl:text-4xl">Number of Posts</p>
                            <p className="text-2xl text-center 2xl:text-4xl font-bold">4</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-80 h-40 bg-ghost-white rounded-xl shadow-md shadow-gray-500/50">
                        <div className="px-4 py-4 flex flex-col h-full justify-between">
                            <p className="text-2xl text-center 2xl:text-4xl">Number of Comments</p>
                            <p className="text-2xl text-center 2xl:text-4xl font-bold">8</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
