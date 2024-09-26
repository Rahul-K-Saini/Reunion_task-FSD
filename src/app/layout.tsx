import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reunion Task | Table",
  description:
    "This is a full stack developer task given by reunion and done by Rahul Saini",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
