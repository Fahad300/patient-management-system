"use client";

import React from 'react';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import { UserOutlined, FileTextOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface LabTestFormProps {
  onSubmit: (values: any) => Promise<void>;
}

const LabTestForm = ({ onSubmit }: LabTestFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        requestedDate: dayjs(),
        priority: 'ROUTINE',
      }}
    >
      <Form.Item
        name="patientId"
        label="Patient"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          placeholder="Select patient"
          optionFilterProp="children"
        >
          <Option value="p1">John Doe</Option>
          <Option value="p2">Jane Smith</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="testType"
        label="Test Type"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="BLOOD_SUGAR">Blood Sugar</Option>
          <Option value="CBC">Complete Blood Count</Option>
          <Option value="LIPID">Lipid Panel</Option>
          <Option value="THYROID">Thyroid Function</Option>
          <Option value="LIVER">Liver Function</Option>
          <Option value="KIDNEY">Kidney Function</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="ROUTINE">Routine</Option>
          <Option value="URGENT">Urgent</Option>
          <Option value="STAT">STAT</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="requestedDate"
        label="Requested Date"
        rules={[{ required: true }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Notes"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Create Lab Test
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LabTestForm; 