import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PPID SEKRETARIAT DPRD PROVINSI JAWA TENGAH",
  description: "Portal Resmi Pelayanan Informasi Publik Sekretariat DPRD Provinsi Jawa Tengah",
  icons: {
    icon: "/logo-jateng.png",
    apple: "/logo-jateng.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}