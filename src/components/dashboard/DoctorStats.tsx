"use client";

import { Card, Row, Col, Statistic, List, Tag, Avatar } from 'antd';
import {
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const DoctorStats = () => {
  const upcomingAppointments = [
    { id: 1, patient: 'John Doe', time: '10:00 AM', type: 'Check-up' },
    { id: 2, patient: 'Jane Smith', time: '11:30 AM', type: 'Follow-up' },
    { id: 3, patient: 'Mike Johnson', time: '2:00 PM', type: 'Consultation' },
  ];

  return (
    <div className="doctor-stats">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>My Patients</span>}
              value={150}
              prefix={<UserOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Today's Appointments</span>}
              value={8}
              prefix={<CalendarOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Pending Reports</span>}
              value={3}
              prefix={<FileTextOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card 
            title="Upcoming Appointments" 
            className="dashboard-card"
          >
            <List
              dataSource={upcomingAppointments}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.patient}
                    description={
                      <>
                        <ClockCircleOutlined /> {item.time}
                        <Tag color="blue" style={{ marginLeft: 8 }}>{item.type}</Tag>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DoctorStats; 