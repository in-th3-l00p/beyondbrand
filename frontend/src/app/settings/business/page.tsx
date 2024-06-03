'use client'
import React from "react";
import Container from "@/app/settings/components/Container";
import PageTitle from "@/app/settings/components/PageTitle";
import SectionTitle from "@/app/settings/components/SectionTitle";
import SectionContainer from "@/app/settings/components/SectionContainer";
import Image from "next/image";
import { button } from "@/components/primitives";
import { useSession } from "next-auth/react";
import Loading from "@/app/brands/create/components/Loading";
import User from "@/app/interfaces/User";
import Modal from "@/components/Modal";
import * as Icon from "react-feather";

export default function Page() {
    const { data: session, status } = useSession();

    const [emailModal, setEmailModal] = React.useState(false);
    const [selectedEmail, setSelectedEmail] = React.useState({ address: '', usage: '' });
    const [editEmail, setEditEmail] = React.useState(false);
    const [addEmail, setAddEmail] = React.useState(false);

    const handleEmailClick = (email) => {
        setSelectedEmail(email);
        setEditEmailFormData(email)
    };

    const isEmailSelected = (email) => {
        return selectedEmail.address === email.address;
    }

    const [editEmailFormData, setEditEmailFormData] = React.useState({
        address: '',
        usage: ''
    });
    const [addEmailFormData, setAddEmailFormData] = React.useState({
        address: '',
        usage: ''
    });

    const handleEmailChange = (e) => {
        setEditEmailFormData({
            ...editEmailFormData,
            [e.target.name]: e.target.value
        });
    }

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log(editEmailFormData);
        // Implement the necessary logic to handle the form submission here
        // For example, you could send the data to an API endpoint
        setEmailModal(false);
    }

    const handleAddEmailChange = (e) => {
        setAddEmailFormData({
            ...addEmailFormData,
            [e.target.name]: e.target.value
        });
    }
    const [phoneModal, setPhoneModal] = React.useState(false);
    const [selectedPhone, setSelectedPhone] = React.useState({ number: '', usage: '' });
    const [editPhone, setEditPhone] = React.useState(false);
    const [addPhone, setAddPhone] = React.useState(false);

    const handlePhoneClick = (phone) => {
        setSelectedPhone(phone);
        setEditPhoneFormData(phone)
    };

    const isPhoneSelected = (phone) => {
        return selectedPhone.number === phone.number;
    }

    const [editPhoneFormData, setEditPhoneFormData] = React.useState({
        number: '',
        usage: ''
    });
    const [addPhoneFormData, setAddPhoneFormData] = React.useState({
        number: '',
        usage: ''
    });

    const handlePhoneChange = (e) => {
        setEditPhoneFormData({
            ...editPhoneFormData,
            [e.target.name]: e.target.value
        });
    }

    const handlePhoneSubmit = (e) => {
        e.preventDefault();
        console.log(editPhoneFormData);
// Implement the necessary logic to handle the form submission here
// For example, you could send the data to an API endpoint
        setPhoneModal(false);
    }

    const handleAddPhoneChange = (e) => {
        setAddPhoneFormData({
            ...addPhoneFormData,
            [e.target.name]: e.target.value
        });
    }

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
            countries: [],
            phones: [
                {number:'+1-202-555-0172',
                usage: 'business'},
                {number:'+1-202-555-0189',
                usage: 'support'}
            ],
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
        return <Loading />

    return (
        <>
        <Container>
            <Modal setShow={setEmailModal} show={emailModal} title={"Email Usage"} showHeader={false}>
                <div>
                    <div className={"w-full flex justify-between items-end gap-4"}>
                        <div className={"flex justify-between w-full p-4 border-b border-black"}>
                            <h1 className={"text-2xl"}>Email</h1>
                            <h1 className={"text-2xl hidden md:block"}>Usage</h1>
                            <div className={"flex md:hidden items-center gap-4"}>
                                <button type="button" onClick={() => {
                                    setEditEmail(!editEmail)
                                    setAddEmail(false)
                                }}>
                                    Edit
                                </button>
                                <Icon.Plus onClick={() => {
                                    setAddEmail(!addEmail)
                                    setEditEmail(false)
                                    setSelectedEmail({address: '', usage: ''})
                                }}
                                />
                            </div>
                        </div>
                        <div className={"hidden md:flex justify-between w-full p-4 border-b border-black"}>
                            <button type="button" onClick={() => {
                                setEditEmail(!editEmail)
                                setAddEmail(false)
                            }}>
                                Edit
                            </button>
                            <Icon.Plus onClick={() => {
                                setAddEmail(!addEmail)
                                setEditEmail(false)
                                setSelectedEmail({ address: '', usage: '' })
                            }}
                            />
                        </div>
                    </div>
                    <div className={"w-full flex md:flex-row flex-col justify-between items-start gap-4 border-b border-black"}>
                        <div className={"flex flex-col w-full py-4 md:p-4"}>
                            {
                                user.business?.emails.map(email =>
                                    <div
                                        key={email.address}
                                        className={`flex justify-between gap-4 cursor-pointer  rounded-md ${isEmailSelected(email) ? 'bg-light-gray' : ''}`}
                                        onClick={() => handleEmailClick(email)}
                                    >
                                        <p className={"text-center md:text-left mb-4 md:mb-0"}>{email.address}</p>
                                        <p className={"text-center md:text-left mb-4 md:mb-0"}>{email.usage}</p>
                                    </div>
                                )
                            }
                        </div>
                        {
                            editEmail &&
                            <form className={"flex w-full flex-col justify-between min-h-64 p-4"} onSubmit={handleEmailSubmit}>
                                {selectedEmail.address && (
                                    <>
                                        <div className={'w-full space-y-4 cursor-pointer p-1 rounded-md'}>
                                            <input
                                                className={"input"}
                                                value={editEmailFormData.address}
                                                onChange={handleEmailChange}
                                                name={"address"}
                                            />
                                            <input
                                                className={"input"}
                                                value={editEmailFormData.usage}
                                                onChange={handleEmailChange}
                                                name={"usage"}
                                            />
                                        </div>
                                        <div className={"w-full flex justify-between items-center"}>
                                            <button type="submit" className={button()}>Done</button>
                                                <Icon.Trash/>
                                        </div>
                                    </>
                                    )}
                            </form>
                        }
                        {
                            addEmail &&
                                <form className={"flex w-full flex-col justify-between min-h-64 p-4"} onSubmit={handleEmailSubmit}>
                                    <div className={'w-full space-y-4 cursor-pointer p-1 rounded-md'}>
                                        <input
                                            className={"input"}
                                            value={addEmailFormData.address}
                                            onChange={handleAddEmailChange}
                                            name={"address"}
                                        />
                                        <input
                                            className={"input"}
                                            value={addEmailFormData.usage}
                                            onChange={handleAddEmailChange}
                                            name={"usage"}
                                        />
                                    </div>
                                    <div className={"w-full flex justify-between items-center"}>
                                        <button type="submit" className={button()}>Done</button>
                                        <Icon.Trash/>
                                    </div>
                                </form>
                        }
                    </div>
                    <div className={"flex justify-between w-full pt-4"}>
                        <button type="button" className={"px-4 py-2 text-lg text-dark-gray h-min"}
                                onClick={() => setEmailModal(false)}>Cancel
                        </button>
                        <button className={button()} type={"submit"}>Submit Changes</button>
                    </div>
                </div>
            </Modal>
            <Modal setShow={setPhoneModal} show={phoneModal} title={"Phone Usage"} showHeader={false}>
                <div>
                    <div className={"w-full flex justify-between items-end gap-4"}>
                        <div className={"flex justify-between w-full p-4 border-b border-black"}>
                            <h1 className={"text-2xl"}>Phone</h1>
                            <h1 className={"text-2xl hidden md:block"}>Usage</h1>
                            <div className={"flex md:hidden items-center gap-4"}>
                                <button type="button" onClick={() => {
                                    setEditPhone(!editPhone)
                                    setAddPhone(false)
                                }}>
                                    Edit
                                </button>
                                <Icon.Plus onClick={() => {
                                    setAddPhone(!addPhone)
                                    setEditPhone(false)
                                    setSelectedPhone({number: '', usage: ''})
                                }}
                                />
                            </div>
                        </div>
                        <div className={"hidden md:flex justify-between w-full p-4 border-b border-black"}>
                            <button type="button" onClick={() => {
                                setEditPhone(!editPhone)
                                setAddPhone(false)
                            }}>
                                Edit
                            </button>
                            <Icon.Plus onClick={() => {
                                setAddPhone(!addPhone)
                                setEditPhone(false)
                                setSelectedPhone({ number: '', usage: '' })
                            }}
                            />
                        </div>
                    </div>
                    <div className={"w-full flex md:flex-row flex-col justify-between items-start gap-4 border-b border-black"}>
                        <div className={"flex flex-col w-full py-4 md:p-4"}>
                            {
                                user.business?.phones.map(phone =>
                                    <div
                                        key={phone.number}
                                        className={`flex justify-between gap-4 cursor-pointer rounded-md ${isPhoneSelected(phone) ? 'bg-light-gray' : ''}`}
                                        onClick={() => handlePhoneClick(phone)}
                                    >
                                        <p className={"text-center md:text-left mb-4 md:mb-0"}>{phone.number}</p>
                                        <p className={"text-center md:text-left mb-4 md:mb-0"}>{phone.usage}</p>
                                    </div>
                                )
                            }
                        </div>
                        {
                            editPhone &&
                            <form className={"flex w-full flex-col justify-between min-h-64 p-4"} onSubmit={handlePhoneSubmit}>
                                {selectedPhone.number && (
                                    <>
                                        <div className={'w-full space-y-4 cursor-pointer p-1 rounded-md'}>
                                            <input
                                                className={"input"}
                                                value={editPhoneFormData.number}
                                                onChange={handlePhoneChange}
                                                name={"address"}
                                            />
                                            <input
                                                className={"input"}
                                                value={editPhoneFormData.usage}
                                                onChange={handlePhoneChange}
                                                name={"usage"}
                                            />
                                        </div>
                                        <div className={"w-full flex justify-between items-center"}>
                                            <button type="submit" className={button()}>Done</button>
                                            <Icon.Trash/>
                                        </div>
                                    </>
                                )}
                            </form>
                        }
                        {
                            addPhone &&
                            <form className={"flex w-full flex-col justify-between min-h-64 p-4"} onSubmit={handlePhoneSubmit}>
                                <div className={'w-full space-y-4 cursor-pointer p-1 rounded-md'}>
                                    <input
                                        className={"input"}
                                        value={addEmailFormData.address}
                                        onChange={handleAddPhoneChange}
                                        name={"address"}
                                    />
                                    <input
                                        className={"input"}
                                        value={addEmailFormData.usage}
                                        onChange={handleAddPhoneChange}
                                        name={"usage"}
                                    />
                                </div>
                                <div className={"w-full flex justify-between items-center"}>
                                    <button type="submit" className={button()}>Done</button>
                                    <Icon.Trash/>
                                </div>
                            </form>
                        }
                    </div>
                    <div className={"flex justify-between w-full pt-4"}>
                        <button type="button" className={"px-4 py-2 text-lg text-dark-gray h-min"}
                                onClick={() => setPhoneModal(false)}>Cancel
                        </button>
                        <button className={button()} type={"submit"}>Submit Changes</button>
                    </div>
                </div>
            </Modal>
            <PageTitle title={"Your Business"}/>
            <SectionTitle title={"Your Logo"}/>
            <SectionContainer>
                <div
                    className={"flex md:flex-row flex-col w-full items-center md:items-start gap-4 md:gap-0 md:justify-between mb-4"}>
                    {user.business?.logo ?
                        <Image src={user.business.logo} alt={"profile picture"} width={100} height={100}
                               className={"rounded-full"}/>
                        :
                        <div className={"w-20 h-20 rounded-full bg-gray-300"}></div>}
                    <div className={"flex gap-4 md:gap-8 items-center my-auto"}>
                        {user.business?.logo ?
                            <>
                                <button className={"px-8 py-2 text-lg text-dark-gray h-min"}>Remove</button>
                                <button className={button() + " h-min"}>Change Logo</button>
                            </>
                            :
                            <button className={button()}>Add Logo</button>
                        }
                    </div>
                </div>
            </SectionContainer>
            <SectionTitle title={"Name"} />
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
                                <input className={"input w-1/2"} type="text" placeholder={"Business Name"} />
                                <button className={button()}>Add Name</button>
                            </>
                    }
                </div>
            </SectionContainer>
            {
                user.business?.emails?.length === 1 ? <SectionTitle title={"Email"} />
                    :
                    <SectionTitle title={"Emails"} />
            }
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    {
                        user.business?.emails ?
                            <>
                                <div>
                                    {
                                        user.business.emails.map(email =>
                                            <div className={"flex w-full justify-between gap-4"} key={email.address}>
                                                <p className={"text-center md:text-left mb-4 md:mb-0"}>{email.address}</p>
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
                                <button className={button()}>Add Email</button>
                            </>
                    }
                </div>
            </SectionContainer>
            {
                user.business?.emails?.length === 1 ? <SectionTitle title={"Phone"} />
                    :
                    <SectionTitle title={"Phones"} />
            }
            <SectionContainer>
                <div className={"flex w-full md:flex-row flex-col justify-between mb-4"}>
                    {
                        user.business?.phones ?
                            <>
                                <div>
                                    {
                                        user.business.phones.map(phone =>
                                            <div className={"flex w-full justify-between gap-4"} key={phone.number}>
                                                <p className={"text-center md:text-left mb-4 md:mb-0"}>{phone.number}</p>
                                                <p className={"text-center md:text-left mb-4 md:mb-0"}>{phone.usage}</p>
                                            </div>
                                        )
                                    }
                                </div>
                                <button className={button()} onClick={() => setPhoneModal(true)}>Edit</button>
                            </>
                            :
                            <>
                                <p className={"text-center md:text-left mb-4 md:mb-0"}>You don't have any phones saved</p>
                                <button className={button()}>Add Email</button>
                            </>
                    }
                </div>
            </SectionContainer>
            <SectionTitle title={"Countries of operation"} />
            <SectionContainer>
                <div className={"mb-4 flex justify-between items-center"}>
                    { !user.business?.worldwide ? <>
                    {user.business?.countries?.length > 0 ?
                            user.business.countries?.map(country =>
                                <div key={country} className={"flex justify-between gap-4"}>
                                    <p>{country}</p>
                                    <button className={button()}>Remove</button>
                                </div>
                            )
                            :
                            <p>You haven't added any countries of operation</p>
                    }
                    </>
                        :
                        <p>Worldwide</p>
                    }
                    <button className={"btn"}>Edit</button>
                </div>
            </SectionContainer>
        </Container>
            <div className={"pl-6  mx-6  pb-6 overflow-x-hidden border border-black rounded-md mb-4"}>
a
            </div>
    </>
    )
}
