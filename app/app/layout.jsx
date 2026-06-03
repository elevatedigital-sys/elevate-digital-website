import "./globals.css";

export const metadata = {
  title: "Elevate Digital",
  description: "Premium digital experiences by Elevate Digital.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
