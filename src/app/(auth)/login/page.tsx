"use client";

import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  );
} 