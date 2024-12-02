"use client";

import { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, Form, Input, Select, message } from 'antd';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import '@/styles/patients.css';
import ImportPatientsModal from '@/components/patients/ImportPatientsModal';
import PrintPatients from '@/components/patients/PrintPatients';
import PatientDetailModal from '@/components/patients/PatientDetailModal';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface FilterValues {
  searchText?: string;
  gender?: string;
  dateRange?: [string, string];
}

const PatientList = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [form] = Form.useForm();
  const router = useRouter();
  const [importModalVisible, setImportModalVisible] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch('/api/patients');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      message.error('Failed to fetch patients');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (values: FilterValues) => {
    setFilters(values);
    setFilterVisible(false);
  };

  const resetFilters = () => {
    form.resetFields();
    setFilters({});
    setFilterVisible(false);
  };

  const filteredPatients = patients.filter(patient => {
    const searchMatch = !filters.searchText || 
      patient.firstName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      patient.id.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      patient.email.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      patient.phone.includes(filters.searchText);

    const genderMatch = !filters.gender || patient.gender === filters.gender;

    return searchMatch && genderMatch;
  });

  const handleViewPatient = async (id: string) => {
    try {
      const response = await fetch(`/api/patients/${id}`);
      if (!response.ok) throw new Error('Failed to fetch patient details');
      const data = await response.json();
      setSelectedPatient(data);
    } catch (error) {
      console.error('Error fetching patient:', error);
      message.error('Failed to load patient details');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (text: string) => text.slice(0, 8),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: any, record: Patient) => `${record.firstName} ${record.lastName}`,
      sorter: (a: Patient, b: Patient) => 
        `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 100,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 120,
      render: (date: string) => new Date(date).toLocaleDateString(),
      sorter: (a: Patient, b: Patient) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 150,
      render: (_: any, record: Patient) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => handleViewPatient(record.id)}
          >
            View
          </Button>
          <Button 
            type="link" 
            onClick={() => handleViewPatient(record.id)}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <ProtectedRoute requiredPermission="view_patients">
      <div className="patients-container">
        <div className="patients-header">
          <h1 className="patients-title">Patients</h1>
          <Space>
            <Button
              icon={<FilterOutlined />}
              onClick={() => setFilterVisible(true)}
              className={Object.keys(filters).length > 0 ? 'filter-active' : ''}
            >
              Filters
              {Object.keys(filters).length > 0 && 
                <span className="filter-badge">{Object.keys(filters).length}</span>
              }
            </Button>
            <Button
              onClick={() => setImportModalVisible(true)}
            >
              Import JSON
            </Button>
            <PrintPatients patients={filteredPatients} />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => router.push('/patients/register')}
            >
              Add Patient
            </Button>
          </Space>
        </div>

        <Modal
          title="Filter Patients"
          open={filterVisible}
          onCancel={() => setFilterVisible(false)}
          footer={[
            <Button key="reset" onClick={resetFilters}>
              Reset
            </Button>,
            <Button key="apply" type="primary" onClick={() => form.submit()}>
              Apply
            </Button>,
          ]}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFilter}
            initialValues={filters}
          >
            <Form.Item name="searchText" label="Search">
              <Input placeholder="Search by name, ID, email, or phone" />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Select
                allowClear
                placeholder="Select gender"
                options={[
                  { label: 'Male', value: 'male' },
                  { label: 'Female', value: 'female' },
                  { label: 'Other', value: 'other' },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Table
          columns={columns}
          dataSource={filteredPatients}
          rowKey="id"
          loading={loading}
          pagination={{
            total: filteredPatients.length,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} patients`,
          }}
          scroll={{ x: 'max-content' }}
        />

        <ImportPatientsModal
          open={importModalVisible}
          onCancel={() => setImportModalVisible(false)}
          onSuccess={fetchPatients}
        />

        <PatientDetailModal
          patient={selectedPatient}
          open={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          onRefresh={handleViewPatient}
        />
      </div>
    </ProtectedRoute>
  );
};

export default PatientList; 