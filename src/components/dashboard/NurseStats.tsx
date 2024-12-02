"use client";

import { Card, Row, Col, Statistic, List, Tag } from 'antd';
import {
  UserOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  AlertOutlined,
} from '@ant-design/icons';

const NurseStats = () => {
  const patientVitals = [
    { id: 1, patient: 'Room 101 - John Doe', status: 'Normal', time: '09:30 AM' },
    { id: 2, patient: 'Room 102 - Jane Smith', status: 'Attention', time: '09:45 AM' },
    { id: 3, patient: 'Room 105 - Mike Johnson', status: 'Normal', time: '10:00 AM' },
  ];

  return (
    <div className="nurse-stats">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Assigned Patients</span>}
              value={12}
              prefix={<UserOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Pending Vitals</span>}
              value={3}
              prefix={<HeartOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Medication Due</span>}
              value={5}
              prefix={<MedicineBoxOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card 
            title="Recent Vitals Checks" 
            className="dashboard-card"
          >
            <List
              dataSource={patientVitals}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<AlertOutlined />}
                    title={item.patient}
                    description={item.time}
                  />
                  <Tag color={item.status === 'Normal' ? 'green' : 'orange'}>
                    {item.status}
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NurseStats; 