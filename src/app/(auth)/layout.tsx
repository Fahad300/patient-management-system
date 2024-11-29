import { Inter } from "next/font/google";
import Image from 'next/image';
import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import "@/styles/auth.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication - Patient Management System",
  description: "Login to Patient Management System",
};

export default function RootAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="auth-page">
            <div className="auth-logo">
              <Image
                src="/logo.png"
                alt="HealthCare PMS"
                width={160}
                height={60}
                priority
              />
            </div>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
} 