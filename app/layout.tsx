import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Noto_Serif_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
const siteName = "maya-fortune";
const defaultTitle = "maya-fortune | KINとマヤ暦で読む運勢鑑定";
const description =
  "生年月日からマヤ暦ツォルキンのKIN番号・太陽の紋章・銀河の音を導き、今月・今年〜来年の運勢、人生のバイオリズム、運命の人、節目年を鑑定します。";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: defaultTitle,
    template: "%s | maya-fortune",
  },
  description,
  applicationName: siteName,
  keywords: [
    "マヤ暦",
    "ツォルキン",
    "KIN",
    "占い",
    "運勢",
    "太陽の紋章",
    "銀河の音",
    "運命の人",
    "バイオリズム",
    "鑑定",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName,
    title: defaultTitle,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf7f2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${notoSerifJP.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
