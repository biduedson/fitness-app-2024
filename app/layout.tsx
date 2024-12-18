import type { Metadata } from "next";
import { Oswald, Roboto } from "next/font/google";
import { UsersProvider } from "./_context/userContext";
import "./globals.css";
//components
import { Toaster } from "@/components/ui/sonner";

import AuthProvider from "@/app/_providers/auth";
import { SessionProvider } from "next-auth/react";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Fitness App",
  description: "Developed by EGAdesign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-primary-300">
      <body
        className={`${oswald.variable} ${roboto.variable} w-full max-w-[1920px] min-h-full mx-auto bg-primary-300 `}
      >
        <AuthProvider>
          <UsersProvider>
            <AuthProvider>{children}</AuthProvider>
          </UsersProvider>

          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
