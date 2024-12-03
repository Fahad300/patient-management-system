"use client";

import React, { useState, useEffect } from 'react';
import { Table, Card, Button, Space, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import { FilePdfOutlined, PlusOutlined, PrinterOutlined, HistoryOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ComponentLoader from '@/components/common/ComponentLoader';
import PrescriptionForm from '@/components/prescriptions/PrescriptionForm';
import { formatDate } from '@/lib/utils';

const { TextArea } = Input;

interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface Prescription {
  id: string;
  patientId: string;
  patient: {
    firstName: string;
    lastName: string;
  };
  medications: Medication[];
  diagnosis: string;
  notes?: string;
  date: string;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  createdBy: string;
}

const PrescriptionManagement = () => {
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [viewMode, setViewMode] = useState<'view' | 'edit'>('view');

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setPrescriptions([
        {
          id: '1',
          patientId: 'p1',
          patient: {
            firstName: 'John',
            lastName: 'Doe',
          },
          medications: [
            {
              name: 'Amoxicillin',
              dosage: '500mg',
              frequency: 'Three times daily',
              duration: '7 days',
            },
          ],
          diagnosis: 'Bacterial Infection',
          notes: 'Take with food',
          date: '2024-03-15',
          status: 'ACTIVE',
          createdBy: 'Dr. Smith',
        },
        // Add more mock prescriptions
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleGeneratePDF = async (prescription: Prescription) => {
    try {
      const response = await fetch(`/api/prescriptions/${prescription.id}/pdf`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to generate PDF');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `prescription-${prescription.id}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      message.error('Failed to generate PDF');
    }
  };

  const handlePrint = (prescription: Prescription) => {
    // Implement print functionality
    window.print();
  };

  const columns: ColumnsType<Prescription> = [
    {
      title: 'Patient',
      key: 'patient',
      render: (record: Prescription) => (
        `${record.patient.firstName} ${record.patient.lastName}`
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => formatDate(date, 'MMM DD, YYYY'),
    },
    {
      title: 'Diagnosis',
      dataIndex: 'diagnosis',
      key: 'diagnosis',
    },
    {
      title: 'Medications',
      key: 'medications',
      render: (record: Prescription) => (
        <ul className="list-none p-0">
          {record.medications.map((med, index) => (
            <li key={index}>
              {med.name} - {med.dosage} ({med.frequency})
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: Prescription) => {
        const colors = {
          ACTIVE: 'green',
          COMPLETED: 'blue',
          CANCELLED: 'red',
        };
        return (
          <Tag color={colors[record.status]}>
            {record.status}
          </Tag>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: Prescription) => (
        <Space>
          <Button
            icon={<FilePdfOutlined />}
            onClick={() => handleGeneratePDF(record)}
          >
            PDF
          </Button>
          <Button
            icon={<PrinterOutlined />}
            onClick={() => handlePrint(record)}
          >
            Print
          </Button>
          <Button
            type="link"
            onClick={() => {
              setSelectedPrescription(record);
              setViewMode('view');
              setModalVisible(true);
            }}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];

  if (loading) {
    return <ComponentLoader type="table" />;
  }

  return (
    <div className="prescriptions-container">
      <div className="page-header">
        <h1 className="page-title">Prescriptions</h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedPrescription(null);
            setViewMode('edit');
            setModalVisible(true);
          }}
        >
          New Prescription
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={prescriptions}
          rowKey="id"
        />
      </Card>

      <Modal
        title={viewMode === 'edit' ? 'New Prescription' : 'View Prescription'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        width={800}
        footer={null}
      >
        <PrescriptionForm
          prescription={selectedPrescription}
          mode={viewMode}
          onSubmit={async (values) => {
            try {
              // API call to create/update prescription
              message.success('Prescription saved successfully');
              setModalVisible(false);
              // Refresh prescriptions
            } catch (error) {
              message.error('Failed to save prescription');
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default PrescriptionManagement; 