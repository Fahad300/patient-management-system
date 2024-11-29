"use client";

import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/components/layouts/MainLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MainLayout>{children}</MainLayout>
    </AuthProvider>
  );
}