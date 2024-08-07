import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {tv} from "tailwind-variants";
import {getSession} from "@auth0/nextjs-auth0";
import {pageContainer} from "@/components/primitives";
import {Pricing} from "@/components/pricing";

const gradientText = tv({
    base: "bg-clip-text bg-gradient-to-br from-cyan to-tomato text-transparent"
})

async function Hero() {
    const session = await getSession();
    return (
        <div className={"grid grid-rows-2 grid-cols-1 md:grid-rows-1 md:grid-cols-2 gap-8 py-24"}>
            <Image
                src={"/logo.svg"} alt={"logo"}
                width={300}
                height={300}
                className={"justify-self-center md:justify-self-end md:col-start-2 row-start-1"}
            />

            <div className={
                "flex flex-col justify-center items-center gap-16 " +
                "sm:col-start-1 row-start-2 md:row-start-1 "
            }>
                <h1
                    className={clsx(
                        "text-6xl",
                        "font-bold text-center",
                        gradientText()
                    )}
                >
                    BeyondBrand
                </h1>
                <p className={"text-center mb-8 text-3xl"}>Build the branding of your business ventures faster, and
                    easier, than ever</p>

                <div className={"flex gap-4 flex-wrap justify-center"}>
                    <Link
                        href={"/about"}
                        className={"btn"}
                    >
                        Find more
                    </Link>
                    {session ? (
                        <Link
                            href={"/brands"}
                            className={"btn"}
                        >
                            Your brands
                        </Link>
                    ) : (
                        <Link
                            href={"/api/auth/login"}
                            className={"btn"}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}

function Feature({ icon, iconAlt, title, description }: {
    icon: string;
    iconAlt: string;
    title: string;
    description: string;
}) {
    return (
        <div className={"flex flex-col justify-center items-center"}>

            <div className="rounded-full bg-white p-4 border-4 border-cyan mb-4">
                <Image
                    src={icon} alt={iconAlt}
                    width={60}
                    height={60}
                />
            </div>

            <div className={"flex flex-col text-center"}>
                <h3 className={"text-2xl font-bold"}>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export const title = tv({
    base: clsx("text-6xl font-bold")
});

export const subtitle = tv({
    base: clsx("text-4xl font-bold", gradientText())
});

export const featureContainer = tv({
    base: "grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
});


function Networking() {
    return (
        <div className={"pb-12"}>
            <h3 className={subtitle()}>
                Networking
            </h3>
            <p className={"text-lg"}>
                We are offering the perfect place to get in touch with other entrepreneurs, and business owners, to help you grow your business.
            </p>

            <div className={featureContainer()}>
                <Feature
                    icon={"/icons/landing/forum.svg"} iconAlt={"create"}
                    title={"Forum"}
                    description={"Publish your ideas, ask for help, and get in touch with other entrepreneurs in our forum. You can also find partners for your business, and get feedback on your ideas."}
                />

                <Feature
                    icon={"/icons/landing/presentation.svg"} iconAlt={"manage"}
                    title={"Present yourself"}
                    description={"Create a profile where you show everything that you've done, all your achivement, and your goals. You can also add your social media links, and your website."}
                />

                <Feature
                    icon={"/icons/landing/search.svg"} iconAlt={"maintain"}
                    title={"Search for partners"}
                    description={"Search for partners for your business, and find people that can help you grow your business. You can also find investors, and people that can help you with your marketing."}
                />
            </div>
        </div>
    );
}

function BrandCreation() {
    return (
        <div className={"py-12"}>
            <h3 className={subtitle()}>
                Brand Management
            </h3>
            <p className={"text-lg"}>
                BeyondBrand is offering you everything you need to create, manage, and maintain your brand, in the fastest way imaginable.
            </p>

            <div className={featureContainer()}>
                <Feature
                    icon={"/icons/landing/create.svg"} iconAlt={"create"}
                    title={"Create your brand"}
                    description={"Create your brand with our brand builder. You can choose from a variety of templates, colors, and fonts to create your brand."}
                />

                <Feature
                    icon={"/icons/landing/manage.svg"} iconAlt={"manage"}
                    title={"Manage your brand"}
                    description={"Manage your brand with our brand manager. You can edit your brand, change colors, fonts, and templates."}
                />

                <Feature
                    icon={"/icons/landing/fix.svg"} iconAlt={"maintain"}
                    title={"Maintain your brand"}
                    description={"Maintain your brand with our brand maintainer. You can keep track of your brand, see how it is doing, and make changes to improve it."}
                />
            </div>
        </div>
    );
}

function Features() {
    return (
        <div className={"mb-24 mt-12"}>
            <h2 className={clsx(title(), "text-center mb-8")}>Features</h2>

            <Networking />
            <BrandCreation />
        </div>
    );
}

export default async function Page() {
    return (
        <section className={clsx(pageContainer(),
            " w-full flex-grow",
        )}>
            <div className="container mx-auto">
                <Hero />
                <Features />
                <Pricing />
            </div>
        </section>
    );
}
