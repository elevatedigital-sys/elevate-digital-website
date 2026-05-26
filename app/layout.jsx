import "./globals.css";

export const metadata = {
  title: "Elevate Digital",
  description: "Modern web design and social media management by Elevate Digital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
