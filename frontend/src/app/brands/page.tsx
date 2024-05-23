import brandService from "@/service/brandService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {IBrand} from "@/database/schema/brand";
import Image from "next/image";
import {pageContainer} from "@/components/primitives";
import clsx from "clsx";

function Brand({ brand }: { brand: IBrand }) {
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
    const brands = await brandService.getAll();

    return (
        <section className={pageContainer()}>
            <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                <PageTitle>Your brands:</PageTitle>
                <Link href={"/brands/create"} className="btn">Add brand</Link>
            </div>

            <div className="flex flex-col gap-8 items-center justify-between">
                {brands.map(brand => (
                    <Brand
                        key={brand._id}
                        brand={brand}
                    />
                ))}
            </div>
        </section>
    );
}
