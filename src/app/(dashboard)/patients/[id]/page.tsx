"use client";

import { useEffect, useState } from 'react';
import { Card, Descriptions, Button, Space, Tabs, List, Tag, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Patient } from '@/lib/db/patients';

interface PatientDetailPageProps {
  params: { id: string };
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchPatient();
  }, [params.id]);

  const fetchPatient = async () => {
    try {
      const response = await fetch(`/api/patients/${params.id}`);
      if (!response.ok) throw new Error('Patient not found');
      const data = await response.json();
      setPatient(data);
    } catch (error) {
      message.error('Failed to fetch patient details');
      router.push('/patients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this patient?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          const response = await fetch(`/api/patients/${params.id}`, {
            method: 'DELETE',
          });
          if (!response.ok) throw new Error('Failed to delete');
          message.success('Patient deleted successfully');
          router.push('/patients');
        } catch (error) {
          message.error('Failed to delete patient');
        }
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (!patient) return <div>Patient not found</div>;

  const items = [
    {
      key: 'basic',
      label: 'Basic Information',
      children: (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Patient ID">{patient.id}</Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {`${patient.firstName} ${patient.lastName}`}
          </Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {new Date(patient.dateOfBirth).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{patient.gender}</Descriptions.Item>
          <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{patient.phone}</Descriptions.Item>
          <Descriptions.Item label="Blood Group">{patient.bloodGroup}</Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: 'address',
      label: 'Address',
      children: (
        <Descriptions bordered>
          <Descriptions.Item label="Street">{patient.address.street}</Descriptions.Item>
          <Descriptions.Item label="City">{patient.address.city}</Descriptions.Item>
          <Descriptions.Item label="State">{patient.address.state}</Descriptions.Item>
          <Descriptions.Item label="ZIP Code">{patient.address.zipCode}</Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: 'medical',
      label: 'Medical History',
      children: (
        <>
          <h3 className="mb-4">Medical Conditions</h3>
          <List
            dataSource={patient.medicalHistory}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={item.condition}
                  description={`Diagnosed: ${item.year}`}
                />
                <div>{item.diagnosis}</div>
              </List.Item>
            )}
          />

          <h3 className="mt-6 mb-4">Allergies</h3>
          <Space wrap>
            {patient.allergies.map((allergy, index) => (
              <Tag key={index} color="red">{allergy}</Tag>
            ))}
          </Space>
        </>
      ),
    },
    {
      key: 'emergency',
      label: 'Emergency Contacts',
      children: (
        <List
          dataSource={patient.emergencyContacts}
          renderItem={contact => (
            <List.Item>
              <List.Item.Meta
                title={contact.name}
                description={`${contact.relationship} - ${contact.phone}`}
              />
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <ProtectedRoute requiredPermission="view_patients">
      <div className="page-container">
        <div className="flex justify-between items-center mb-6">
          <h1 className="page-title">Patient Details</h1>
          <Space>
            <Button
              icon={<EditOutlined />}
              onClick={() => router.push(`/patients/${params.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Space>
        </div>

        <Card>
          <Tabs items={items} />
        </Card>
      </div>
    </ProtectedRoute>
  );
} 