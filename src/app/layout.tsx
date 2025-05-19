import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "App Login",
  description: "App My Token",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      >
        {children}
      </body>
    </html>
  );
}
