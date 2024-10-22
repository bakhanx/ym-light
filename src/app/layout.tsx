import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import TopNav from "@/components/top-navigation";
import Footer from "@/components/footer";
import ChatFloatingButtonContainer from "@/components/chat-floating-button-container";

// const inter = Inter({ subsets: ["latin"] });

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});

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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${noto_sans_kr.className}`}>
        <TopNav />
        <div className="">
          {/* <div className="pt-36  sm:pt-20"> */}
          {children} {modal}
        </div>

        <ChatFloatingButtonContainer />

        <Footer />
      </body>
    </html>
  );
}
