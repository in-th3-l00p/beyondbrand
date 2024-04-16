import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function redirectWhenAuthenticated() {
    const session = await getServerSession(authOptions);
    if (session)
        redirect("/");
}