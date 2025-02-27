import { fetchAPI } from '@/utils/fetchClient';

export const login = (email: string, password: string) =>
  fetchAPI('/api/auth/login', 'POST', { email, password });
