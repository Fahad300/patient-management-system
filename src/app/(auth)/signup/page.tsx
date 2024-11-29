"use client";

import React from 'react';
import AuthLayout from '@/components/layouts/AuthLayout';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <AuthLayout title="Create Account">
      <SignupForm />
    </AuthLayout>
  );
} 