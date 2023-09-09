import { parseCookies } from 'nookies';
import { api } from '../api';

export async function getUser() {
  const cookies = parseCookies();
  const token = cookies['auth.token'];

  if (!token) return;

  try {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {}
}
