import type { Metadata } from "next";
import { Cormorant_Garamond, Marck_Script, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const marck = Marck_Script({
  variable: "--font-marck",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://denis-elizaveta.vercel.app"
  ),
  title: "Денис и Елизавета — 8 июля 2027",
  description:
    "Приглашение на свадьбу Дениса и Елизаветы. 8 июля 2027, усадьба «Рыжий кот».",
  openGraph: {
    title: "Денис и Елизавета — свадьба 8 июля 2027",
    description:
      "Приглашаем вас разделить с нами этот день — усадьба «Рыжий кот», прибытие к 16:00.",
    images: [{ url: "/images/og.jpg", width: 1920, height: 1005 }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Денис и Елизавета — свадьба 8 июля 2027",
    description: "Приглашаем вас разделить с нами этот день.",
    images: ["/images/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${cormorant.variable} ${marck.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
