"use client";

import { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Card, Statistic, message } from 'antd';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { formatDate } from '@/lib/utils';

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
  status: string;
  priority: number;
  checkInTime: string;
  startTime?: string;
  endTime?: string;
}

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    waiting: 0,
    inConsultation: 0,
    completed: 0,
  });

  const fetchQueue = async () => {
    try {
      const response = await fetch('/api/queue');
      if (!response.ok) throw new Error('Failed to fetch queue');
      const data = await response.json();
      setQueue(data);
      
      // Update stats
      const waiting = data.filter((entry: QueueEntry) => entry.status === 'WAITING').length;
      const inConsultation = data.filter((entry: QueueEntry) => entry.status === 'IN_CONSULTATION').length;
      const completed = data.filter((entry: QueueEntry) => entry.status === 'COMPLETED').length;
      setStats({ waiting, inConsultation, completed });
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    // Set up polling for real-time updates
    const interval = setInterval(fetchQueue, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/queue/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      message.success('Queue status updated');
      fetchQueue();
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update status');
    }
  };

  const getStatusTag = (status: string) => {
    const colors: Record<string, string> = {
      WAITING: 'gold',
      IN_CONSULTATION: 'processing',
      COMPLETED: 'success',
      CANCELLED: 'error',
    };
    return (
      <Tag color={colors[status]}>
        {status.replace('_', ' ')}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Patient',
      key: 'patient',
      render: (record: QueueEntry) => 
        `${record.patient.firstName} ${record.patient.lastName}`,
    },
    {
      title: 'Check-in Time',
      key: 'checkInTime',
      render: (record: QueueEntry) => 
        formatDate(record.checkInTime, 'HH:mm'),
      sorter: (a: QueueEntry, b: QueueEntry) =>
        new Date(a.checkInTime).getTime() - new Date(b.checkInTime).getTime(),
    },
    {
      title: 'Appointment Type',
      dataIndex: ['appointment', 'type'],
      key: 'type',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: QueueEntry) => (
        <Space>
          {getStatusTag(record.status)}
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
        </Space>
      ),
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
  ];

  return (
    <ProtectedRoute requiredPermission="view_queue">
      <div className="queue-container">
        <h1 className="page-title">Patient Queue</h1>
        
        <div className="queue-stats">
          <Card>
            <Space size="large">
              <Statistic 
                title="Waiting"
                value={stats.waiting}
                prefix={<ClockCircleOutlined />}
              />
              <Statistic
                title="In Consultation"
                value={stats.inConsultation}
                prefix={<UserOutlined />}
              />
              <Statistic
                title="Completed Today"
                value={stats.completed}
              />
            </Space>
          </Card>
        </div>

        <Table
          columns={columns}
          dataSource={queue}
          rowKey="id"
          loading={loading}
          pagination={false}
        />
      </div>
    </ProtectedRoute>
  );
} 