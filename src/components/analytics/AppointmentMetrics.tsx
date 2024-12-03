"use client";

import React from 'react';
import { Card, Row, Col, Progress, Table } from 'antd';
import { Line } from 'recharts';

interface AppointmentMetricsProps {
  timeRange: string;
  dateRange: [Date, Date] | null;
}

const AppointmentMetrics = ({ timeRange, dateRange }: AppointmentMetricsProps) => {
  // Implementation similar to PatientMetrics
  return (
    <Card title="Appointment Analytics" className="metric-card">
      {/* Chart and tables for appointment data */}
    </Card>
  );
};

export default AppointmentMetrics; 