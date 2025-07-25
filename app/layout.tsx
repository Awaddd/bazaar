import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { Theme } from "@/types/types";
import Providers from "@/lib/Providers";

export const metadata: Metadata = {
    title: "Bazaar",
    description: "Marketplace for you",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const theme: Theme = "light"

    return (
        <html lang="en">
            <body className={`antialiased`}>
                <div className={cn("min-h-screen flex flex-col pb-10 xl:pb-4 px-4 lg:px-8 xl:px-12 bg-background text-foreground", theme)}>
                    <Providers>
                        <Header />
                        {children}
                    </Providers>
                </div>
            </body>
        </html>
    );
}
