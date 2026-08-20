import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// YekanBakh — variable font, client-supplied. Replaces the earlier
// IranYekan placeholder plan (see fonts/README.md) now that a real file
// exists. Single variable-weight file covers the full range.
const yekanBakh = localFont({
  variable: "--font-iranyekan",
  src: "./fonts/YekanBakh-VF.woff",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "پناه | گروه ساختمانی پناه",
    template: "%s | پناه",
  },
  description:
    "گروه ساختمانی پناه — ساخت و ساز، مشارکت، بازسازی و طراحی در رشت و حومه.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${fraunces.variable} ${inter.variable} ${yekanBakh.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-plaster text-ink">
        {children}
      </body>
    </html>
  );
}
