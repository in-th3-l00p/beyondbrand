import {handleAuth, handleLogin, handleLogout} from "@auth0/nextjs-auth0";

export const GET = handleAuth({
    login: handleLogin({
        authorizationParams: {
            audience: "http://localhost:8000"
        }
    }),
    logout: handleLogout({
        returnTo: `${process.env.AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}`,
    })
});