import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import { ThemeProvider } from "./theme-provider";
import { Analytics } from "@vercel/analytics/react"


const pop = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});



export const metadata: Metadata = {
  title: "ProjectX",
  description: "Get ideas for your next programming project",
  openGraph: {
    title: "ProjectX",
    description: "Get ideas for your next programming project",
    url: "https://projectx.deepanshumishra.me/",
    siteName: "ProjectX",
    images: [
      {
        url: "https://phh5ur14gr.ufs.sh/f/a1wYTWuoYzdPdo2hLfbDpNhUzQ65Fwl2XgETcm0G4JHvi3eM",
        width: 1230,
        height: 630,
        alt: "ProjectX"
      }
    ]
  }
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
        <Analytics />
      </body>
    </html>
  );
}
