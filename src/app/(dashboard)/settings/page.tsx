"use client";

import { Card, Tabs } from 'antd';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import '@/styles/settings.css';
import { InitializeButton } from '@/components/admin/InitializeButton';
import RoleManagement from '@/components/admin/RoleManagement';

const { TabPane } = Tabs;

export default function SettingsPage() {
  return (
    <ProtectedRoute requiredPermission="view_settings">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-section">
          <Card className="settings-card">
            <Tabs defaultActiveKey="general">
              <TabPane tab="General" key="general">
                <h2 className="settings-subtitle">General Settings</h2>
                <p className="settings-description">
                  Configure general application settings
                </p>
                {/* Add general settings content */}
              </TabPane>
              <TabPane tab="Notifications" key="notifications">
                <h2 className="settings-subtitle">Notification Preferences</h2>
                <p className="settings-description">
                  Manage your notification settings
                </p>
                {/* Add notification settings content */}
              </TabPane>
              <TabPane tab="Security" key="security">
                <h2 className="settings-subtitle">Security Settings</h2>
                <p className="settings-description">
                  Configure security and privacy settings
                </p>
                {/* Add security settings content */}
              </TabPane>
              <TabPane tab="Role Management" key="roles">
                <RoleManagement />
              </TabPane>
            </Tabs>
          </Card>
        </div>
        <div className="settings-section">
          <h2>Database Management</h2>
          <div className="settings-content">
            <p>Initialize the database with sample data</p>
            <InitializeButton />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 