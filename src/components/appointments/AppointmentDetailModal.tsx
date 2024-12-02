"use client";

import { Modal, Descriptions, Button, Space, Tag, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react';
import dayjs from 'dayjs';

interface AppointmentDetailModalProps {
  appointment: any;
  visible: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const AppointmentDetailModal = ({
  appointment,
  visible,
  onClose,
  onUpdate,
}: AppointmentDetailModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (status: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/appointments/${appointment?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      message.success('Appointment status updated');
      onUpdate();
    } catch (error) {
      console.error('Update error:', error);
      message.error('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/appointments/${appointment?.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete appointment');

      message.success('Appointment deleted');
      onClose();
      onUpdate();
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Failed to delete appointment');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: string) => {
    const colors = {
      PENDING: 'gold',
      CONFIRMED: 'green',
      COMPLETED: 'blue',
      CANCELLED: 'red',
    };
    return colors[status as keyof typeof colors];
  };

  // Early return if no appointment data
  if (!appointment) return null;

  return (
    <Modal
      title="Appointment Details"
      open={visible}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
      width={700}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Patient">
          {appointment?.patient ? 
            `${appointment.patient.firstName} ${appointment.patient.lastName}` : 
            'N/A'
          }
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          {appointment?.timeSlot?.startTime ? 
            dayjs(appointment.timeSlot.startTime).format('MMMM D, YYYY') : 
            'N/A'
          }
        </Descriptions.Item>
        <Descriptions.Item label="Time">
          {appointment?.timeSlot?.startTime && appointment?.timeSlot?.endTime ? 
            `${dayjs(appointment.timeSlot.startTime).format('HH:mm')} - 
             ${dayjs(appointment.timeSlot.endTime).format('HH:mm')}` : 
            'N/A'
          }
        </Descriptions.Item>
        <Descriptions.Item label="Type">
          {appointment?.type || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          <Space>
            <Tag color={getStatusTag(appointment?.status)}>
              {appointment?.status}
            </Tag>
            {appointment?.status === 'PENDING' && (
              <Space>
                <Button 
                  type="link" 
                  onClick={() => handleStatusChange('CONFIRMED')}
                  loading={loading}
                >
                  Confirm
                </Button>
                <Button 
                  type="link" 
                  danger
                  onClick={() => handleStatusChange('CANCELLED')}
                  loading={loading}
                >
                  Cancel
                </Button>
              </Space>
            )}
            {appointment?.status === 'CONFIRMED' && (
              <Button 
                type="link"
                onClick={() => handleStatusChange('COMPLETED')}
                loading={loading}
              >
                Complete
              </Button>
            )}
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Notes">
          {appointment?.notes || 'No notes'}
        </Descriptions.Item>
      </Descriptions>

      <div className="modal-actions" style={{ marginTop: 24 }}>
        <Space>
          <Button 
            icon={<EditOutlined />}
            onClick={() => {/* TODO: Implement edit */}}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Appointment"
            description="Are you sure you want to delete this appointment?"
            onConfirm={handleDelete}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />}
              loading={loading}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      </div>
    </Modal>
  );
};

export default AppointmentDetailModal; 