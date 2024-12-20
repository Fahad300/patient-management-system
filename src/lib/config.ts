// Configuration constants
export const API_BASE_URL = 'https://api.example.com/v1';

export const APP_CONFIG = {
  title: 'Patient Management System',
  description: 'Modern healthcare management solution',
  version: '1.0.0',
};

export const ROUTES = {
  dashboard: '/dashboard',
  patients: '/patients',
  appointments: '/appointments',
  settings: '/settings',
  profile: '/profile',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  queue: '/queue',
  billing: '/billing',
  lab: '/lab',
  telemedicine: '/telemedicine',
  analytics: '/analytics',
  designGuide: '/design-guide',
} as const; 