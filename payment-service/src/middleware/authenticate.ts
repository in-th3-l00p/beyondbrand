import {auth} from "express-oauth2-jwt-bearer";
import {NextFunction, Request, Response} from "express";

export const checkJwt =
    auth({
        audience: process.env.AUTH0_AUDIENCE,
        issuerBaseURL: process.env.AUTH0_ISSUER,
        // tokenSigningAlg: "RS256",
    });

export type User = {
    sub: string;
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
}

export interface AuthenticatedRequest extends Request {
    user?: User;
}

export const getUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const resp = await fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
        headers: {
            Authorization: req.headers.authorization!,
        },
    });

    if (!resp.ok)
        return res.status(401).end();

    req.user = await resp.json();
    next();
}
