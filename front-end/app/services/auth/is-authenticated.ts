import { parseCookies } from 'nookies';
import { api } from '../api';
import { AxiosError } from 'axios';

export async function isAuthenticated() {
  const cookies = parseCookies();
  const token = cookies['auth.token'];

  if (!token) return false;

  try {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    await api.post('https://coala.free.beeceptor.com/users/me');
    return true;
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status === 401) {
      return false;
    }
  }

  return false;
}

function isAxiosError(error: any): error is AxiosError {
  return error;
}
