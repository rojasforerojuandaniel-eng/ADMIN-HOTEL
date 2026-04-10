import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RHYNODE NEXUS | Sistema SaaS de Gestión Hotelera Premium",
  description: "RHYNODE NEXUS es el Sistema SaaS de Gestión Hotelera más avanzado del mundo. Diseñado para cadenas de lujo, aplica la Teoría General de Sistemas con IA, IoT y Analytics en tiempo real.",
  keywords: ["RHYNODE NEXUS", "SaaS Hotelero", "Gestión Hotelera", "Teoría de Sistemas", "Hotel Management System", "PMS Premium", "Reservas en Línea", "IoT Hotel", "IA Hotelera", "Dashboard Hotelero", "Check-in Digital", "Gestión de Habitaciones", "Revenue Management", "Hospitality Tech"],
  authors: [{ name: "RHYNODE" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏨</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
