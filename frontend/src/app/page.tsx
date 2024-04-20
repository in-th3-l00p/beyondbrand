import {getServerSession} from "next-auth";
import Landing from "@/app/landing";
import Brands from "@/app/brands";

export default async function Home() {
    const session = await getServerSession();

    if (!session)
        return <Landing />
    return (
        <Brands />
    )
}
