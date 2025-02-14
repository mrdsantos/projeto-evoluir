import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import Header from "@/app/components/Header/header";
import Footer from "@/app/components/Footer/Footer";
import { BreadcrumbsProvider } from "@/lib/context/BreadcrumbsContext";

export const metadata: Metadata = {
  title: "Projeto Evoluir",
  description: "Projeto Evoluir - Plataforma de cursos",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
    other: [
      { rel: "icon", url: "/favicon-16x16.png", sizes: "16x16" },
      { rel: "icon", url: "/favicon-32x32.png", sizes: "32x32" },
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="font-poppins antialiased bg-base-100">
        <AuthProvider>
          <BreadcrumbsProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </BreadcrumbsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
