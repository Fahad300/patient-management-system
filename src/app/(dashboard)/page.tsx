"use client";

import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Spin } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import dynamic from 'next/dynamic';

// Dynamically import Recharts components with no SSR
const LineChart = dynamic(() => import('recharts').then(mod => mod.LineChart), { ssr: false });
const Line = dynamic(() => import('recharts').then(mod => mod.Line), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const PieChart = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

// Sample data for charts
const patientTrends = [
  { month: 'Jan', patients: 65, appointments: 120 },
  { month: 'Feb', patients: 78, appointments: 145 },
  { month: 'Mar', patients: 82, appointments: 160 },
  { month: 'Apr', patients: 95, appointments: 185 },
  { month: 'May', patients: 110, appointments: 195 },
  { month: 'Jun', patients: 125, appointments: 220 },
];

const revenueData = [
  { name: 'Consultations', value: 45000 },
  { name: 'Procedures', value: 28000 },
  { name: 'Lab Tests', value: 15000 },
  { name: 'Medications', value: 12000 },
];

const departmentStats = [
  { department: 'Cardiology', patients: 120, revenue: 35000 },
  { department: 'Pediatrics', patients: 95, revenue: 28000 },
  { department: 'Orthopedics', patients: 85, revenue: 32000 },
  { department: 'Neurology', patients: 65, revenue: 30000 },
  { department: 'Dermatology', patients: 75, revenue: 25000 },
];

const recentAppointments = [
  { key: '1', patient: 'John Doe', type: 'Consultation', status: 'Completed', time: '09:00 AM' },
  { key: '2', patient: 'Jane Smith', type: 'Follow-up', status: 'Pending', time: '10:30 AM' },
  { key: '3', patient: 'Mike Johnson', type: 'Lab Test', status: 'In Progress', time: '11:45 AM' },
  { key: '4', patient: 'Sarah Wilson', type: 'Procedure', status: 'Scheduled', time: '02:15 PM' },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Overview Statistics */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Patients"
              value={1250}
              prefix={<UserOutlined />}
              suffix={
                <small className="trend-up">
                  <ArrowUpOutlined /> 15%
                </small>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Appointments Today"
              value={48}
              prefix={<CalendarOutlined />}
              suffix={
                <small className="trend-up">
                  <ArrowUpOutlined /> 8%
                </small>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Revenue (Monthly)"
              value={102350}
              prefix={<DollarOutlined />}
              precision={2}
              suffix={
                <small className="trend-up">
                  <ArrowUpOutlined /> 12%
                </small>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Staff"
              value={32}
              prefix={<TeamOutlined />}
              suffix={
                <small className="trend-down">
                  <ArrowDownOutlined /> 2%
                </small>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Row 1 */}
      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24} lg={16}>
          <Card title="Patient & Appointment Trends">
            {isLoading ? (
              <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spin size="large" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={patientTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="patients" stroke="#8884d8" name="Patients" />
                  <Line type="monotone" dataKey="appointments" stroke="#82ca9d" name="Appointments" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Revenue Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Charts Row 2 */}
      <Row gutter={[16, 16]} className="charts-row">
        <Col xs={24} lg={12}>
          <Card title="Department Performance">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="patients" fill="#8884d8" name="Patients" />
                <Bar dataKey="revenue" fill="#82ca9d" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Recent Appointments">
            <Table
              dataSource={recentAppointments}
              columns={[
                { title: 'Patient', dataIndex: 'patient', key: 'patient' },
                { title: 'Type', dataIndex: 'type', key: 'type' },
                { title: 'Status', dataIndex: 'status', key: 'status' },
                { title: 'Time', dataIndex: 'time', key: 'time' },
              ]}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}