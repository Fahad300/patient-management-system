"use client";

import { Card, Row, Col, Statistic } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ComponentLoader from '@/components/common/ComponentLoader';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { 
      title: 'Total Patients',
      value: 1250,
      icon: <UserOutlined style={{ color: 'var(--color-primary)' }} />
    },
    {
      title: 'Appointments Today',
      value: 25,
      icon: <CalendarOutlined style={{ color: 'var(--color-primary)' }} />
    },
    {
      title: 'Pending Appointments',
      value: 8,
      icon: <ClockCircleOutlined style={{ color: 'var(--color-primary)' }} />
    }
  ];

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
          {stats.map((stat, index) => (
            <Col xs={24} sm={8} key={index}>
              {isLoading ? (
                <ComponentLoader type="statistics" />
              ) : (
                <Card 
                  className="dashboard-card"
                  style={{ 
                    backgroundColor: 'var(--color-component-background)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <Statistic
                    title={<span style={{ color: 'var(--color-text-secondary)' }}>{stat.title}</span>}
                    value={stat.value}
                    prefix={stat.icon}
                    valueStyle={{ color: 'var(--color-text-primary)' }}
                  />
                </Card>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}