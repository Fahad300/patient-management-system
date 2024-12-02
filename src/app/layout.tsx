import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/auth.css";
import "@/styles/dashboard.css";
import "@/styles/components.css";
import "@/styles/patients.css";
import "@/styles/settings.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Patient Management System",
  description: "Modern healthcare management solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
