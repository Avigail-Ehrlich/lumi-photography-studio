import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MB Photographer — צילום משפחה, חלאקה ובת מצווה",
  description: "צילום טבעי, רך ומלא חיים — משפחה, חלאקה ובת מצווה.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&family=Assistant:wght@300;400;600&family=Frank+Ruhl+Libre:wght@300;400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
