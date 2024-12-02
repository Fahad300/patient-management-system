"use client";

import { Card, Row, Col, Statistic, Progress } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  RiseOutlined,
  TeamOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const AdminStats = () => {
  return (
    <div className="admin-stats">
      {/* Main Stats */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Total Patients</span>}
              value={1250}
              prefix={<UserOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
            <div className="stat-footer" style={{ marginTop: 8, fontSize: 12, color: 'var(--color-success)' }}>
              <RiseOutlined /> 12% increase this month
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Today's Appointments</span>}
              value={25}
              prefix={<CalendarOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
            <div className="stat-footer" style={{ marginTop: 8, fontSize: 12 }}>
              <ClockCircleOutlined /> Next appointment in 30 mins
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Monthly Revenue</span>}
              value={52480}
              prefix={<DollarOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
              precision={2}
            />
            <div className="stat-footer" style={{ marginTop: 8, fontSize: 12, color: 'var(--color-success)' }}>
              <RiseOutlined /> 8% increase from last month
            </div>
          </Card>
        </Col>
      </Row>

      {/* Detailed Stats */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card 
            title="Department Overview" 
            className="dashboard-card"
            bodyStyle={{ padding: '12px 24px' }}
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Active Doctors"
                  value={28}
                  prefix={<TeamOutlined />}
                  valueStyle={{ fontSize: 20 }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Active Nurses"
                  value={45}
                  prefix={<TeamOutlined />}
                  valueStyle={{ fontSize: 20 }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card 
            title="Appointment Status" 
            className="dashboard-card"
            bodyStyle={{ padding: '12px 24px' }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col span={12}>
                <Progress
                  type="circle"
                  percent={75}
                  width={80}
                  format={percent => `${percent}%`}
                />
              </Col>
              <Col span={12}>
                <div style={{ color: 'var(--color-text-secondary)' }}>
                  <p>Confirmed: 18</p>
                  <p>Pending: 5</p>
                  <p>Cancelled: 2</p>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Revenue Summary */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card 
            title="Revenue Summary" 
            className="dashboard-card"
            bodyStyle={{ padding: '12px 24px' }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Today's Revenue"
                  value={2840}
                  prefix="$"
                  precision={2}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Weekly Revenue"
                  value={18650}
                  prefix="$"
                  precision={2}
                />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic
                  title="Outstanding Payments"
                  value={4280}
                  prefix="$"
                  precision={2}
                  valueStyle={{ color: 'var(--color-error)' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminStats; 