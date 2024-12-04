"use client";

import React from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Divider,
  Tag,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Switch,
  Radio,
  Checkbox,
  Table,
  Tabs,
  Alert,
  Badge,
  Avatar,
  Progress,
  Tooltip,
  message,
} from 'antd';
import {
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import '@/styles/design-guide.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const DesignGuidePage = () => {
  return (
    <div className="design-guide-container">
      <Title level={1}>Design Guide</Title>
      <Paragraph>
        This guide showcases all components and styles used in the application.
      </Paragraph>

      <Divider />

      {/* Colors */}
      <section className="section">
        <Title level={2}>Colors</Title>
        <div className="color-grid">
          <div className="color-item">
            <div className="color-box bg-primary" />
            <Text>Primary</Text>
          </div>
          <div className="color-item">
            <div className="color-box bg-success" />
            <Text>Success</Text>
          </div>
          <div className="color-item">
            <div className="color-box bg-warning" />
            <Text>Warning</Text>
          </div>
          <div className="color-item">
            <div className="color-box bg-error" />
            <Text>Error</Text>
          </div>
          <div className="color-item">
            <div className="color-box bg-background" />
            <Text>Background</Text>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="section">
        <Title level={2}>Typography</Title>
        <Title level={1}>Heading 1</Title>
        <Title level={2}>Heading 2</Title>
        <Title level={3}>Heading 3</Title>
        <Title level={4}>Heading 4</Title>
        <Paragraph>
          Regular paragraph text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Paragraph>
        <Text>Regular Text</Text>
        <br />
        <Text strong>Bold Text</Text>
        <br />
        <Text type="secondary">Secondary Text</Text>
      </section>

      {/* Buttons */}
      <section className="section">
        <Title level={2}>Buttons</Title>
        <Space direction="vertical">
          <Space>
            <Button type="primary">Primary</Button>
            <Button>Default</Button>
            <Button type="dashed">Dashed</Button>
            <Button type="link">Link</Button>
          </Space>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}>
              With Icon
            </Button>
            <Button type="primary" loading>
              Loading
            </Button>
            <Button type="primary" disabled>
              Disabled
            </Button>
          </Space>
        </Space>
      </section>

      {/* Form Elements */}
      <section className="section">
        <Title level={2}>Form Elements</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Input placeholder="Basic Input" />
          <Input prefix={<UserOutlined />} placeholder="Input with Icon" />
          <Input.Password placeholder="Password Input" />
          <Input.Search placeholder="Search Input" />
          <Select
            defaultValue="option1"
            style={{ width: 200 }}
            options={[
              { value: 'option1', label: 'Option 1' },
              { value: 'option2', label: 'Option 2' },
            ]}
          />
          <DatePicker style={{ width: 200 }} />
          <TimePicker style={{ width: 200 }} />
          <Switch defaultChecked />
          <Radio.Group defaultValue="a">
            <Radio value="a">Option A</Radio>
            <Radio value="b">Option B</Radio>
          </Radio.Group>
          <Checkbox>Checkbox</Checkbox>
        </Space>
      </section>

      {/* Data Display */}
      <section className="section">
        <Title level={2}>Data Display</Title>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Card title="Basic Card">
            Card content
          </Card>
          <Alert message="Success Alert" type="success" />
          <Alert message="Error Alert" type="error" />
          <Badge count={5}>
            <Avatar shape="square" size="large" />
          </Badge>
          <Progress percent={75} />
          <Table
            columns={[
              { title: 'Name', dataIndex: 'name' },
              { title: 'Age', dataIndex: 'age' },
            ]}
            dataSource={[
              { key: '1', name: 'John', age: 32 },
              { key: '2', name: 'Jane', age: 28 },
            ]}
          />
        </Space>
      </section>

      {/* Navigation */}
      <section className="section">
        <Title level={2}>Navigation</Title>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
        </Tabs>
      </section>

      {/* Feedback */}
      <section className="section">
        <Title level={2}>Feedback</Title>
        <Space>
          <Button onClick={() => message.success('Success message')}>
            Show Success Message
          </Button>
          <Button onClick={() => message.error('Error message')}>
            Show Error Message
          </Button>
          <Tooltip title="Tooltip text">
            <Button>Hover me</Button>
          </Tooltip>
        </Space>
      </section>
    </div>
  );
};

export default DesignGuidePage; 