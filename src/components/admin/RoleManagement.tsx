"use client";

import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Modal, Form, Input, Checkbox, message, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

const RoleManagement = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch roles');
    } finally {
      setLoading(false);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await fetch('/api/permissions');
      if (!response.ok) throw new Error('Failed to fetch permissions');
      const data = await response.json();
      setPermissions(data);
    } catch (error) {
      console.error('Fetch error:', error);
      message.error('Failed to fetch permissions');
    }
  };

  const handleCreate = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setModalVisible(true);
  };

  const handleDelete = async (roleId: string) => {
    try {
      const response = await fetch(`/api/roles/${roleId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete role');
      
      setRoles(roles.filter(role => role.id !== roleId));
      message.success('Role deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      message.error('Failed to delete role');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        name: values.name,
        description: values.description,
        permissions: values.permissions,
      };

      if (editingRole) {
        const response = await fetch(`/api/roles/${editingRole.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to update role');
        
        const updatedRole = await response.json();
        setRoles(roles.map(role => 
          role.id === editingRole.id ? updatedRole : role
        ));
        message.success('Role updated successfully');
      } else {
        const response = await fetch('/api/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error('Failed to create role');
        
        const newRole = await response.json();
        setRoles([...roles, newRole]);
        message.success('Role created successfully');
      }
      setModalVisible(false);
    } catch (error) {
      console.error('Submit error:', error);
      message.error('Failed to save role');
    }
  };

  const columns: ColumnsType<Role> = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Permissions',
      key: 'permissions',
      render: (_, record) => (
        <Space wrap>
          {record.permissions.map(permission => (
            <span key={permission.id} className="permission-tag">
              {permission.name}
            </span>
          ))}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Role"
            description="Are you sure you want to delete this role?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />}
              disabled={record.name === 'Admin'}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="role-management">
      <div className="table-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
        >
          New Role
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={roles}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={editingRole ? 'Edit Role' : 'Create Role'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Role Name"
            rules={[{ required: true, message: 'Please enter role name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[{ required: true, message: 'Please select permissions' }]}
          >
            <Checkbox.Group>
              <Space direction="vertical">
                {permissions.map(permission => (
                  <Checkbox key={permission.id} value={permission.id}>
                    {permission.name}
                    <span className="permission-description">
                      {permission.description}
                    </span>
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          </Form.Item>

          <Form.Item className="form-actions">
            <Space>
              <Button onClick={() => setModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingRole ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoleManagement; 