/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'beyondbrand-storage.s3.eu-north-1.amazonaws.com'],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "beyondbrand-storage.s3.eu-north-1.amazonaws.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "3000",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "cms.beyondbrand.pro",
                port: "",
                pathname: "/**"
            },
        ]
    }
};

export default nextConfig;