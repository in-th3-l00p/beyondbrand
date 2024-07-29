"use client";

import clsx from "clsx";
import Link from "next/link";
import {featureContainer, title} from "@/app/page";

function Plan({name, description, features, price, productId}: {
    name: string;
    description: string;
    features: string[];
    price: string;
    productId?: string;
}) {
    return (
        <div className={clsx(
            "flex flex-col justify-between max-w-sm mx-auto",
            "border-4 border-cyan p-8 rounded-lg shadow-md",
            "aspect-[1/1.5] bg-white",
            "hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out",
        )}>
            <div>
                <h3 className={clsx(
                    "text-4xl font-bold",
                    "pb-4 mb-4",
                    "border-b-2 border-b-cyan"
                )}>
                    {name}
                </h3>
                <p className={"mb-4"}>{description}</p>

                <ul className={"list-disc list-inside"}>
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>
            <div className={"flex flex-col gap-2 items-center"}>
                <p className={"text-2xl font-bold"}>{price}</p>
                {productId ? (
                    <button
                        type={"button"}
                        onClick={localStorage.getItem("token") ? () => {
                            fetch(`${process.env.NEXT_PUBLIC_API}/api/payment/checkout`, {
                                method: "POST",
                                headers: {
                                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                                    "Content-Type": "application/json",
                                    "Accept": "application/json"
                                },
                                body: JSON.stringify({product: productId})
                            })
                                .then(resp => resp.json())
                                .then(data => window.location.href = data.url);
                        } : () => window.location.href = "/api/auth/login"}
                        className={"btn"}
                    >
                        Get started
                    </button>
                ) : (
                    <Link href={"/api/auth/login"} className={"btn"}>
                        Get started
                    </Link>
                )}
            </div>
        </div>
    );
}

export function Pricing({page = false}: { page?: boolean }) {
    return (
        <div className={"pb-24"}>
            <h2 className={clsx(title(), "text-center mb-8")}>Pricing</h2>

            {page && (
                <p className={"text-center mb-8 text-xl"}>
                    We have the perfect plan for you, no matter if you are just starting your business, or if you are a
                    big company.
                    <br/>
                    Choose the plan that fits your needs, and start building your brand today.
                </p>
            )}

            <div className={featureContainer()}>
                <Plan
                    name={"Free"}
                    description={"The free plan is perfect for people that are just starting their business, and want to get in touch with other entrepreneurs."}
                    features={["Forum access", "Profile creation"]}
                    price={"Free"}
                />

                <Plan
                    name={"Pro"}
                    description={"The pro plan is perfect for people that want to create, manage, and maintain their brand."}
                    features={["Brand creation", "Brand management", "Brand maintenance"]}
                    price={"$9.99/month"}
                    productId={"prod_QZ73ZfwdE3wq3G"}
                />

                <Plan
                    name={"Business"}
                    description={"The business plan is perfect for companies that want to create, manage, and maintain their brand."}
                    features={["Brand creation", "Brand management", "Brand maintenance", "Custom templates"]}
                    price={"$19.99/month"}
                    productId={"prod_QZ734PHQmkuYYm"}
                />
            </div>
        </div>
    );
}