"use client";

import { Form, Input, Select, TimePicker, Switch } from 'antd';
import { AuthUser, UserRole } from '@/types/auth';
import BaseProfile from './BaseProfile';

interface UserProfileProps {
  user: AuthUser;
}

const UserProfile = ({ user }: UserProfileProps) => {
  // Role-specific field configurations
  const getRoleSpecificFields = (role: UserRole) => {
    const fieldConfigs = {
      superAdmin: {
        tabs: ['administrative', 'permissions'],
        fields: {
          administrative: [
            { name: 'department', type: 'select', label: 'Department', options: [
              { label: 'Management', value: 'management' },
              { label: 'Operations', value: 'operations' },
              { label: 'Finance', value: 'finance' },
              { label: 'HR', value: 'hr' }
            ]},
            { name: 'accessLevel', type: 'select', label: 'Access Level', options: [
              { label: 'Full Access', value: 'full' },
              { label: 'Limited Access', value: 'limited' },
              { label: 'Read Only', value: 'readonly' }
            ]},
            { name: 'employeeId', type: 'input', label: 'Employee ID' },
            { name: 'notifications', type: 'switch', label: 'System Notifications' }
          ],
          permissions: [
            { name: 'moduleAccess', type: 'multiSelect', label: 'Module Access', options: [
              { label: 'User Management', value: 'users' },
              { label: 'Patient Records', value: 'patients' },
              { label: 'Billing', value: 'billing' },
              { label: 'Reports', value: 'reports' }
            ]}
          ]
        }
      },
      doctor: {
        tabs: ['professional', 'schedule'],
        fields: {
          professional: [
            { name: 'specialization', type: 'select', label: 'Specialization', options: [
              { label: 'Cardiology', value: 'cardiology' },
              { label: 'Neurology', value: 'neurology' },
              { label: 'Pediatrics', value: 'pediatrics' }
            ]},
            { name: 'experience', type: 'input', label: 'Years of Experience' },
            { name: 'qualifications', type: 'textarea', label: 'Qualifications' }
          ],
          schedule: [
            { name: 'consultationHours', type: 'timeRange', label: 'Consultation Hours' }
          ]
        }
      },
      nurse: {
        tabs: ['professional', 'assignments'],
        fields: {
          professional: [
            { name: 'department', type: 'select', label: 'Department', options: [
              { label: 'General Ward', value: 'general' },
              { label: 'ICU', value: 'icu' },
              { label: 'Emergency', value: 'emergency' }
            ]},
            { name: 'shift', type: 'select', label: 'Shift', options: [
              { label: 'Morning', value: 'morning' },
              { label: 'Evening', value: 'evening' },
              { label: 'Night', value: 'night' }
            ]}
          ]
        }
      },
      // Add other roles as needed
    };

    return fieldConfigs[role] || {};
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'input':
        return <Input />;
      case 'select':
        return <Select options={field.options} />;
      case 'multiSelect':
        return <Select mode="multiple" options={field.options} />;
      case 'textarea':
        return <Input.TextArea rows={4} />;
      case 'switch':
        return <Switch />;
      case 'timeRange':
        return <TimePicker.RangePicker />;
      default:
        return null;
    }
  };

  const roleConfig = getRoleSpecificFields(user.role);
  
  const additionalTabs = roleConfig.tabs?.map(tabKey => ({
    key: tabKey,
    label: tabKey.charAt(0).toUpperCase() + tabKey.slice(1),
    children: (
      <Form layout="vertical">
        {roleConfig.fields[tabKey]?.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
          >
            {renderField(field)}
          </Form.Item>
        ))}
      </Form>
    )
  }));

  return <BaseProfile user={user} additionalTabs={additionalTabs} />;
};

export default UserProfile; 