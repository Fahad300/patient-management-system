"use client";

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AuthState, AuthUser, LoginCredentials, SignupData } from '@/types/auth';
import { useRouter } from 'next/navigation';
import { TEST_USERS } from '@/lib/testUsers';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  switchRole: (user: typeof TEST_USERS[keyof typeof TEST_USERS]) => void;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
  error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_USER'; payload: AuthUser }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'LOGOUT' };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, error: null };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'LOGOUT':
      return { ...state, user: null, error: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (token) {
          if (token === 'dev-token') {
            // Load development user from localStorage
            const devUser = localStorage.getItem('dev_user');
            if (devUser) {
              dispatch({ type: 'SET_USER', payload: JSON.parse(devUser) });
            } else {
              // Fallback to superAdmin if no user stored
              dispatch({ type: 'SET_USER', payload: TEST_USERS.superAdmin });
            }
          } else {
            // Normal token validation
            const user = await validateToken(token);
            dispatch({ type: 'SET_USER', payload: user });
          }
        }
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('dev_user');
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const { user, token } = await response.json();
      localStorage.setItem('auth_token', token);
      dispatch({ type: 'SET_USER', payload: user });
      router.push('/dashboard');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const signup = async (data: SignupData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem('auth_token', token);
      dispatch({ type: 'SET_USER', payload: user });
      router.push('/dashboard');
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const logout = async () => {
    try {
      // Clear all auth-related data from localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('dev_user');
      
      // Reset auth state
      dispatch({ type: 'LOGOUT' });
      
      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Password reset failed');
      }

      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const switchRole = (newUser: typeof TEST_USERS[keyof typeof TEST_USERS]) => {
    dispatch({ type: 'SET_USER', payload: newUser });
    // Optionally store in localStorage for persistence
    localStorage.setItem('dev_user', JSON.stringify(newUser));
  };

  const value = {
    user: state.user,
    isLoading: state.isLoading,
    error: state.error,
    login,
    signup,
    logout,
    resetPassword,
    switchRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

async function validateToken(token: string): Promise<AuthUser> {
  const response = await fetch('/api/auth/validate', {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  if (!response.ok) {
    throw new Error('Invalid token');
  }
  
  return response.json();
} 