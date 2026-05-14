import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import LogoutSuccessToast from "@/components/shared/navbar/LogoutSuccessToast";
import LoginSuccessToast from "@/components/shared/navbar/LoginSuccessToast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Global Enterprise App",
  description: "global enterprise app sticker ribbon printer ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
     <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
           <Suspense fallback={null}>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                 {children}
                 <Toaster position="top-right" richColors></Toaster>
                 <LoginSuccessToast />
                 <LogoutSuccessToast />
              </ThemeProvider>
           </Suspense>
        </body>
     </html>
  );
}
