"use client";

import React from 'react';
import { Form, Input, InputNumber, Select, Button } from 'antd';
import { SafetyCertificateOutlined, NumberOutlined } from '@ant-design/icons';

const { Option } = Select;

interface InsuranceFormProps {
  bill: any;
  onSubmit: (values: any) => Promise<void>;
}

const InsuranceForm = ({ bill, onSubmit }: InsuranceFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={bill?.patient?.insurance}
    >
      <Form.Item
        name="provider"
        label="Insurance Provider"
        rules={[{ required: true, message: 'Please enter insurance provider' }]}
      >
        <Select>
          <Option value="BLUE_CROSS">Blue Cross</Option>
          <Option value="AETNA">Aetna</Option>
          <Option value="CIGNA">Cigna</Option>
          <Option value="UNITED">United Healthcare</Option>
          <Option value="OTHER">Other</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="policyNumber"
        label="Policy Number"
        rules={[{ required: true, message: 'Please enter policy number' }]}
      >
        <Input prefix={<NumberOutlined />} placeholder="Policy number" />
      </Form.Item>

      <Form.Item
        name="coverage"
        label="Coverage Percentage"
        rules={[{ required: true, message: 'Please enter coverage percentage' }]}
      >
        <InputNumber
          min={0}
          max={100}
          formatter={value => `${value}%`}
          parser={value => value!.replace('%', '')}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="copayment"
        label="Copayment Amount"
        rules={[{ required: true, message: 'Please enter copayment amount' }]}
      >
        <InputNumber
          min={0}
          formatter={value => `$${value}`}
          parser={value => value!.replace('$', '')}
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        name="groupNumber"
        label="Group Number"
      >
        <Input prefix={<SafetyCertificateOutlined />} placeholder="Group number" />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Additional Notes"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Save Insurance Details
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsuranceForm; 