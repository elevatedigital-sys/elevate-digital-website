export const metadata = {
  title: "Elevate Digital",
  description: "Modern web design and social media agency",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
