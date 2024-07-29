import {auth} from "express-oauth2-jwt-bearer";

const auth0 =
    auth({
            audience: process.env.AUTH0_AUDIENCE,
            issuerBaseURL: process.env.AUTH0_ISSUER,
            // tokenSigningAlg: "RS256",
    });

export default auth0;