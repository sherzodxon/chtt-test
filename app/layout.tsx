import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "CHTT Test",
  description: "CHTT Test — o‘quvchilar uchun onlayn test",
};

export const viewport: Viewport = {
  themeColor: "#1278b8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="uz" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
