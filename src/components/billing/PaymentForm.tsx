"use client";

import React from 'react';
import { Form, Input, Select, InputNumber, DatePicker, Button } from 'antd';
import { DollarOutlined, CreditCardOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { formatCurrency } from '@/lib/utils';

const { Option } = Select;

interface PaymentFormProps {
  bill: any;
  onSubmit: (values: any) => Promise<void>;
}

const PaymentForm = ({ bill, onSubmit }: PaymentFormProps) => {
  const [form] = Form.useForm();

  const remainingAmount = bill ? (
    bill.total - bill.payments.reduce((sum: number, payment: any) => sum + payment.amount, 0)
  ) : 0;

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onSubmit}
      initialValues={{
        date: dayjs(),
        amount: remainingAmount,
      }}
    >
      <Form.Item
        name="amount"
        label="Payment Amount"
        rules={[
          { required: true, message: 'Please enter payment amount' },
          {
            validator: (_, value) => {
              if (value > remainingAmount) {
                return Promise.reject('Amount cannot exceed remaining balance');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber
          prefix={<DollarOutlined />}
          style={{ width: '100%' }}
          min={0}
          max={remainingAmount}
          formatter={value => formatCurrency(value || 0)}
          parser={value => value!.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="method"
        label="Payment Method"
        rules={[{ required: true, message: 'Please select payment method' }]}
      >
        <Select>
          <Option value="CASH">Cash</Option>
          <Option value="CREDIT_CARD">Credit Card</Option>
          <Option value="DEBIT_CARD">Debit Card</Option>
          <Option value="INSURANCE">Insurance</Option>
          <Option value="BANK_TRANSFER">Bank Transfer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="date"
        label="Payment Date"
        rules={[{ required: true, message: 'Please select payment date' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="reference"
        label="Reference Number"
      >
        <Input prefix={<CreditCardOutlined />} placeholder="Transaction reference" />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Notes"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <div className="payment-summary">
        <p>Bill Total: {formatCurrency(bill?.total || 0)}</p>
        <p>Paid Amount: {formatCurrency(bill?.total - remainingAmount || 0)}</p>
        <p>Remaining Balance: {formatCurrency(remainingAmount)}</p>
      </div>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Process Payment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PaymentForm; 