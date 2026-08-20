import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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

// IranYekan is not on Google Fonts — it must be sourced from Panah or a
// licensed distributor and self-hosted via next/font/local. Until that file
// is available, --font-iranyekan is left undefined and globals.css falls
// back to a system Persian-capable stack. See src/app/fonts/README.md.

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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-plaster text-ink">
        {children}
      </body>
    </html>
  );
}
