import {getServerSession} from "next-auth";
import brandService from "@/service/brandService";
import Link from "next/link";
import PageTitle from "@/components/PageTitle";

export default async function Brands() {
    const session = await getServerSession();
    const brands = await brandService.getAll();

    return (
        <section className={"py-8 responsive-px"}>
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <PageTitle>Your brands:</PageTitle>
                <Link href={"/brands/create"} className="btn">Add brand</Link>
            </div>
        </section>
    );
}
