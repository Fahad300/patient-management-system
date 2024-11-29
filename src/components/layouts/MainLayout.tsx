"use client";

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AppLoader from '@/components/common/AppLoader';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <div className="layout">
      <Header 
        isDarkMode={isDarkMode}
        onThemeChange={setIsDarkMode}
      />
      <Sidebar 
        collapsed={collapsed}
        onCollapse={setCollapsed}
      />
      <main className={`layout-main ${collapsed ? 'collapsed' : ''}`}>
        <div className="content">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout; 