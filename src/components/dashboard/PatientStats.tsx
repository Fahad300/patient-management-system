"use client";

import { Card, Row, Col, Statistic, List, Tag, Timeline } from 'antd';
import {
  CalendarOutlined,
  MedicineBoxOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const PatientStats = () => {
  const upcomingAppointments = [
    { date: '2024-02-15', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Check-up' },
    { date: '2024-02-28', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'Follow-up' },
  ];

  const medications = [
    { name: 'Medication A', dosage: '1 pill', frequency: 'Twice daily', remaining: 10 },
    { name: 'Medication B', dosage: '2 pills', frequency: 'Morning', remaining: 15 },
  ];

  return (
    <div className="patient-stats">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Next Appointment</span>}
              value="Feb 15"
              prefix={<CalendarOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Active Medications</span>}
              value={2}
              prefix={<MedicineBoxOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card className="dashboard-card">
            <Statistic
              title={<span style={{ color: 'var(--color-text-secondary)' }}>Recent Reports</span>}
              value={3}
              prefix={<FileTextOutlined style={{ color: 'var(--color-primary)' }} />}
              valueStyle={{ color: 'var(--color-text-primary)' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="Upcoming Appointments" className="dashboard-card">
            <Timeline
              items={upcomingAppointments.map(apt => ({
                color: 'blue',
                dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                children: (
                  <>
                    <div>{apt.date} at {apt.time}</div>
                    <div style={{ color: 'var(--color-text-secondary)' }}>
                      {apt.doctor} - {apt.type}
                    </div>
                  </>
                ),
              }))}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Current Medications" className="dashboard-card">
            <List
              dataSource={medications}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    title={item.name}
                    description={`${item.dosage} - ${item.frequency}`}
                  />
                  <Tag color={item.remaining > 5 ? 'green' : 'orange'}>
                    {item.remaining} remaining
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

export default PatientStats; 