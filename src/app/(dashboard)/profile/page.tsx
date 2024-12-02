"use client";

import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import UserProfile from '@/components/profile/UserProfile';

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <ProtectedRoute requiredPermission="view_profile">
      <div className="profile-container">
        <h1 className="page-title" style={{ 
          color: 'var(--color-text-primary)',
          fontSize: 'var(--font-size-xl)',
          marginBottom: 'var(--spacing-lg)'
        }}>
          My Profile
        </h1>
        <UserProfile user={user} />
      </div>
    </ProtectedRoute>
  );
} 