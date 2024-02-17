import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import TopNav from "@/components/top-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | YM Light",
    default: "YM Light",
  },
  description:
    "YM Lights are always made by experts with over 30 years of experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <TopNav />
        <div className="pt-14">{children}</div>
      </body>
    </html>
  );
}
