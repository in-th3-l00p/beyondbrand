"use client";

import {useEffect, useState} from "react";
import {button} from "@/components/primitives";

export default function SubscriptionManager() {
    const token = localStorage.getItem('token');
    const [subscriptions, setSubscriptions] = useState(null);

    useEffect(() => {
        if (!token) return;
        fetch(`${process.env.NEXT_PUBLIC_API}/api/payment/subscription`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(resp => resp.json())
            .then(data => setSubscriptions(data));
    }, []);

    if (!token || !subscriptions)
        return <></>;
    return (
        <div className={"flex justify-between items-center gap-4 flex-wrap"}>
            <p>You have an active subscription</p>
            <button
                type={"button"} className={button()}
                onClick={() => {
                    fetch(`${process.env.NEXT_PUBLIC_API}/api/payment/portal`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    })
                        .then(resp => resp.json())
                        .then(data => window.location.href = data.url);
                }}
            >
                Manage
            </button>
        </div>
    )
}