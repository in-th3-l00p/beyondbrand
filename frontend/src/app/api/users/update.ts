import {z} from 'zod';
import {NextResponse} from "next/server";
import isAuthenticated from "@/app/api/utils/isAuthenticated";
import getUser from "@/app/api/utils/getUser";


const updateBodySchema = z.object({
    name: z.string().max(255).min(1).optional(),
    email: z.string().max(255).min(1),
    image: z.string().optional(),
});

// todo codu e prost rau de tot sa muara familia mea ca reprezinta o vulnerabilitate pentru toata aplicatia
export async function PUT(req: Request){
    let body;
    try {
        body = updateBodySchema.safeParse(await req.json());
    } catch (e) {
        return NextResponse.json(
            {error: "Invalid request body"},
            {status: 400});
    }
    if (!body.success)
        return NextResponse.json(
            {error: body.error},
            {status: 400}
        );

    const {error, session} = await isAuthenticated();
    if (error)
        return error;

    const user = await getUser(session);
    if(!user)
        return NextResponse.json(
            {error: "User not found"},
            {status: 404}
        );

    if(body.data.name)
        user.name = body.data.name;
    if(body.data.email)
        user.email = body.data.email;
    if(body.data.image)
        user.image = body.data.image;

    await user.save();
    return NextResponse.json(user);
    // return NextResponse.json( await user.save());
}