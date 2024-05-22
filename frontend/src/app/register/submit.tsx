"use server";

import z, {ZodIssue} from "zod";
import User from "@/database/schema/user";
import {redirect} from "next/navigation";
import bcrypt from "bcrypt";

const userSchema = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(255),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
})

export default async function submit(
    prevState: any, formData: FormData
): Promise<{ errors: ZodIssue[] }> {
    const user = userSchema.safeParse(Object.fromEntries(formData));
    if (!user.success)
        return {
            errors: user.error.errors
        };

    if (user.data.password !== user.data.confirmPassword)
        return {
            errors: [{
                code: "custom",
                path: ["confirmPassword"],
                message: "Password do not match"
            }]
        };

    if ((await User.find({email: user.data.email})).length > 0) {
        return {
            errors: [{
                code: "custom",
                path: ["email"],
                message: "Email already in use"
            }]
        };
    }

    try {
        await User.create({
            email: user.data.email,
            name: user.data.name,
            password: await bcrypt.hash(user.data.password, 10)
        });
    } catch (e) {
        throw e;
    }

    redirect("/login?registered");
}
