"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Permission } from '@/lib/permissions';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission: Permission;
}

const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  console.log('Protected Route:', { user, requiredPermission });

  if (!user) {
    return null;
  }

  if (user.role === 'superAdmin') {
    return <>{children}</>;
  }

  const hasPermission = user.role?.permissions?.includes(requiredPermission);
  
  if (!hasPermission) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
          <Button type="primary" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
        }
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute; 