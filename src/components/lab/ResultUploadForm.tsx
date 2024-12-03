"use client";

import React from 'react';
import { Form, Input, Upload, Button, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

interface ResultUploadFormProps {
  test: any;
  onSubmit: (values: any) => Promise<void>;
}

const ResultUploadForm = ({ test, onSubmit }: ResultUploadFormProps) => {
  const [form] = Form.useForm();

  const uploadProps: UploadProps = {
    name: 'file',
    action: '/api/upload',
    onChange(info) {
      if (info.file.status === 'done') {
        form.setFieldsValue({
          fileUrl: info.file.response.url,
        });
      }
    },
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
    >
      <Form.Item
        name="resultType"
        label="Result Type"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="PDF">PDF Document</Option>
          <Option value="IMAGE">Image</Option>
          <Option value="DATA">Numerical Data</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="file"
        label="Result File"
        rules={[{ required: true }]}
      >
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>Upload File</Button>
        </Upload>
      </Form.Item>

      <Form.Item
        name="value"
        label="Result Value"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="unit"
        label="Unit"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Notes"
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Upload Results
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResultUploadForm; 