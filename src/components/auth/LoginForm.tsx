"use client";

import React from 'react';
import { Form, Input, Button, message, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { LoginCredentials } from '@/types/auth';
import { TEST_USERS } from '@/lib/testUsers';

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
    try {
      // Set development credentials as superAdmin
      const superAdminUser = TEST_USERS.superAdmin;
      localStorage.setItem('auth_token', 'dev-token');
      localStorage.setItem('dev_user', JSON.stringify(superAdminUser));
      
      // Show success message
      message.success('Logged in as Super Admin');
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      message.error('Development login failed');
      console.error('Dev login error:', error);
    }
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