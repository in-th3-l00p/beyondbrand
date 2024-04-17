import {getServerSession} from "next-auth";
import brandService from "@/service/brandService";
import Link from "next/link";

export default async function Brands() {
    const session = await getServerSession();
    const brands = await brandService.getAll();

    console.log(brands);

    return (
        <section className={"py-8 responsive-px"}>
            <div className="flex flex-wrap gap-4 items-center justify-between">
                <h1 className={"text-4xl font-bold"}>Your brands:</h1>
                <Link href={"#"} className="btn">Add brand</Link>
            </div>
        </section>
    );
}
