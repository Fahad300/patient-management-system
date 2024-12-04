"use client";

import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, Upload, message, Avatar, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useAuth } from '@/context/AuthContext';
import '@/styles/profile.css';

const { TabPane } = Tabs;

export interface AuthUser {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    // Add any other properties relevant to the user
}

const ProfilePage = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleProfileUpdate = async (values: any) => {
        setLoading(true);
        try {
            // API call to update profile
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (values: any) => {
        setLoading(true);
        try {
            // API call to change password
            message.success('Password changed successfully');
        } catch (error) {
            message.error('Failed to change password');
        } finally {
            setLoading(false);
        }
    };

    const uploadProps: UploadProps = {
        name: 'avatar',
        action: '/api/upload',
        onChange(info) {
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <div className="profile-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                    <Card>
                        <div className="text-center mb-6">
                            <Avatar
                                size={120}
                                icon={<UserOutlined />}
                                src={user?.avatar}
                            />

                            <h2 className="mt-4">{user?.name}</h2>
                            <p className="text-secondary">{user?.role}</p>
                        </div>
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Change Avatar</Button>
                        </Upload>
                    </Card>
                </Col>

                <Col xs={24} md={16}>
                    <Card>
                        <Tabs defaultActiveKey="profile">
                            <TabPane tab="Profile Information" key="profile">
                                <Form
                                    layout="vertical"
                                    onFinish={handleProfileUpdate}
                                    initialValues={{
                                        user: user?.name,
                                        email: user?.email,
                                    }}
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="firstName"
                                                label="First Name"
                                                rules={[{ required: true }]}
                                            >
                                                <Input prefix={<UserOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                            <Form.Item
                                                name="lastName"
                                                label="Last Name"
                                                rules={[{ required: true }]}
                                            >
                                                <Input prefix={<UserOutlined />} />
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Form.Item
                                        name="email"
                                        label="Email"
                                        rules={[
                                            { required: true },
                                            { type: 'email' }
                                        ]}
                                    >
                                        <Input prefix={<MailOutlined />} />
                                    </Form.Item>

                                    <Form.Item
                                        name="phone"
                                        label="Phone"
                                    >
                                        <Input prefix={<PhoneOutlined />} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Update Profile
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab="Change Password" key="password">
                                <Form
                                    layout="vertical"
                                    onFinish={handlePasswordChange}
                                >
                                    <Form.Item
                                        name="currentPassword"
                                        label="Current Password"
                                        rules={[{ required: true }]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>

                                    <Form.Item
                                        name="newPassword"
                                        label="New Password"
                                        rules={[
                                            { required: true },
                                            { min: 6 }
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>

                                    <Form.Item
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        dependencies={['newPassword']}
                                        rules={[
                                            { required: true },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('newPassword') === value) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject('Passwords do not match');
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password prefix={<LockOutlined />} />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" loading={loading}>
                                            Change Password
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProfilePage; 