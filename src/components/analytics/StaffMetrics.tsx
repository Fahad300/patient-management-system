"use client";

import React from 'react';
import { Card, Table, Rate } from 'antd';

interface StaffMetricsProps {
  timeRange: string;
  dateRange: [Date, Date] | null;
}

const StaffMetrics = ({ timeRange, dateRange }: StaffMetricsProps) => {
  // Implementation for staff performance metrics
  return (
    <Card title="Staff Performance" className="metric-card">
      {/* Staff performance metrics */}
    </Card>
  );
};

export default StaffMetrics; 