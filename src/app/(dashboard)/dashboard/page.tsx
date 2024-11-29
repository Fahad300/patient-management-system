"use client";

import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header" style={{ 
        color: 'var(--color-text-primary)',
        fontSize: 'var(--font-size-xl)'
      }}>
        Dashboard
      </h1>
      
      <div className="dashboard-content">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card 
              className="dashboard-card"
              style={{ 
                backgroundColor: 'var(--color-component-background)',
                border: '1px solid var(--color-border)'
              }}
            >
              <Statistic
                title={<span style={{ color: 'var(--color-text-secondary)' }}>Total Patients</span>}
                value={1250}
                prefix={<UserOutlined style={{ color: 'var(--color-primary)' }} />}
                valueStyle={{ color: 'var(--color-text-primary)' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              className="dashboard-card"
              style={{ 
                backgroundColor: 'var(--color-component-background)',
                border: '1px solid var(--color-border)'
              }}
            >
              <Statistic
                title={<span style={{ color: 'var(--color-text-secondary)' }}>Appointments Today</span>}
                value={25}
                prefix={<CalendarOutlined style={{ color: 'var(--color-primary)' }} />}
                valueStyle={{ color: 'var(--color-text-primary)' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              className="dashboard-card"
              style={{ 
                backgroundColor: 'var(--color-component-background)',
                border: '1px solid var(--color-border)'
              }}
            >
              <Statistic
                title={<span style={{ color: 'var(--color-text-secondary)' }}>Pending Appointments</span>}
                value={8}
                prefix={<ClockCircleOutlined style={{ color: 'var(--color-primary)' }} />}
                valueStyle={{ color: 'var(--color-text-primary)' }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
} 