import React from 'react';
import { Skeleton, Card } from 'antd';

interface ComponentLoaderProps {
  type?: 'card' | 'statistics' | 'table' | 'list';
  rows?: number;
}

const ComponentLoader = ({ type = 'card', rows = 1 }: ComponentLoaderProps) => {
  switch (type) {
    case 'statistics':
      return (
        <Card className="card-loader">
          <Skeleton.Input 
            style={{ width: '40%' }} 
            size="small" 
            active 
          />
          <div style={{ marginTop: 16 }}>
            <Skeleton.Input 
              style={{ width: '100%' }} 
              size="large" 
              active 
            />
          </div>
        </Card>
      );
    
    case 'table':
      return (
        <Card className="card-loader">
          <Skeleton active paragraph={{ rows: rows }} />
        </Card>
      );
    
    case 'list':
      return (
        <Card className="card-loader">
          <Skeleton active avatar paragraph={{ rows: 3 }} />
        </Card>
      );
    
    default:
      return (
        <Card className="card-loader">
          <Skeleton active paragraph={{ rows: rows }} />
        </Card>
      );
  }
};

export default ComponentLoader; 