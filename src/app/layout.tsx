import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientNavbarWrapper from "@/components/layout/ClientNavbarWrapper";
import CleanBodyAttributes from "@/components/CleanBodyAttributes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediBook - Doctor Appointment System",
  description: "Book appointments with the best doctors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body 
        className="bg-gray-50 min-h-screen"
        suppressHydrationWarning={true} // Add this line
      >
        <CleanBodyAttributes />
        <ClientNavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}