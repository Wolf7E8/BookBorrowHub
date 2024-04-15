import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookBorrowHub",
  description:
    "Connect with fellow book lovers to exchange your favorite reads! Chat with other users, borrow books, and discover new literary adventures. Join our community today and dive into a world of shared stories and endless possibilities.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <link rel="icon" href="favicon.svg" />
      <body className={inter.className}>
        <main className="flex h-screen flex-col items-center">
          <SessionProvider session={session}>{children}</SessionProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
