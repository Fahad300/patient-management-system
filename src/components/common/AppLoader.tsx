import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const AppLoader = () => {
  return (
    <div className="app-loader">
      <Spin 
        indicator={
          <LoadingOutlined 
            style={{ 
              fontSize: 48,
              color: 'var(--color-primary)'
            }} 
            spin 
          />
        } 
      />
      <div className="app-loader-text">Loading...</div>
    </div>
  );
};

export default AppLoader; 