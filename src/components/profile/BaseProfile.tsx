"use client";

import { Card, Tabs, Form, Input, Button, Upload, message } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import { AuthUser } from '@/types/auth';

interface BaseProfileProps {
  user: AuthUser;
  additionalTabs?: React.ReactNode;
}

const BaseProfile = ({ user, additionalTabs }: BaseProfileProps) => {
  const handleUpdateProfile = (values: any) => {
    console.log('Update profile:', values);
    message.success('Profile updated successfully');
  };

  const handleUpdatePassword = (values: any) => {
    console.log('Update password:', values);
    message.success('Password updated successfully');
  };

  const items = [
    {
      key: 'basic',
      label: 'Basic Information',
      children: (
        <Form
          layout="vertical"
          initialValues={{
            name: user.name,
            email: user.email,
            phone: user.phone || '',
          }}
          onFinish={handleUpdateProfile}
        >
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Profile Picture"
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'security',
      label: 'Security',
      children: (
        <Form
          layout="vertical"
          onFinish={handleUpdatePassword}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 6, message: 'Password must be at least 6 characters!' }
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Password
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    ...(additionalTabs ? additionalTabs : []),
  ];

  return (
    <Card>
      <Tabs items={items} />
    </Card>
  );
};

export default BaseProfile; 