"use client";

import React, { useState, useEffect } from 'react';
import { Table, Card, Tag, Button, Space, Statistic, Row, Col, Modal, Form, Input, Select } from 'antd';
import { UserOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ComponentLoader from '@/components/common/ComponentLoader';

interface QueueEntry {
  id: string;
  patient: {
    id: string;
    firstName: string;
    lastName: string;
  };
  appointment: {
    type: string;
    timeSlot: {
      startTime: string;
    };
  };
  status: 'WAITING' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED';
  priority: number;
  checkInTime: string;
  startTime?: string;
  endTime?: string;
  notes?: string;
}

const QueueManagement = () => {
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [stats, setStats] = useState({
    waiting: 0,
    inConsultation: 0,
    completed: 0,
    averageWaitTime: '25 mins',
  });

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setQueue([
        {
          id: '1',
          patient: {
            id: 'p1',
            firstName: 'John',
            lastName: 'Doe',
          },
          appointment: {
            type: 'Consultation',
            timeSlot: {
              startTime: '2024-03-15T09:00:00',
            },
          },
          status: 'WAITING',
          priority: 1,
          checkInTime: '2024-03-15T08:45:00',
        },
        // Add more mock data
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusChange = async (id: string, newStatus: QueueEntry['status']) => {
    try {
      // API call to update status
      const response = await fetch(`/api/queue/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      // Refresh queue data
      // fetchQueue();
    } catch (error) {
      console.error('Status update error:', error);
    }
  };

  const columns: ColumnsType<QueueEntry> = [
    {
      title: 'Patient',
      key: 'patient',
      render: (record: QueueEntry) => (
        <Space direction="vertical" size="small">
          <span>{`${record.patient.firstName} ${record.patient.lastName}`}</span>
          <Tag>{record.appointment.type}</Tag>
        </Space>
      ),
    },
    {
      title: 'Check-in Time',
      dataIndex: 'checkInTime',
      render: (time: string) => new Date(time).toLocaleTimeString(),
    },
    {
      title: 'Wait Time',
      key: 'waitTime',
      render: (record: QueueEntry) => {
        const start = new Date(record.checkInTime);
        const end = record.startTime ? new Date(record.startTime) : new Date();
        const diff = Math.floor((end.getTime() - start.getTime()) / 1000 / 60);
        return `${diff} mins`;
      },
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: QueueEntry) => {
        const colors = {
          WAITING: 'gold',
          IN_CONSULTATION: 'processing',
          COMPLETED: 'success',
          CANCELLED: 'error',
        };
        return <Tag color={colors[record.status]}>{record.status.replace('_', ' ')}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: QueueEntry) => (
        <Space>
          {record.status === 'WAITING' && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleStatusChange(record.id, 'IN_CONSULTATION')}
            >
              Start Consultation
            </Button>
          )}
          {record.status === 'IN_CONSULTATION' && (
            <Button
              type="primary"
              size="small"
              onClick={() => handleStatusChange(record.id, 'COMPLETED')}
            >
              Complete
            </Button>
          )}
          <Button
            danger
            size="small"
            onClick={() => handleStatusChange(record.id, 'CANCELLED')}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <ComponentLoader type="table" />;
  }

  return (
    <div className="queue-container">
      <Row gutter={[16, 16]} className="queue-stats">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Waiting"
              value={stats.waiting}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="In Consultation"
              value={stats.inConsultation}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Completed Today"
              value={stats.completed}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Average Wait Time"
              value={stats.averageWaitTime}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Current Queue">
        <Table
          columns={columns}
          dataSource={queue}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default QueueManagement; 