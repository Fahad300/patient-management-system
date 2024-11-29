"use client";

import React, { useState, useEffect } from 'react';
import { Button, Avatar, Badge, Dropdown, Switch, Skeleton } from 'antd';
import {
  UserOutlined,
  BellOutlined,
  BulbOutlined,
  BuildOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Image from 'next/image';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeChange: (checked: boolean) => void;
}

const Header = ({ isDarkMode, onThemeChange }: HeaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Mock notifications
  const notifications = [
    { id: 1, message: 'New appointment request', read: false },
    { id: 2, message: 'Patient records updated', read: false },
    { id: 3, message: 'System maintenance tonight', read: true },
  ];

  const enterpriseItems = [
    { key: 'analytics', label: 'Analytics Dashboard' },
    { key: 'reports', label: 'Reports' },
    { key: 'billing', label: 'Billing Management' },
    { key: 'divider', type: 'divider' as const },
    { key: 'settings', label: 'Enterprise Settings' },
  ];

  const userMenuItems = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Settings' },
    { key: 'divider', type: 'divider' as const },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout' },
  ];

  const notificationItems = notifications.map((notification) => ({
    key: notification.id,
    label: (
      <div className="max-w-xs">
        <div className={`text-sm ${notification.read ? 'text-gray-500' : 'font-semibold'}`}>
          {notification.message}
        </div>
      </div>
    ),
  }));

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          {isLoading ? (
            <Skeleton.Input style={{ width: 120, height: 40 }} active />
          ) : (
            <Image
              src="/logo.png"
              alt="HealthCare PMS"
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
              priority
            />
          )}
        </div>

        <div className="header-actions">
          {isLoading ? (
            <div style={{ display: 'flex', gap: 24 }}>
              <Skeleton.Button active />
              <Skeleton.Button active />
              <Skeleton.Button active />
              <Skeleton.Avatar active />
            </div>
          ) : (
            <>
              <Dropdown
                menu={{ items: enterpriseItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Button 
                  type="text" 
                  icon={<BuildOutlined style={{ color: 'var(--color-icon)' }} />}
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  <span style={{ marginLeft: 8 }}>Enterprise</span>
                </Button>
              </Dropdown>

              <Switch
                checked={isDarkMode}
                onChange={onThemeChange}
                checkedChildren={<BulbOutlined />}
                unCheckedChildren={<BulbOutlined />}
                style={{
                  backgroundColor: isDarkMode ? 'var(--color-primary)' : undefined
                }}
              />

              <Dropdown
                menu={{ items: notificationItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <Badge count={notifications.filter(n => !n.read).length}>
                  <Button 
                    type="text" 
                    icon={<BellOutlined style={{ 
                      fontSize: 18,
                      color: 'var(--color-icon)'
                    }} />}
                    aria-label="Notifications"
                  />
                </Badge>
              </Dropdown>

              <Dropdown 
                menu={{ 
                  items: userMenuItems,
                  onClick: (info) => console.log('User menu clicked:', info.key),
                }} 
                placement="bottomRight"
                trigger={['click']}
              >
                <Avatar 
                  icon={<UserOutlined />} 
                  style={{ 
                    cursor: 'pointer',
                    backgroundColor: 'var(--color-primary)',
                    color: '#fff'
                  }}
                />
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 