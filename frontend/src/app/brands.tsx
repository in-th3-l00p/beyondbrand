import {getServerSession} from "next-auth";
import brandService from "@/service/brandService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import {IBrand} from "@/database/schema/brand";
import Image from "next/image";

function Brand({ brand }: { brand: IBrand }) {
    return (
        <Link
            href={"/brands/" + brand._id}
            className={"flex gap-8"}
        >
            <Image
                src={brand.logo} alt={"logo"}
                width={300} height={300}
            />
            <div>
                <h3>{brand.name}</h3>
                <p>{brand.description}</p>
            </div>
        </Link>
    );
}

export default async function Brands() {
    const session = await getServerSession();
    const brands = await brandService.getAll();

    return (
        <section className={"py-8 responsive-px"}>
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <PageTitle>Your brands:</PageTitle>
                <Link href={"/brands/create"} className="btn">Add brand</Link>
            </div>

            <div className="flex flex-wrap gap-4 items-center justify-between">
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
