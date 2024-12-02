"use client";

import { useState, useEffect } from 'react';
import { Table, Button, Tag, Space, Modal, message, Tabs } from 'antd';
import { PlusOutlined, CalendarOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppointmentForm from '@/components/appointments/AppointmentForm';
import AppointmentDetailModal from '@/components/appointments/AppointmentDetailModal';
import Calendar from '@/components/appointments/Calendar';
import { formatDate } from '@/lib/utils';
import '@/styles/calendar.css';

const { TabPane } = Tabs;

interface Appointment {
  id: string;
  patientId: string;
  patient: {
    firstName: string;
    lastName: string;
  };
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  type: string;
  notes?: string;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/appointments');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      message.error('Failed to fetch appointments');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');
      
      message.success('Appointment status updated');
      fetchAppointments();
    } catch (error) {
      message.error('Failed to update status');
      console.error('Update error:', error);
    }
  };

  const getStatusTag = (status: string) => {
    const colors = {
      PENDING: 'gold',
      CONFIRMED: 'green',
      COMPLETED: 'blue',
      CANCELLED: 'red',
    };
    return (
      <Tag color={colors[status as keyof typeof colors]}>
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </Tag>
    );
  };

  const columns = [
    {
      title: 'Patient',
      key: 'patient',
      render: (record: Appointment) => 
        `${record.patient.firstName} ${record.patient.lastName}`,
    },
    {
      title: 'Date',
      key: 'date',
      render: (record: Appointment) => 
        formatDate(record.timeSlot.startTime, 'MMM DD, YYYY'),
      sorter: (a: Appointment, b: Appointment) =>
        new Date(a.timeSlot.startTime).getTime() - 
        new Date(b.timeSlot.startTime).getTime(),
    },
    {
      title: 'Time',
      key: 'time',
      render: (record: Appointment) => 
        `${formatDate(record.timeSlot.startTime, 'HH:mm')} - 
         ${formatDate(record.timeSlot.endTime, 'HH:mm')}`,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: Appointment) => (
        <Space>
          {getStatusTag(record.status)}
          <Button.Group size="small">
            {record.status === 'PENDING' && (
              <>
                <Button 
                  type="link" 
                  onClick={() => handleStatusChange(record.id, 'CONFIRMED')}
                >
                  Confirm
                </Button>
                <Button 
                  type="link" 
                  danger 
                  onClick={() => handleStatusChange(record.id, 'CANCELLED')}
                >
                  Cancel
                </Button>
              </>
            )}
            {record.status === 'CONFIRMED' && (
              <Button 
                type="link" 
                onClick={() => handleStatusChange(record.id, 'COMPLETED')}
              >
                Complete
              </Button>
            )}
          </Button.Group>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Appointment) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => router.push(`/appointments/${record.id}`)}
          >
            View
          </Button>
          <Button 
            type="link" 
            onClick={() => router.push(`/appointments/${record.id}/edit`)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const calendarEvents = appointments.map(appointment => ({
    id: appointment.id,
    title: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
    start: appointment.timeSlot.startTime,
    end: appointment.timeSlot.endTime,
    status: appointment.status,
    type: appointment.type,
    patient: appointment.patient,
  }));

  return (
    <ProtectedRoute requiredPermission="view_appointments">
      <div className="appointments-container">
        <div className="appointments-header">
          <h1 className="appointments-title">Appointments</h1>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalVisible(true)}
          >
            New Appointment
          </Button>
        </div>

        <Tabs defaultActiveKey="list">
          <TabPane 
            tab={
              <span>
                <UnorderedListOutlined />
                List View
              </span>
            } 
            key="list"
          >
            <Table
              columns={columns}
              dataSource={appointments}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} appointments`,
              }}
            />
          </TabPane>
          <TabPane 
            tab={
              <span>
                <CalendarOutlined />
                Calendar View
              </span>
            } 
            key="calendar"
          >
            <Calendar
              events={calendarEvents}
              onEventClick={setSelectedAppointment}
            />
          </TabPane>
        </Tabs>

        <AppointmentForm
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSuccess={() => {
            setModalVisible(false);
            fetchAppointments();
          }}
        />

        {selectedAppointment && (
          <AppointmentDetailModal
            appointment={selectedAppointment}
            visible={!!selectedAppointment}
            onClose={() => setSelectedAppointment(null)}
            onUpdate={fetchAppointments}
          />
        )}
      </div>
    </ProtectedRoute>
  );
} 