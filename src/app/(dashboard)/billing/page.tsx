"use client";

import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Tag, Statistic, Row, Col, Modal, Tabs } from 'antd';
import {
  DollarOutlined,
  FileTextOutlined,
  PlusOutlined,
  AlertOutlined,
  SafetyCertificateOutlined,
  FilePdfOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ComponentLoader from '@/components/common/ComponentLoader';
import BillingForm from '@/components/billing/BillingForm';
import PaymentForm from '@/components/billing/PaymentForm';
import InsuranceForm from '@/components/billing/InsuranceForm';
import { formatCurrency, formatDate } from '@/lib/utils';
import '@/styles/billing.css';
import InvoiceViewer from '@/components/billing/InvoiceViewer';

const { TabPane } = Tabs;

interface BillingItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  type: 'CONSULTATION' | 'LAB_TEST' | 'PROCEDURE' | 'MEDICATION';
}

interface Insurance {
  provider: string;
  policyNumber: string;
  coverage: number;
  copayment: number;
}

interface Bill {
  id: string;
  patientId: string;
  patient: {
    firstName: string;
    lastName: string;
    insurance?: Insurance;
  };
  items: BillingItem[];
  subtotal: number;
  tax: number;
  total: number;
  insurance?: {
    coverage: number;
    copayment: number;
  };
  status: 'PAID' | 'PENDING' | 'PARTIAL' | 'OVERDUE';
  dueDate: string;
  createdAt: string;
  payments: Array<{
    id: string;
    amount: number;
    method: string;
    date: string;
  }>;
}

const BillingPage = () => {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState<Bill[]>([]);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'payment' | 'insurance'>('new');
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    overdueAmount: 0,
    insuranceClaims: 0,
  });
  const [invoiceVisible, setInvoiceVisible] = useState(false);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setBills([
        {
          id: 'BILL-001',
          patientId: 'P1',
          patient: {
            firstName: 'John',
            lastName: 'Doe',
            insurance: {
              provider: 'Blue Cross',
              policyNumber: 'BC123456',
              coverage: 80,
              copayment: 20,
            },
          },
          items: [
            {
              id: '1',
              description: 'General Consultation',
              quantity: 1,
              unitPrice: 150,
              total: 150,
              type: 'CONSULTATION',
            },
            {
              id: '2',
              description: 'Blood Test',
              quantity: 1,
              unitPrice: 75,
              total: 75,
              type: 'LAB_TEST',
            },
          ],
          subtotal: 225,
          tax: 22.50,
          total: 247.50,
          insurance: {
            coverage: 198,
            copayment: 49.50,
          },
          status: 'PENDING',
          dueDate: '2024-03-30',
          createdAt: '2024-03-15',
          payments: [],
        },
        // Add more mock bills
      ]);
      
      setStats({
        totalRevenue: 25000,
        pendingPayments: 5000,
        overdueAmount: 1500,
        insuranceClaims: 15000,
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  const columns: ColumnsType<Bill> = [
    {
      title: 'Bill #',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient',
      key: 'patient',
      render: (record: Bill) => (
        `${record.patient.firstName} ${record.patient.lastName}`
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => formatDate(date, 'MMM DD, YYYY'),
    },
    {
      title: 'Amount',
      key: 'total',
      render: (record: Bill) => (
        <Space direction="vertical" size="small">
          <span>{formatCurrency(record.total)}</span>
          {record.insurance && (
            <Tag color="blue">Insurance: {formatCurrency(record.insurance.coverage)}</Tag>
          )}
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: Bill) => {
        const colors = {
          PAID: 'success',
          PENDING: 'warning',
          PARTIAL: 'processing',
          OVERDUE: 'error',
        };
        return <Tag color={colors[record.status]}>{record.status}</Tag>;
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date: string) => formatDate(date, 'MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Bill) => (
        <Space>
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => {
              setSelectedBill(record);
              setInvoiceVisible(true);
            }}
          >
            View Invoice
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setSelectedBill(record);
              setModalType('payment');
              setModalVisible(true);
            }}
          >
            Add Payment
          </Button>
        </Space>
      ),
    },
  ];

  const handleGenerateInvoice = async (bill: Bill) => {
    // Implementation for generating invoice PDF
  };

  return (
    <div className="billing-container">
      <Row gutter={[16, 16]} className="billing-stats">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={stats.totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Payments"
              value={stats.pendingPayments}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Overdue Amount"
              value={stats.overdueAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Insurance Claims"
              value={stats.insuranceClaims}
              prefix={<SafetyCertificateOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="Billing & Payments"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setSelectedBill(null);
              setModalType('new');
              setModalVisible(true);
            }}
          >
            New Bill
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={bills}
          rowKey="id"
          loading={loading}
        />
      </Card>

      <Modal
        title={
          modalType === 'new' ? 'New Bill' :
          modalType === 'payment' ? 'Add Payment' :
          'Insurance Details'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        {modalType === 'new' && (
          <BillingForm
            onSubmit={async (values) => {
              // Handle new bill submission
            }}
          />
        )}
        {modalType === 'payment' && (
          <PaymentForm
            bill={selectedBill}
            onSubmit={async (values) => {
              // Handle payment submission
            }}
          />
        )}
        {modalType === 'insurance' && (
          <InsuranceForm
            bill={selectedBill}
            onSubmit={async (values) => {
              // Handle insurance details submission
            }}
          />
        )}
      </Modal>

      <InvoiceViewer
        visible={invoiceVisible}
        onClose={() => setInvoiceVisible(false)}
        bill={selectedBill}
      />
    </div>
  );
};

export default BillingPage; 