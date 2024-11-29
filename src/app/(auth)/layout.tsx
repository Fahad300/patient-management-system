import { Inter } from "next/font/google";
import Image from 'next/image';
import "@/styles/globals.css";
import "@/styles/auth.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Authentication - Patient Management System",
  description: "Login to Patient Management System",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  );
} 