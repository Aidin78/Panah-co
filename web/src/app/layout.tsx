import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// YekanBakh — variable font, client-supplied. The single font used across
// the entire site (headlines, body, UI) per client decision — Fraunces and
// Inter were dropped.
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
      className={`${yekanBakh.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-plaster text-ink">
        {children}
      </body>
    </html>
  );
}
