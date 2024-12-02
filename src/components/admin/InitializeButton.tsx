"use client";

import { Button, message } from 'antd';
import { useState } from 'react';

export const InitializeButton = () => {
  const [loading, setLoading] = useState(false);

  const handleInitialize = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/init', { method: 'POST' });
      if (!response.ok) throw new Error('Failed to initialize');
      
      message.success('Database initialized successfully');
      // Optionally refresh the page or data
      window.location.reload();
    } catch (error) {
      console.error('Initialization error:', error);
      message.error('Failed to initialize database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      loading={loading}
      onClick={handleInitialize}
    >
      Initialize Database
    </Button>
  );
}; 