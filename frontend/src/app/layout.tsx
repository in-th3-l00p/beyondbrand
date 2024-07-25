import type {Metadata} from "next";
import {Tilt_Neon} from "next/font/google";
import "./globals.scss";
import React from "react";
import Header from "@/components/layout/Header";
import "@/database/mongoose";
import {Toaster} from "react-hot-toast";
import Amqp from "streaming";
import logger from "@/utils/logger";
import Footer from "@/components/layout/Footer";
import {UserProvider} from "@auth0/nextjs-auth0/client";

const inter = Tilt_Neon({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "BeyondBrand",
    description: "Branding generator webapp",
};

export default async function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    if (!Amqp.isInitialized())
        await Amqp.initializeFromEnv(logger);
    return (
        <html lang="en">
            <body className={inter.className + " min-h-screen overflow-x-hidden flex flex-col"}>
                <UserProvider>
                   <div className="min-h-screen">
                      <Header/>
                      <Toaster/>
                      {children}
                   </div>
                  <Footer />
                </UserProvider>
            </body>
        </html>
    );
}
