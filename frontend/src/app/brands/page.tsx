import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import Brand, {IBrand} from "@/database/schema/brand";
import Image from "next/image";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

function BrandDisplay({ brand }: { brand: IBrand }) {
    return (
        <Link
            href={"/brands/" + brand._id}
            className={clsx(
                "flex flex-col md:flex-row gap-8 rounded-md p-4 bg-ghost-white rounded-md shadow-md",
                "hover:shadow-xl hover:scale-105 transition-all w-full"
            )}
        >
            <Image
                src={brand.logo} alt={"logo"}
                width={200} height={200}
                className={"rounded-md w-[200px] h-[200px]"}
            />
            <div>
                <h2 className={"text-3xl font-bold"}>{brand.name}</h2>
                <p>{brand.description}</p>
            </div>
        </Link>
    );
}

export default async function Page() {
    const session = await getServerSession(authOptions);
    if (session === null)
        return redirect("/login");

    const brands = await Brand.find({
        owner: session.user.id
    });

    return (
        <section className={pageContainer()}>
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                <PageTitle>Your brands:</PageTitle>
                <Link href={"/brands/create"} className="btn">Add brand</Link>
            </div>

            <div className="flex flex-col gap-8 items-center justify-between">
                {brands.map(brand => (
                    <BrandDisplay
                        key={brand._id}
                        brand={brand}
                    />
                ))}
            </div>
        </section>
    );
}
