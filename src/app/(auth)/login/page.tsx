"use client";

import React from 'react';
import { Card } from 'antd';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h1 className="auth-title">Login</h1>
        <LoginForm />
      </Card>
    </div>
  );
} 