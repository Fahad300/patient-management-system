"use client";

import React from 'react';
import { Card, Table, Progress } from 'antd';
import { Line } from 'recharts';

interface PatientMetricsProps {
  timeRange: string;
  dateRange: [Date, Date] | null;
}

const PatientMetrics = ({ timeRange, dateRange }: PatientMetricsProps) => {
  const data = [
    { name: 'Jan', patients: 65 },
    { name: 'Feb', patients: 78 },
    { name: 'Mar', patients: 82 },
    // ... more data
  ];

  const commonIllnesses = [
    { illness: 'Hypertension', count: 145, percentage: 28 },
    { illness: 'Diabetes', count: 98, percentage: 19 },
    { illness: 'Respiratory Infections', count: 76, percentage: 15 },
    // ... more data
  ];

  const columns = [
    {
      title: 'Illness',
      dataIndex: 'illness',
      key: 'illness',
    },
    {
      title: 'Patients',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: 'Distribution',
      key: 'percentage',
      render: (record: any) => (
        <Progress percent={record.percentage} size="small" />
      ),
    },
  ];

  return (
    <Card title="Patient Analytics" className="metric-card">
      <div className="chart-container">
        <Line
          data={data}
          width={500}
          height={300}
        />
      </div>
      <Table
        columns={columns}
        dataSource={commonIllnesses}
        pagination={false}
        size="small"
      />
    </Card>
  );
};

export default PatientMetrics; 