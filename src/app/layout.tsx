import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import Footer from "@/components/footer";
import ChatFloatingButtonContainer from "@/components/chat-floating-button-container";
import TopNavigation from "@/components/top-navigation";
import getSession from "@/utils/session";

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

type RootLayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<RootLayoutProps>) {
  const session = await getSession();
  console.log("session Id : ", session.id);

  return (
    <html lang="en">
      <body className={`${noto_sans_kr.className}`}>
        <TopNavigation userId={session.id} />
        <div className="">
          {children} {modal}
        </div>
        <ChatFloatingButtonContainer />
        <Footer />
      </body>
    </html>
  );
}
