import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";

export default async function isAuthenticated() {
    const session = await getServerSession();
    if (!session)
        return {
            error: NextResponse.json({ error: "Unauthenticated" }, { status: 401 }),
            session
        }

    return {
        error: null,
        session
    }
}