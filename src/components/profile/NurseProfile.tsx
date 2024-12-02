"use client";

import { Form, Input, Select, TimePicker, Switch } from 'antd';
import { AuthUser } from '@/types/auth';
import BaseProfile from './BaseProfile';

interface NurseProfileProps {
  user: AuthUser;
}

const NurseProfile = ({ user }: NurseProfileProps) => {
  const additionalTabs = [
    {
      key: 'professional',
      label: 'Professional Details',
      children: (
        <Form layout="vertical" initialValues={{
          department: 'general',
          shift: 'morning',
          onCall: false
        }}>
          <Form.Item
            name="nurseId"
            label="Nurse ID"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
          >
            <Select
              options={[
                { label: 'General Ward', value: 'general' },
                { label: 'ICU', value: 'icu' },
                { label: 'Emergency', value: 'emergency' },
                { label: 'Pediatrics', value: 'pediatrics' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="shift"
            label="Shift Preference"
          >
            <Select
              options={[
                { label: 'Morning Shift', value: 'morning' },
                { label: 'Afternoon Shift', value: 'afternoon' },
                { label: 'Night Shift', value: 'night' },
                { label: 'Rotating', value: 'rotating' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="workHours"
            label="Working Hours"
          >
            <TimePicker.RangePicker />
          </Form.Item>

          <Form.Item
            name="onCall"
            label="Available for On-Call"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            name="specializations"
            label="Specializations"
          >
            <Select
              mode="multiple"
              options={[
                { label: 'Critical Care', value: 'critical' },
                { label: 'Pediatric Care', value: 'pediatric' },
                { label: 'Emergency Care', value: 'emergency' },
                { label: 'Surgical Care', value: 'surgical' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="certifications"
            label="Certifications"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'assignments',
      label: 'Ward Assignments',
      children: (
        <Form layout="vertical">
          <Form.Item
            name="primaryWard"
            label="Primary Ward"
          >
            <Select
              options={[
                { label: 'Ward A', value: 'ward_a' },
                { label: 'Ward B', value: 'ward_b' },
                { label: 'ICU', value: 'icu' },
                { label: 'Emergency', value: 'emergency' }
              ]}
            />
          </Form.Item>

          <Form.Item
            name="patientCapacity"
            label="Patient Capacity"
          >
            <Input type="number" min={1} max={20} />
          </Form.Item>

          <Form.Item
            name="specialDuties"
            label="Special Duties"
          >
            <Select
              mode="multiple"
              options={[
                { label: 'Medicine Administration', value: 'medicine' },
                { label: 'Patient Monitoring', value: 'monitoring' },
                { label: 'Emergency Response', value: 'emergency' },
                { label: 'Training', value: 'training' }
              ]}
            />
          </Form.Item>
        </Form>
      ),
    }
  ];

  return <BaseProfile user={user} additionalTabs={additionalTabs} />;
};

export default NurseProfile; 