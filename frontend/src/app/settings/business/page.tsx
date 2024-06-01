'use client'
import React from "react";
import Container from "@/app/settings/components/Container";
import PageTitle from "@/app/settings/components/PageTitle";
import SectionTitle from "@/app/settings/components/SectionTitle";
import SectionContainer from "@/app/settings/components/SectionContainer";
import Image from "next/image";
import {button} from "@/components/primitives";
import Business from "@/app/interfaces/Business";
import {useSession} from "next-auth/react";
import Loading from "@/app/brands/create/components/Loading";
import User from "@/app/interfaces/User";
import Modal from "@/components/Modal";

export default function Page() {
    const {data: session, status, update} = useSession();

    const [emailModal, setEmailModal] = React.useState(false);

    const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        image: 'https://example.com/john-doe.jpg',
        business: {
            id: 1,
            name: 'Doe Enterprises',
            emails: [
                {
                    address: 'info@doe-enterprises.com',
                    usage: 'business'
                },
                {
                    address: 'support@doe-enterprises.com',
                    usage: 'support'
                }
            ],
            logo: 'https://lh3.googleusercontent.com/a/ACg8ocKifEOaZQ_bX3J3PCmrcFkx4QP8_vmTqWNGq_Gb999uKEMSBUT3=s96-c',
            worldwide: true,
            countries: ['USA', 'Canada'],
            phones: ['+1-202-555-0172', '+1-202-555-0189'],
            website: 'https://doe-enterprises.com',
            metrics: [
                {
                    year: 2020,
                    revenue: 1000000,
                    profit: 200000,
                    debt: 50000,
                    long_term_assets: 300000,
                    short_term_assets: 200000,
                    equity: 500000,
                    employees: 50
                },
                {
                    year: 2021,
                    revenue: 1200000,
                    profit: 250000,
                    debt: 40000,
                    long_term_assets: 350000,
                    short_term_assets: 250000,
                    equity: 550000,
                    employees: 60
                }
            ]
        }
    };

    if (status === "loading" || !session)
        return <Loading/>
    //
    // const user2 = session.user as User;
    // const business = user2.business as Business;

    return (
        <Container>
            <Modal setShow={setEmailModal} show={emailModal} title={"Email Usage"} showX={false}>

            </Modal>
            <PageTitle title={"Your Business"}/>
            <SectionTitle title={"Your Logo"}/>
            <SectionContainer>
                <div
                    className={"flex md:flex-row flex-col w-full items-center md:items-start gap-4 md:gap-0 md:justify-between mb-4"}>
                    {user.business?.logo ? <Image src={user.business.logo} alt={"profile picture"} width={100} height={100}
                                             className={"rounded-full"}/>
                        :
                        <div className={"w-20 h-20 rounded-full bg-gray-300"}></div>}
                    <div className={"flex gap-4 md:gap-8 items-center my-auto"}>
                        {user.business?.logo ?
                            <>
                                <button className={"px-8 py-2 text-lg text-dark-gray h-min"}>Remove</button>
                                <button className={button() + "h-min"}>Change Logo</button>
                            </>
                            :
                            <button className={button()}>Add Logo</button>
                        }
                    </div>
                </div>
            </SectionContainer>
            <SectionTitle title={"Name"}/>
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    {
                        user.business?.name ?
                            <>
                                <p className={"text-center md:text-left mb-4 md:mb-0"}>{user.business?.name}</p>
                                <button className={button()}>Edit</button>
                            </>
                            :
                            <>
                                <input className={"input w-1/2"} type="text" placeholder={"Business Name"}/>
                                <button className={button()}>Add Name</button>
                            </>
                    }
                </div>
            </SectionContainer>
            <SectionTitle title={"Email"}/>
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    {
                        user.business?.emails ?
                            <>
                                <div>
                                    {
                                        user.business.emails.map(email =>
                                            <div className={"flex gap-4"}>
                                                <p className={"text-center md:text-left mb-4 md:mb-0"}>{email.address}</p>
                                                <p>-</p>
                                                <p className={"text-center md:text-left mb-4 md:mb-0"}>{email.usage}</p>
                                            </div>
                                        )
                                    }
                                </div>
                                <button className={button()} onClick={() => setEmailModal(true)}>Edit</button>
                            </>
                            :
                            <>
                                <p className={"text-center md:text-left mb-4 md:mb-0"}>You don't have any emails saved</p>
                                <button className={button()}>Add Name</button>
                            </>
                    }
                </div>
            </SectionContainer>
        </Container>
    )
}