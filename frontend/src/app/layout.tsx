import type {Metadata} from "next";
import {Tilt_Neon} from "next/font/google";
import "./globals.scss";
import React from "react";
import Header from "@/app/layout/Header";
import "@/database/mongoose";
import NextAuthSessionProvider from "@/app/layout/NextAuthSessionProvider";
import {Toaster} from "react-hot-toast";

const inter = Tilt_Neon({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "BeyondBrand",
    description: "Branding generator webapp",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className + " min-h-screen overflow-x-hidden flex flex-col"}>
                <NextAuthSessionProvider>
                    <Header/>
                    <Toaster/>
                    {children}
                </NextAuthSessionProvider>
            </body>
        </html>
    );
}
