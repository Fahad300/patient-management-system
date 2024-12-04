"use client";

import React from 'react';
import { Form, Input, Select, InputNumber, Button, Space, Divider, Row, Col } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { formatCurrency } from '@/lib/utils';

const { Option } = Select;

interface BillingFormProps {
  onSubmit: (values: any) => Promise<void>;
}

const BillingForm = ({ onSubmit }: BillingFormProps) => {
  const [form] = Form.useForm();

  const calculateTotals = () => {
    const items = form.getFieldValue('items') || [];
    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + (item?.quantity || 0) * (item?.unitPrice || 0);
    }, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    form.setFieldsValue({
      subtotal,
      tax,
      total,
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        items: [{}],
        tax: 0,
        subtotal: 0,
        total: 0,
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

      <Divider>Bill Items</Divider>

      <Form.List name="items">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  rules={[{ required: true, message: 'Missing description' }]}
                >
                  <Input placeholder="Description" style={{ width: 200 }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'type']}
                  rules={[{ required: true, message: 'Missing type' }]}
                >
                  <Select style={{ width: 150 }}>
                    <Option value="CONSULTATION">Consultation</Option>
                    <Option value="LAB_TEST">Lab Test</Option>
                    <Option value="PROCEDURE">Procedure</Option>
                    <Option value="MEDICATION">Medication</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'quantity']}
                  rules={[{ required: true, message: 'Missing quantity' }]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Qty"
                    onChange={calculateTotals}
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'unitPrice']}
                  rules={[{ required: true, message: 'Missing price' }]}
                >
                  <InputNumber
                    min={0}
                    placeholder="Price"
                    formatter={(value: string | number | undefined, info: { userTyping: boolean; input: string }) => {
                      const numberValue = typeof value === 'string' ? parseFloat(value.replace(/\$\s?|(,*)/g, '')) : 0;
                      return formatCurrency(numberValue);
                    }}
                    parser={(value: string | undefined) => value!.replace(/\$\s?|(,*)/g, '')}
                    onChange={calculateTotals}
                  />
                </Form.Item>
                {fields.length > 1 && (
                  <MinusCircleOutlined onClick={() => remove(name)} />
                )}
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Subtotal" name="subtotal">
            <InputNumber
              disabled
              formatter={(value: string | number | undefined, info: { userTyping: boolean; input: string }) => 
                formatCurrency(typeof value === 'number' ? value : 0)
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Tax" name="tax">
            <InputNumber
              disabled
              formatter={(value: string | number | undefined, info: { userTyping: boolean; input: string }) => 
                formatCurrency(typeof value === 'number' ? value : 0)
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Total" name="total">
            <InputNumber
              disabled
              formatter={(value: string | number | undefined, info: { userTyping: boolean; input: string }) => 
                formatCurrency(typeof value === 'number' ? value : 0)
              }
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Generate Bill
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BillingForm; 