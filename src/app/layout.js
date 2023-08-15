import "./globals.css";
import { Inter } from "next/font/google";
import Layout from "../app/store/layout"; // Asegúrate de que la ruta a tu archivo Layout es correcta.

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Cover",
  description: "--",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
