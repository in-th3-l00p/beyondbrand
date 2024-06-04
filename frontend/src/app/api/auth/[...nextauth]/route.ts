import NextAuth, {AuthOptions} from 'next-auth';
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/database/mongo";
import {Adapter} from "next-auth/adapters";

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/database/schema/user";
import bcrypt from "bcrypt";
import Amqp from "streaming";
import {EventType} from "streaming/src/event";
import logger from "@/utils/logger";

export const authOptions : AuthOptions = {
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    callbacks: {
        jwt({ token, trigger, session}) {
            if (trigger === "update" && session?.name)
                token.name = session.name
            if (trigger === "update" && session?.email)
                token.email = session.email
            return token
        },
        session: ({ session, token }) => {
            session.user.id = token.sub!;
            return session;
        },
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.JWT_SECRET!,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: {  label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials)
                    return null;
                const user = await User.findOne({ email: credentials.username });
                if (!user)
                    return null;
                if (!(await bcrypt.compare(credentials.password, user.password)))
                    return null;
                return user;
            }
        })
    ],
    events: {
        createUser: (user) => {
            logger.info(`User ${user.user.id} created.`);
            Amqp.getInstance().publish({
                type: EventType.USER_CREATED,
                data: user.user
            });
        },
        updateUser: (user) => {
            logger.info(`User ${user.user.id} updated.`);
            Amqp.getInstance().publish({
                type: EventType.USER_UPDATED,
                data: user.user
            });
        }
    }
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }