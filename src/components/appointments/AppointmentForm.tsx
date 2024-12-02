"use client";

import { Form, Input, Select, DatePicker, TimePicker, Button, Space } from 'antd';
import { useState } from 'react';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Modal, message } from 'antd';

interface AppointmentFormProps {
  visible: boolean;
  initialDate?: Dayjs | null;
  onCancel: () => void;
  onSuccess: () => void;
}

const { Option } = Select;
const { TextArea } = Input;

const AppointmentForm = ({ visible, initialDate, onCancel, onSuccess }: AppointmentFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]);

  // Fetch patients when modal opens
  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients');
      if (!response.ok) throw new Error('Failed to fetch patients');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      message.error('Failed to load patients');
    }
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const appointmentData = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.timeRange[0].format('HH:mm'),
        endTime: values.timeRange[1].format('HH:mm'),
      };

      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) throw new Error('Failed to create appointment');

      message.success('Appointment created successfully');
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error('Submit error:', error);
      message.error('Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="New Appointment"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={600}
      afterOpenChange={(open) => {
        if (open) {
          fetchPatients();
          if (initialDate) {
            form.setFieldsValue({
              date: initialDate,
            });
          }
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="patientId"
          label="Patient"
          rules={[{ required: true, message: 'Please select a patient' }]}
        >
          <Select
            showSearch
            placeholder="Select a patient"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={patients.map(p => ({
              value: p.id,
              label: `${p.firstName} ${p.lastName}`,
            }))}
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select date' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="timeRange"
          label="Time"
          rules={[{ required: true, message: 'Please select time' }]}
        >
          <TimePicker.RangePicker 
            format="HH:mm"
            minuteStep={15}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          name="type"
          label="Appointment Type"
          rules={[{ required: true, message: 'Please select appointment type' }]}
        >
          <Select>
            <Option value="CONSULTATION">Consultation</Option>
            <Option value="FOLLOW_UP">Follow-up</Option>
            <Option value="CHECKUP">Check-up</Option>
            <Option value="PROCEDURE">Procedure</Option>
          </Select>
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item className="form-actions">
          <Space>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Appointment
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppointmentForm; 