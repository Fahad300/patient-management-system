"use client";

import { Card, Tabs } from 'antd';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import '@/styles/settings.css';

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
            </Tabs>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
} 