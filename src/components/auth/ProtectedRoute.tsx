"use client";

import { ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Permission, hasPermission } from '@/lib/permissions';
import { Result, Button } from 'antd';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredPermission: Permission;
}

const ProtectedRoute = ({ children, requiredPermission }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) {
    return null; // Let the middleware handle authentication
  }

  if (!hasPermission(user.role, requiredPermission)) {
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