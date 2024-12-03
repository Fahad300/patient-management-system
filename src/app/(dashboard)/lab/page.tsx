"use client";

import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Tag, Modal, Upload, Tabs, Row, Col } from 'antd';
import {
  FileAddOutlined,
  UploadOutlined,
  LineChartOutlined,
  FilePdfOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { UploadProps } from 'antd';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ComponentLoader from '@/components/common/ComponentLoader';
import LabTestForm from '@/components/lab/LabTestForm';
import ResultUploadForm from '@/components/lab/ResultUploadForm';
import { formatDate } from '@/lib/utils';
import '@/styles/lab.css';

interface LabTest {
  id: string;
  patientId: string;
  patient: {
    firstName: string;
    lastName: string;
  };
  testType: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  priority: 'ROUTINE' | 'URGENT' | 'STAT';
  requestedDate: string;
  completedDate?: string;
  results?: {
    id: string;
    type: 'PDF' | 'IMAGE' | 'DATA';
    url: string;
    uploadedAt: string;
  }[];
  notes?: string;
  trendData?: Array<{
    date: string;
    value: number;
    unit: string;
  }>;
}

const LabDiagnosticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'new' | 'upload' | 'trend'>('new');

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setLabTests([
        {
          id: 'LAB001',
          patientId: 'P1',
          patient: {
            firstName: 'John',
            lastName: 'Doe',
          },
          testType: 'Blood Sugar',
          status: 'COMPLETED',
          priority: 'ROUTINE',
          requestedDate: '2024-03-15',
          completedDate: '2024-03-16',
          results: [
            {
              id: 'R1',
              type: 'PDF',
              url: '/results/lab001.pdf',
              uploadedAt: '2024-03-16',
            },
          ],
          trendData: [
            { date: '2024-01-15', value: 95, unit: 'mg/dL' },
            { date: '2024-02-15', value: 102, unit: 'mg/dL' },
            { date: '2024-03-15', value: 98, unit: 'mg/dL' },
          ],
        },
        // Add more mock data
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const columns: ColumnsType<LabTest> = [
    {
      title: 'Patient',
      key: 'patient',
      render: (record: LabTest) => (
        `${record.patient.firstName} ${record.patient.lastName}`
      ),
    },
    {
      title: 'Test Type',
      dataIndex: 'testType',
      key: 'testType',
    },
    {
      title: 'Priority',
      key: 'priority',
      render: (record: LabTest) => {
        const colors = {
          ROUTINE: 'blue',
          URGENT: 'orange',
          STAT: 'red',
        };
        return <Tag color={colors[record.priority]}>{record.priority}</Tag>;
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: LabTest) => {
        const colors = {
          PENDING: 'default',
          IN_PROGRESS: 'processing',
          COMPLETED: 'success',
          CANCELLED: 'error',
        };
        return <Tag color={colors[record.status]}>{record.status}</Tag>;
      },
    },
    {
      title: 'Requested Date',
      dataIndex: 'requestedDate',
      key: 'requestedDate',
      render: (date: string) => formatDate(date, 'MMM DD, YYYY'),
    },
    {
      title: 'Results',
      key: 'results',
      render: (record: LabTest) => (
        <Space>
          {record.results?.map(result => (
            <Button
              key={result.id}
              icon={result.type === 'PDF' ? <FilePdfOutlined /> : <FileImageOutlined />}
              onClick={() => window.open(result.url, '_blank')}
            >
              View
            </Button>
          ))}
          {record.status !== 'CANCELLED' && (
            <Button
              icon={<UploadOutlined />}
              onClick={() => {
                setSelectedTest(record);
                setModalType('upload');
                setModalVisible(true);
              }}
            >
              Upload
            </Button>
          )}
          {record.trendData && (
            <Button
              icon={<LineChartOutlined />}
              onClick={() => {
                setSelectedTest(record);
                setModalType('trend');
                setModalVisible(true);
              }}
            >
              Trend
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const renderTrendChart = (test: LabTest) => {
    if (!test.trendData) return null;

    return (
      <div style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={test.trendData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => formatDate(date, 'MMM DD')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => formatDate(date, 'MMM DD, YYYY')}
              formatter={(value, name) => [`${value} ${test.trendData?.[0]?.unit}`, 'Value']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#1890ff"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  if (loading) {
    return <ComponentLoader type="table" />;
  }

  return (
    <div className="lab-container">
      <div className="page-header">
        <h1 className="page-title">Lab & Diagnostics</h1>
        <Button
          type="primary"
          icon={<FileAddOutlined />}
          onClick={() => {
            setSelectedTest(null);
            setModalType('new');
            setModalVisible(true);
          }}
        >
          New Lab Test
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={labTests}
          rowKey="id"
        />
      </Card>

      <Modal
        title={
          modalType === 'new' ? 'New Lab Test' :
          modalType === 'upload' ? 'Upload Results' :
          'Result Trends'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={modalType === 'trend' ? 800 : 600}
      >
        {modalType === 'new' && (
          <LabTestForm
            onSubmit={async (values) => {
              // Handle new lab test submission
              setModalVisible(false);
            }}
          />
        )}
        {modalType === 'upload' && selectedTest && (
          <ResultUploadForm
            test={selectedTest}
            onSubmit={async (values) => {
              // Handle result upload
              setModalVisible(false);
            }}
          />
        )}
        {modalType === 'trend' && selectedTest && (
          <div>
            <h3>{selectedTest.testType} Trends</h3>
            {renderTrendChart(selectedTest)}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LabDiagnosticsPage; 