"use client";

import { Form, Input, Select, TimePicker } from 'antd';
import { AuthUser } from '@/types/auth';
import BaseProfile from './BaseProfile';

interface DoctorProfileProps {
  user: AuthUser;
}

const DoctorProfile = ({ user }: DoctorProfileProps) => {
  const additionalTabs = [
    {
      key: 'professional',
      label: 'Professional Details',
      children: (
        <Form layout="vertical">
          <Form.Item
            name="specialization"
            label="Specialization"
          >
            <Select
              options={[
                { label: 'Cardiology', value: 'cardiology' },
                { label: 'Neurology', value: 'neurology' },
                { label: 'Pediatrics', value: 'pediatrics' },
                // Add more specializations
              ]}
            />
          </Form.Item>

          <Form.Item
            name="experience"
            label="Years of Experience"
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            name="consultationHours"
            label="Consultation Hours"
          >
            <TimePicker.RangePicker />
          </Form.Item>

          <Form.Item
            name="qualifications"
            label="Qualifications"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return <BaseProfile user={user} additionalTabs={additionalTabs} />;
};

export default DoctorProfile; 