"use client";

import { useState } from 'react';
import { Modal, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import type { RcFile } from 'antd/es/upload';

interface ImportPatientsModalProps {
  open: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const ImportPatientsModal = ({ open, onCancel, onSuccess }: ImportPatientsModalProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const beforeUpload = (file: RcFile) => {
    const isJSON = file.type === 'application/json';
    if (!isJSON) {
      message.error('You can only upload JSON files!');
      return false;
    }
    setFileList([file]);
    return false;
  };

  const handleUpload = async () => {
    const file = fileList[0] as RcFile;
    if (!file) {
      message.error('Please select a file first!');
      return;
    }

    setUploading(true);
    try {
      const fileContent = await file.text();
      const patients = JSON.parse(fileContent);

      const response = await fetch('/api/patients/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patients }),
      });

      if (!response.ok) throw new Error('Import failed');

      message.success('Patients imported successfully');
      setFileList([]);
      onSuccess();
      onCancel();
    } catch (error) {
      console.error('Import error:', error);
      message.error('Failed to import patients');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title="Import Patients from JSON"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleUpload}
          loading={uploading}
          disabled={fileList.length === 0}
        >
          Import
        </Button>,
      ]}
    >
      <Upload
        beforeUpload={beforeUpload}
        maxCount={1}
        fileList={fileList}
        onRemove={() => setFileList([])}
      >
        <Button icon={<UploadOutlined />}>Select JSON File</Button>
      </Upload>
      <div className="import-help mt-4">
        <h4>JSON Format Example:</h4>
        <pre>
          {JSON.stringify([
            {
              firstName: "John",
              lastName: "Doe",
              dateOfBirth: "1985-03-15",
              gender: "male",
              email: "john@example.com",
              phone: "555-0101",
              bloodGroup: "O+",
              address: {
                street: "123 Main St",
                city: "Springfield",
                state: "IL",
                zipCode: "62701"
              }
            }
          ], null, 2)}
        </pre>
      </div>
    </Modal>
  );
};

export default ImportPatientsModal; 