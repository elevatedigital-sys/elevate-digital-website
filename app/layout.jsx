import "./globals.css";

export const metadata = {
  title: "Elevate Digital",
  description: "Premium digital experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
