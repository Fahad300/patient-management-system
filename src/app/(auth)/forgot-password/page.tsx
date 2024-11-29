"use client";

import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset Password">
      <ForgotPasswordForm />
    </AuthLayout>
  );
} 