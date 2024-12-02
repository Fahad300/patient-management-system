"use client";

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Skeleton } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CalendarOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/lib/config';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

const Sidebar = ({ collapsed, onCollapse }: SidebarProps) => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    {
      key: ROUTES.dashboard,
      icon: <DashboardOutlined />,
      label: <Link href={ROUTES.dashboard}>Dashboard</Link>,
    },
    {
      key: ROUTES.patients,
      icon: <UserOutlined />,
      label: <Link href={ROUTES.patients}>Patients</Link>,
    },
    {
      key: ROUTES.appointments,
      icon: <CalendarOutlined />,
      label: <Link href={ROUTES.appointments}>Appointments</Link>,
    },
    {
      key: ROUTES.settings,
      icon: <SettingOutlined />,
      label: <Link href={ROUTES.settings}>Settings</Link>,
    }
  ];

  return (
    <Sider 
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="sidebar"
      width={256}
    >
      {isLoading ? (
        <div className="loading-container">
          <Skeleton active paragraph={{ rows: 6 }} />
        </div>
      ) : (
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="sidebar-menu"
        />
      )}
    </Sider>
  );
};

export default Sidebar; 