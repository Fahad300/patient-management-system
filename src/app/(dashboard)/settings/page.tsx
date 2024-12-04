"use client";

import { Card, Tabs, Form, Input, Switch, Select, Button, Space, Radio } from 'antd';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import '@/styles/settings.css';
import { InitializeButton } from '@/components/admin/InitializeButton';
import RoleManagement from '@/components/admin/RoleManagement';

const { TabPane } = Tabs;
const { Option } = Select;

export default function SettingsPage() {
    const handleGeneralSubmit = (values: any) => {
        console.log('General settings:', values);
    };

    const handleNotificationSubmit = (values: any) => {
        console.log('Notification settings:', values);
    };

    const handleSecuritySubmit = (values: any) => {
        console.log('Security settings:', values);
    };

    return (
        <ProtectedRoute requiredPermission="view_settings">
            <div className="settings-container">
                <h1 className="settings-title">Settings</h1>
                <div className="settings-section">
                    <Card className="settings-card">
                        <Tabs defaultActiveKey="general">
                            <TabPane tab="General" key="general">
                                <h2 className="settings-subtitle">General Settings</h2>
                                <p className="settings-description">
                                    Configure general application settings
                                </p>
                                <Form
                                    layout="vertical"
                                    onFinish={handleGeneralSubmit}
                                    initialValues={{
                                        clinicName: 'Healthcare Clinic',
                                        language: 'en',
                                        timezone: 'UTC+0',
                                        dateFormat: 'MM/DD/YYYY',
                                        timeFormat: '12',
                                    }}
                                >
                                    <Form.Item
                                        label="Clinic Name"
                                        name="clinicName"
                                        rules={[{ required: true }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        label="Default Language"
                                        name="language"
                                        rules={[{ required: true }]}
                                    >
                                        <Select>
                                            <Option value="en">English</Option>
                                            <Option value="es">Spanish</Option>
                                            <Option value="fr">French</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Timezone"
                                        name="timezone"
                                        rules={[{ required: true }]}
                                    >
                                        <Select>
                                            <Option value="UTC+0">UTC+0 London</Option>
                                            <Option value="UTC-5">UTC-5 New York</Option>
                                            <Option value="UTC+1">UTC+1 Paris</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Date Format"
                                        name="dateFormat"
                                        rules={[{ required: true }]}
                                    >
                                        <Radio.Group>
                                            <Radio value="MM/DD/YYYY">MM/DD/YYYY</Radio>
                                            <Radio value="DD/MM/YYYY">DD/MM/YYYY</Radio>
                                            <Radio value="YYYY-MM-DD">YYYY-MM-DD</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item
                                        label="Time Format"
                                        name="timeFormat"
                                        rules={[{ required: true }]}
                                    >
                                        <Radio.Group>
                                            <Radio value="12">12 Hour</Radio>
                                            <Radio value="24">24 Hour</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Save General Settings
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab="Notifications" key="notifications">
                                <h2 className="settings-subtitle">Notification Preferences</h2>
                                <p className="settings-description">
                                    Manage your notification settings
                                </p>
                                <Form
                                    layout="vertical"
                                    onFinish={handleNotificationSubmit}
                                    initialValues={{
                                        emailNotifications: true,
                                        smsNotifications: false,
                                        appointmentReminders: true,
                                        marketingEmails: false,
                                    }}
                                >
                                    <Form.Item
                                        label="Email Notifications"
                                        name="emailNotifications"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>

                                    <Form.Item
                                        label="SMS Notifications"
                                        name="smsNotifications"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>

                                    <Form.Item
                                        label="Appointment Reminders"
                                        name="appointmentReminders"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>

                                    <Form.Item
                                        label="Marketing Emails"
                                        name="marketingEmails"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Save Notification Settings
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab="Security" key="security">
                                <h2 className="settings-subtitle">Security Settings</h2>
                                <p className="settings-description">
                                    Configure security and privacy settings
                                </p>
                                <Form
                                    layout="vertical"
                                    onFinish={handleSecuritySubmit}
                                    initialValues={{
                                        twoFactorAuth: false,
                                        sessionTimeout: '30',
                                        passwordExpiry: '90',
                                        loginAttempts: '3',
                                    }}
                                >
                                    <Form.Item
                                        label="Two-Factor Authentication"
                                        name="twoFactorAuth"
                                        valuePropName="checked"
                                    >
                                        <Switch />
                                    </Form.Item>

                                    <Form.Item
                                        label="Session Timeout (minutes)"
                                        name="sessionTimeout"
                                        rules={[{ required: true }]}
                                    >
                                        <Select>
                                            <Option value="15">15 minutes</Option>
                                            <Option value="30">30 minutes</Option>
                                            <Option value="60">1 hour</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Password Expiry (days)"
                                        name="passwordExpiry"
                                        rules={[{ required: true }]}
                                    >
                                        <Select>
                                            <Option value="30">30 days</Option>
                                            <Option value="60">60 days</Option>
                                            <Option value="90">90 days</Option>
                                            <Option value="never">Never</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label="Maximum Login Attempts"
                                        name="loginAttempts"
                                        rules={[{ required: true }]}
                                    >
                                        <Select>
                                            <Option value="3">3 attempts</Option>
                                            <Option value="5">5 attempts</Option>
                                            <Option value="10">10 attempts</Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item>
                                        <Space direction="vertical" style={{ width: '100%' }}>
                                            <Button type="primary" htmlType="submit">
                                                Save Security Settings
                                            </Button>
                                            <Button danger>
                                                Reset All Security Settings
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </TabPane>

                            <TabPane tab="Role Management" key="roles">
                                <RoleManagement />
                            </TabPane>
                        </Tabs>
                    </Card>
                </div>

                <div className="settings-section">
                    <h2>Database Management</h2>
                    <div className="settings-content">
                        <p>Initialize the database with sample data</p>
                        <InitializeButton />
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
} 