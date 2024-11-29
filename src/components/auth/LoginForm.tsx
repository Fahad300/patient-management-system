"use client";

import React from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LoginCredentials, DEV_USER } from '@/types/auth';

const LoginForm = () => {
  const { login, isLoading, error } = useAuth();
  const router = useRouter();
  const isDevelopment = process.env.NODE_ENV === 'development';

  const onFinish = async (values: LoginCredentials) => {
    try {
      await login(values);
    } catch (err) {
      message.error('Login failed');
    }
  };

  const handleDevLogin = () => {
    localStorage.setItem('auth_token', 'dev-token');
    localStorage.setItem('dev_user', JSON.stringify(DEV_USER));
    window.location.href = '/dashboard';
  };

  return (
    <>
      {error && <div className="auth-error">{error}</div>}
      <Form
        name="login"
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
            prefix={<UserOutlined />} 
            placeholder="Email" 
            size="large" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
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
            Log in
          </Button>
        </Form.Item>

        <div className="auth-links">
          <Link href="/forgot-password">Forgot password?</Link>
          <Link href="/signup">Create an account</Link>
        </div>

        {isDevelopment && (
          <>
            <Divider>Development Access</Divider>
            <Button 
              onClick={handleDevLogin}
              block
              size="large"
              style={{ 
                backgroundColor: '#52c41a', 
                color: 'white',
                fontWeight: 'bold' 
              }}
            >
              Login as Super Admin
            </Button>
            <div style={{ 
              marginTop: 8, 
              textAlign: 'center', 
              color: 'rgba(0,0,0,0.45)', 
              fontSize: 12 
            }}>
              Development mode only - Bypasses authentication
            </div>
          </>
        )}
      </Form>
    </>
  );
};

export default LoginForm; 