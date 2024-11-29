export type UserRole = 'superAdmin' | 'admin' | 'doctor' | 'nurse' | 'receptionist' | 'patient';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData extends LoginCredentials {
  name: string;
  role: UserRole;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
}

export const DEV_USER: AuthUser = {
  id: 'dev-1',
  email: 'dev@admin.com',
  name: 'Super Admin',
  role: 'superAdmin',
  avatar: '/avatars/admin.png'
}; 