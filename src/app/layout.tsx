import { Inter } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";
import "@/styles/globals.css";
import "@/styles/layout.css";
import "@/styles/auth.css";

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
        <AuthProvider>
          <MainLayout>{children}</MainLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
