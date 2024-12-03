"use client";

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Select, DatePicker, Space } from 'antd';
import { 
  UserOutlined, 
  RiseOutlined, 
  CalendarOutlined, 
  DollarOutlined 
} from '@ant-design/icons';
import PatientMetrics from '@/components/analytics/PatientMetrics';
import AppointmentMetrics from '@/components/analytics/AppointmentMetrics';
import RevenueMetrics from '@/components/analytics/RevenueMetrics';
import StaffMetrics from '@/components/analytics/StaffMetrics';
import ComponentLoader from '@/components/common/ComponentLoader';
import '@/styles/analytics.css';

const { RangePicker } = DatePicker;

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null);

  useEffect(() => {
    // Simulated data loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const overviewStats = {
    totalPatients: 1250,
    newPatients: 45,
    totalAppointments: 320,
    revenue: 52000,
  };

  if (loading) {
    return <ComponentLoader type="page" />;
  }

  return (
    <div className="analytics-container">
      <div className="page-header">
        <h1 className="page-title">Analytics & Reports</h1>
        <Space>
          <Select
            value={timeRange}
            onChange={setTimeRange}
            style={{ width: 120 }}
          >
            <Select.Option value="week">This Week</Select.Option>
            <Select.Option value="month">This Month</Select.Option>
            <Select.Option value="quarter">This Quarter</Select.Option>
            <Select.Option value="year">This Year</Select.Option>
          </Select>
          <RangePicker 
            onChange={(_, dateStrings) => {
              if (dateStrings[0] && dateStrings[1]) {
                setDateRange([new Date(dateStrings[0]), new Date(dateStrings[1])]);
              } else {
                setDateRange(null);
              }
            }}
          />
        </Space>
      </div>

      <Row gutter={[16, 16]} className="overview-stats">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Patients"
              value={overviewStats.totalPatients}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="New Patients"
              value={overviewStats.newPatients}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Appointments"
              value={overviewStats.totalAppointments}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={overviewStats.revenue}
              prefix={<DollarOutlined />}
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <PatientMetrics timeRange={timeRange} dateRange={dateRange} />
        </Col>
        <Col xs={24} lg={12}>
          <AppointmentMetrics timeRange={timeRange} dateRange={dateRange} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} lg={16}>
          <RevenueMetrics timeRange={timeRange} dateRange={dateRange} />
        </Col>
        <Col xs={24} lg={8}>
          <StaffMetrics timeRange={timeRange} dateRange={dateRange} />
        </Col>
      </Row>
    </div>
  );
};

export default AnalyticsPage; 