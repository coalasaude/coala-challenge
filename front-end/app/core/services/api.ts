import { logout } from '@/contexts/auth-context';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { parseCookies } from 'nookies';

export const api = createApi();

function createApi() {
  const cookies = parseCookies();
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: { Authorization: `Bearer ${cookies['auth.token']}` },
  });

  const onFullfilled = (response: AxiosResponse) => response;

  const onRejected = async (error: AxiosError) => {
    if (error?.response && error.response.status === 401) {
      logout();
    }

    return Promise.reject(error);
  };

  api.interceptors.response.use(onFullfilled, onRejected);
  return api;
}
