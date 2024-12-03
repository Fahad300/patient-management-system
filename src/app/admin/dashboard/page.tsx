"use client";

import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Button, Table, Tag, Space, Progress } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  MedicineBoxOutlined,
  HeartOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  RiseOutlined,
  FallOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ComponentLoader from '@/components/common/ComponentLoader';

interface DashboardStats {
  overview: {
    totalPatients: number;
    totalDoctors: number;
    totalNurses: number;
    totalAppointments: number;
    revenue: number;
    growth: number;
  };
  doctors: {
    available: number;
    onLeave: number;
    utilization: number;
    specialtyDistribution: Array<{ name: string; value: number }>;
    performanceData: Array<{ name: string; consultations: number }>;
  };
  nurses: {
    onDuty: number;
    offDuty: number;
    utilization: number;
    shiftDistribution: Array<{ name: string; value: number }>;
  };
  patients: {
    newToday: number;
    inQueue: number;
    satisfaction: number;
    ageDistribution: Array<{ age: string; count: number }>;
    appointmentTrend: Array<{ date: string; appointments: number }>;
  };
  appointments: {
    today: number;
    completed: number;
    cancelled: number;
    pending: number;
    typeDistribution: Array<{ type: string; count: number }>;
  };
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setStats({
        overview: {
          totalPatients: 1500,
          totalDoctors: 50,
          totalNurses: 100,
          totalAppointments: 450,
          revenue: 250000,
          growth: 15,
        },
        doctors: {
          available: 35,
          onLeave: 5,
          utilization: 85,
          specialtyDistribution: [
            { name: 'General Medicine', value: 15 },
            { name: 'Pediatrics', value: 10 },
            { name: 'Cardiology', value: 8 },
            { name: 'Orthopedics', value: 7 },
            { name: 'Others', value: 10 },
          ],
          performanceData: [
            { name: 'Mon', consultations: 45 },
            { name: 'Tue', consultations: 52 },
            { name: 'Wed', consultations: 48 },
            { name: 'Thu', consultations: 55 },
            { name: 'Fri', consultations: 50 },
          ],
        },
        nurses: {
          onDuty: 80,
          offDuty: 20,
          utilization: 78,
          shiftDistribution: [
            { name: 'Morning', value: 40 },
            { name: 'Afternoon', value: 35 },
            { name: 'Night', value: 25 },
          ],
        },
        patients: {
          newToday: 12,
          inQueue: 8,
          satisfaction: 92,
          ageDistribution: [
            { age: '0-18', count: 300 },
            { age: '19-35', count: 450 },
            { age: '36-50', count: 400 },
            { age: '51-70', count: 250 },
            { age: '70+', count: 100 },
          ],
          appointmentTrend: [
            { date: 'Mon', appointments: 85 },
            { date: 'Tue', appointments: 92 },
            { date: 'Wed', appointments: 88 },
            { date: 'Thu', appointments: 95 },
            { date: 'Fri', appointments: 90 },
          ],
        },
        appointments: {
          today: 150,
          completed: 95,
          cancelled: 10,
          pending: 45,
          typeDistribution: [
            { type: 'Consultation', count: 60 },
            { type: 'Follow-up', count: 40 },
            { type: 'Procedure', count: 30 },
            { type: 'Emergency', count: 20 },
          ],
        },
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <ComponentLoader size={40} text="Loading admin dashboard..." />;
  }

  return (
    <div className="admin-dashboard p-6">
      {/* Overview Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={false} className="statistic-card">
            <Statistic
              title="Total Patients"
              value={stats?.overview.totalPatients}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="mt-2">
              <Tag color="blue">+{stats?.patients.newToday} today</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Card bordered={false} className="statistic-card">
            <Statistic
              title="Total Doctors"
              value={stats?.overview.totalDoctors}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="mt-2">
              <Tag color="green">{stats?.doctors.available} available</Tag>
            </div>
          </Card>
        </Col>
        {/* Add more overview statistics */}
      </Row>

      {/* Charts Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={12}>
          <Card title="Patient Appointments Trend" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats?.patients.appointmentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="appointments"
                  stroke="#1890ff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Doctor Performance" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.doctors.performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="consultations" fill="#52c41a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Distribution Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={8}>
          <Card title="Patient Age Distribution" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.patients.ageDistribution}
                  dataKey="count"
                  nameKey="age"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#1890ff"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Doctor Specialty Distribution" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.doctors.specialtyDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#52c41a"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Nurse Shift Distribution" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats?.nurses.shiftDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#faad14"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
