"use client";

import { Modal, Tabs, Descriptions, Tag, Timeline, Button, Space } from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import PatientEditModal from './PatientEditModal';
import { useState } from 'react';

interface PatientDetailModalProps {
  patient: any; // We'll type this properly once we have the full patient data
  open: boolean;
  onClose: () => void;
  onRefresh: (id: string) => Promise<void>;
}

const PatientDetailModal = ({ patient, open, onClose, onRefresh }: PatientDetailModalProps) => {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const router = useRouter();

  const items = [
    {
      key: 'basic',
      label: 'Basic Information',
      children: (
        <Descriptions bordered column={{ xs: 1, sm: 2, md: 3 }}>
          <Descriptions.Item label="Patient ID">{patient?.id}</Descriptions.Item>
          <Descriptions.Item label="Full Name">
            {`${patient?.firstName} ${patient?.lastName}`}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{patient?.gender}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {new Date(patient?.dateOfBirth).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Blood Group">{patient?.bloodGroup}</Descriptions.Item>
          <Descriptions.Item label="Email">{patient?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{patient?.phone}</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {patient?.address && (
              <>
                {patient.address.street}, {patient.address.city},<br />
                {patient.address.state} {patient.address.zipCode}
              </>
            )}
          </Descriptions.Item>
        </Descriptions>
      ),
    },
    {
      key: 'medical',
      label: 'Medical History',
      children: (
        <div className="medical-history-section">
          <div className="section-content">
            <h3 className="section-title">Conditions</h3>
            <Timeline
              items={patient?.medicalHistory?.map((history: any) => ({
                children: (
                  <div>
                    <h4>{history.condition}</h4>
                    <p>Diagnosis: {history.diagnosis}</p>
                    <p>Year: {history.year}</p>
                  </div>
                ),
              }))}
            />
          </div>

          <div className="section-content">
            <h3 className="section-title">Allergies</h3>
            <Space wrap>
              {patient?.allergies?.map((allergy: any) => (
                <Tag key={allergy.id} color="red">{allergy.name}</Tag>
              ))}
            </Space>
          </div>
        </div>
      ),
    },
    {
      key: 'emergency',
      label: 'Emergency Contacts',
      children: (
        <div className="emergency-contacts-section">
          {patient?.emergencyContacts?.map((contact: any) => (
            <Descriptions key={contact.id} bordered column={1} className="mb-md">
              <Descriptions.Item label="Name">{contact.name}</Descriptions.Item>
              <Descriptions.Item label="Relationship">
                {contact.relationship}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">{contact.phone}</Descriptions.Item>
            </Descriptions>
          ))}
        </div>
      ),
    },
    {
      key: 'notes',
      label: 'Notes',
      children: (
        <div className="notes-section">
          <p>{patient?.notes || 'No notes available.'}</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onCancel={onClose}
        width="90vw"
        style={{ top: 20 }}
        className="patient-detail-modal"
        footer={[
          <Button key="close" onClick={onClose} icon={<CloseOutlined />}>
            Close
          </Button>,
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setEditModalVisible(true)}
          >
            Edit Patient
          </Button>,
        ]}
      >
        <div className="patient-detail-content">
          <h2 className="patient-name">{`${patient?.firstName} ${patient?.lastName}`}</h2>
          <Tabs items={items} />
        </div>
      </Modal>

      <PatientEditModal
        patient={patient}
        open={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSuccess={async () => {
          setEditModalVisible(false);
          if (patient?.id) {
            await onRefresh(patient.id);
          }
        }}
      />
    </>
  );
};

export default PatientDetailModal; 