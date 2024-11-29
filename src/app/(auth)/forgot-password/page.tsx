"use client";

import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword, isLoading, error } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  const onFinish = async ({ email }: { email: string }) => {
    try {
      await resetPassword(email);
      setSubmitted(true);
      message.success('Password reset instructions sent to your email');
    } catch (err) {
      message.error('Failed to send reset instructions');
    }
  };

  if (submitted) {
    return (
      <div className="auth-container">
        <Card className="auth-card">
          <h1 className="auth-title">Check Your Email</h1>
          <p className="auth-message">
            We have sent password reset instructions to your email address.
            Please check your inbox and follow the instructions.
          </p>
          <div className="auth-links">
            <Link href="/login">Return to login</Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <h1 className="auth-title">Reset Password</h1>
        {error && <div className="auth-error">{error}</div>}
        <Form
          name="forgot-password"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large" 
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              block
              size="large"
            >
              Send Reset Instructions
            </Button>
          </Form.Item>

          <div className="auth-links">
            <Link href="/login">Return to login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
} 