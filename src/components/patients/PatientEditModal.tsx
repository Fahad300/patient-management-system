"use client";

import { Modal, Form, Input, DatePicker, Select, Button, Space, message } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';

interface PatientEditModalProps {
  patient: any;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PatientEditModal = ({ patient, open, onClose, onSuccess }: PatientEditModalProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/patients/${patient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          dateOfBirth: values.dateOfBirth.toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed to update patient');

      message.success('Patient updated successfully');
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Edit Patient"
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          ...patient,
          dateOfBirth: patient?.dateOfBirth ? dayjs(patient.dateOfBirth) : undefined,
        }}
      >
        <div className="form-grid">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select date of birth' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select gender' }]}
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: 'email', message: 'Please enter a valid email' },
              { required: true, message: 'Please enter email' }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="bloodGroup" label="Blood Group">
            <Select>
              <Select.Option value="A+">A+</Select.Option>
              <Select.Option value="A-">A-</Select.Option>
              <Select.Option value="B+">B+</Select.Option>
              <Select.Option value="B-">B-</Select.Option>
              <Select.Option value="O+">O+</Select.Option>
              <Select.Option value="O-">O-</Select.Option>
              <Select.Option value="AB+">AB+</Select.Option>
              <Select.Option value="AB-">AB-</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={4} />
        </Form.Item>

        <div className="form-actions">
          <Space>
            <Button onClick={onClose}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save Changes
            </Button>
          </Space>
        </div>
      </Form>
    </Modal>
  );
};

export default PatientEditModal; 