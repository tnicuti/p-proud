import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";
import { ChatProvider } from "@/components/chat/ChatWidget";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { site } from "@/content/site";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const fullTitle = `P-Proud – ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: fullTitle, template: "%s · P-Proud" },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "P-Proud",
    title: fullTitle,
    description: site.description,
    images: [{ url: "/mascot/logo.png", width: 900, height: 343, alt: "P-Proud" }],
  },
  icons: { icon: "/mascot/pipi-main.png" },
};

export const viewport: Viewport = { themeColor: "#970A1D" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${baloo.variable} ${nunito.variable}`}>
      <body>
        <a
          href="#noi-dung"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
        >
          Bỏ qua menu
        </a>
        <ChatProvider>
          <DemoBanner />
          <Header />
          <main id="noi-dung">{children}</main>
          <Footer />
        </ChatProvider>
      </body>
    </html>
  );
}
