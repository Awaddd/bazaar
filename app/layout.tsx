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
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.png" type="image/png" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function() {
                                try {
                                    const stored = localStorage.getItem('theme');
                                    const theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                                    if (theme === 'dark') {
                                        document.documentElement.classList.add('dark');
                                    }
                                } catch (e) {}
                            })();
                        `,
                    }}
                />
            </head>
            <body className={`antialiased`}>
                <div className={cn("min-h-screen max-w-[100rem] mx-auto flex flex-col pb-10 xl:pb-4 px-4 lg:px-8 xl:px-12 bg-background text-foreground", theme)}>
                    <Providers>
                        <Header />
                        {children}
                    </Providers>
                </div>
            </body>
        </html>
    );
}
