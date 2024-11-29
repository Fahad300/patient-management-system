"use client";

import React from 'react';
import { Card } from 'antd';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h1 className="auth-title">{title}</h1>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout; 