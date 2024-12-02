"use client";

import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Row, Col, Divider, Space, message } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;

interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

interface PatientData {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  bloodGroup: string;
  allergies: string[];
  medicalHistory: {
    condition: string;
    diagnosis: string;
    year: string;
  }[];
  emergencyContacts: EmergencyContact[];
  notes: string;
}

const PatientRegistrationForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: PatientData) => {
    setLoading(true);
    try {
      // TODO: Implement API call to save patient data
      console.log('Patient data:', values);
      message.success('Patient registered successfully');
      router.push('/patients');
    } catch (error) {
      message.error('Failed to register patient');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="patient-form"
      initialValues={{
        medicalHistory: [{}],
        emergencyContacts: [{}],
        allergies: ['']
      }}
    >
      {/* Basic Information */}
      <div className="form-section">
        <h2 className="section-title">Basic Information</h2>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: 'Please select date of birth' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: 'Please select gender' }]}
            >
              <Select>
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
                <Select.Option value="other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { type: 'email', message: 'Please enter a valid email' },
                { required: true, message: 'Please enter email' }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="bloodGroup" label="Blood Group">
              <Select>
                <Select.Option value="A+">A+</Select.Option>
                <Select.Option value="A-">A-</Select.Option>
                <Select.Option value="B+">B+</Select.Option>
                <Select.Option value="B-">B-</Select.Option>
                <Select.Option value="O+">O+</Select.Option>
                <Select.Option value="O-">O-</Select.Option>
                <Select.Option value="AB+">AB+</Select.Option>
                <Select.Option value="AB-">AB-</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Address */}
      <div className="form-section">
        <h2 className="section-title">Address</h2>
        <Row gutter={16}>
          <Col xs={24} md={6}>
            <Form.Item
              name={['address', 'street']}
              label="Street Address"
              rules={[{ required: true, message: 'Please enter street address' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name={['address', 'city']}
              label="City"
              rules={[{ required: true, message: 'Please enter city' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name={['address', 'state']}
              label="State"
              rules={[{ required: true, message: 'Please enter state' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item
              name={['address', 'zipCode']}
              label="ZIP Code"
              rules={[{ required: true, message: 'Please enter ZIP code' }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </div>

      <Divider />

      {/* Medical History */}
      <div className="form-section">
        <h2 className="section-title">Medical History</h2>
        <Form.List name="medicalHistory">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} align="top" className="mb-md">
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'condition']}
                      label="Condition"
                    >
                      <Input placeholder="e.g., Diabetes" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'diagnosis']}
                      label="Diagnosis"
                    >
                      <Input placeholder="e.g., Type 2" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'year']}
                      label="Year"
                    >
                      <Input placeholder="e.g., 2020" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={2} className="flex-center">
                    {fields.length > 1 && (
                      <MinusCircleOutlined 
                        className="dynamic-delete-button"
                        onClick={() => remove(name)} 
                      />
                    )}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button 
                  type="dashed" 
                  onClick={() => add()} 
                  block 
                  icon={<PlusOutlined />}
                >
                  Add Medical History
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        {/* Allergies */}
        <h3 className="subsection-title">Allergies</h3>
        <Form.List name="allergies">
          {(fields, { add, remove }) => (
            <Row gutter={16}>
              {fields.map(({ key, name, ...restField }) => (
                <Col key={key} xs={24} sm={12} md={8}>
                  <Form.Item
                    {...restField}
                    name={name}
                  >
                    <Input 
                      placeholder="e.g., Penicillin"
                      suffix={
                        fields.length > 1 && (
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        )
                      }
                    />
                  </Form.Item>
                </Col>
              ))}
              <Col xs={24}>
                <Form.Item>
                  <Button 
                    type="dashed" 
                    onClick={() => add()} 
                    block 
                    icon={<PlusOutlined />}
                  >
                    Add Allergy
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form.List>
      </div>

      <Divider />

      {/* Emergency Contacts */}
      <div className="form-section">
        <h2 className="section-title">Emergency Contacts</h2>
        <Form.List name="emergencyContacts">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key} gutter={16} align="top" className="mb-md">
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label="Name"
                      rules={[{ required: true, message: 'Name is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'relationship']}
                      label="Relationship"
                      rules={[{ required: true, message: 'Relationship is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'phone']}
                      label="Phone"
                      rules={[{ required: true, message: 'Phone is required' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={2} className="flex-center">
                    {fields.length > 1 && (
                      <MinusCircleOutlined 
                        className="dynamic-delete-button"
                        onClick={() => remove(name)} 
                      />
                    )}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button 
                  type="dashed" 
                  onClick={() => add()} 
                  block 
                  icon={<PlusOutlined />}
                >
                  Add Emergency Contact
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </div>

      <Divider />

      {/* Additional Notes */}
      <div className="form-section">
        <h2 className="section-title">Additional Notes</h2>
        <Form.Item name="notes">
          <TextArea rows={4} placeholder="Any additional information about the patient" />
        </Form.Item>
      </div>

      {/* Submit Button */}
      <div className="form-actions">
        <Space>
          <Button onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Register Patient
          </Button>
        </Space>
      </div>
    </Form>
  );
};

export default PatientRegistrationForm; 