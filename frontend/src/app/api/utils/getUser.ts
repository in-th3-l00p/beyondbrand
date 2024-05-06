import {getServerSession, Session} from "next-auth";
import User from "@/database/schema/user";

export default async function getUser(session: Session) {
    if (!session.user)
        throw new Error("Unauthenticated");
    let user;
    try {
        user = await User.findOne({
            email: session.user.email
        });
    } catch (e) {
        throw new Error("Unauthenticated");
    }
    if (user === null)
        throw new Error("Unauthenticated");
    return user;
}