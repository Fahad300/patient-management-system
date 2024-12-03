"use client";

import React from 'react';
import { Form, Input, Select, DatePicker, Button, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

interface PrescriptionFormProps {
  prescription?: any;
  mode: 'view' | 'edit';
  onSubmit: (values: any) => Promise<void>;
}

const PrescriptionForm = ({ prescription, mode, onSubmit }: PrescriptionFormProps) => {
  const [form] = Form.useForm();
  const isView = mode === 'view';

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={prescription ? {
        ...prescription,
        date: dayjs(prescription.date),
      } : {
        date: dayjs(),
        medications: [{}],
      }}
      disabled={isView}
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
        name="diagnosis"
        label="Diagnosis"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Divider>Medications</Divider>

      <Form.List name="medications">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name']}
                  rules={[{ required: true, message: 'Missing medication name' }]}
                >
                  <Input placeholder="Medication name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'dosage']}
                  rules={[{ required: true, message: 'Missing dosage' }]}
                >
                  <Input placeholder="Dosage" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'frequency']}
                  rules={[{ required: true, message: 'Missing frequency' }]}
                >
                  <Select placeholder="Frequency" style={{ width: 200 }}>
                    <Option value="Once daily">Once daily</Option>
                    <Option value="Twice daily">Twice daily</Option>
                    <Option value="Three times daily">Three times daily</Option>
                    <Option value="Four times daily">Four times daily</Option>
                    <Option value="As needed">As needed</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'duration']}
                  rules={[{ required: true, message: 'Missing duration' }]}
                >
                  <Input placeholder="Duration" />
                </Form.Item>
                {!isView && fields.length > 1 && (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                )}
              </Space>
            ))}
            {!isView && (
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Medication
                </Button>
              </Form.Item>
            )}
          </>
        )}
      </Form.List>

      <Form.Item name="notes" label="Notes">
        <TextArea rows={4} />
      </Form.Item>

      {!isView && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Prescription
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default PrescriptionForm; 