export const metadata = {
  title: "Elevate Digital",
  description: "Modern web design, social media, and digital strategy for businesses.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
