"use client";

import { Card, Row, Col, Statistic, List, Tag, Button } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

const ReceptionistStats = () => {
  const appointments = [
    { id: 1, name: 'John Doe', time: '10:00 AM', status: 'Confirmed', type: 'New Patient' },
    { id: 2, name: 'Jane Smith', time: '10:30 AM', status: 'Pending', type: 'Follow-up' },
    { id: 3, name: 'Mike Johnson', time: '11:00 AM', status: 'Confirmed', type: 'Check-up' },
  ];

  return (
    <div className="receptionist-stats">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Today's Appointments</span>}
              value={15}
              prefix={<CalendarOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>New Registrations</span>}
              value={3}
              prefix={<UserOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Payments Collected</span>}
              value={1250}
              prefix={<DollarOutlined style={{ color: 'var(--color-primary)' }} />}
              precision={2}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card 
            title="Upcoming Appointments" 
            extra={<Button type="primary">Add Appointment</Button>}
            className="dashboard-card"
          >
            <List
              dataSource={appointments}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="call" icon={<PhoneOutlined />}>Call</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.name}
                    description={`${item.time} - ${item.type}`}
                  />
                  <Tag color={item.status === 'Confirmed' ? 'green' : 'orange'}>
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

export default ReceptionistStats; 