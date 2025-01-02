import type { Metadata } from "next";
import {   Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./theme-provider";


const pop = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});



export const metadata: Metadata = {
  title: "ProjectX",
  description: "Get ideas for your next programming project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pop.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
