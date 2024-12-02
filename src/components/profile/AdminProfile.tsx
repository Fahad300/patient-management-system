"use client";

import { Form, Input, Select, Switch } from 'antd';
import { AuthUser } from '@/types/auth';
import BaseProfile from './BaseProfile';

interface AdminProfileProps {
  user: AuthUser;
}

const AdminProfile = ({ user }: AdminProfileProps) => {
  const additionalTabs = [
    {
      key: 'administrative',
      label: 'Administrative',
      children: (
        <Form layout="vertical" initialValues={{
          department: 'management',
          accessLevel: 'full',
          notifications: true
        }}>
          <Form.Item
            name="department"
            label="Department"
          >
            <Select
              options={[
                { label: 'Management', value: 'management' },
                { label: 'Operations', value: 'operations' },
                { label: 'Finance', value: 'finance' },
                { label: 'HR', value: 'hr' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="accessLevel"
            label="Access Level"
          >
            <Select
              options={[
                { label: 'Full Access', value: 'full' },
                { label: 'Limited Access', value: 'limited' },
                { label: 'Read Only', value: 'readonly' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="employeeId"
            label="Employee ID"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="notifications"
            label="System Notifications"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Administrative Notes"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'permissions',
      label: 'Permissions',
      children: (
        <Form layout="vertical">
          <Form.Item
            name="moduleAccess"
            label="Module Access"
          >
            <Select
              mode="multiple"
              placeholder="Select modules"
              options={[
                { label: 'User Management', value: 'users' },
                { label: 'Patient Records', value: 'patients' },
                { label: 'Billing', value: 'billing' },
                { label: 'Reports', value: 'reports' },
                { label: 'Settings', value: 'settings' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="dataAccess"
            label="Data Access Level"
          >
            <Select
              options={[
                { label: 'All Data', value: 'all' },
                { label: 'Department Only', value: 'department' },
                { label: 'Team Only', value: 'team' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="auditLog"
            label="Audit Log Access"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Form>
      ),
    }
  ];

  return <BaseProfile user={user} additionalTabs={additionalTabs} />;
};

export default AdminProfile; 