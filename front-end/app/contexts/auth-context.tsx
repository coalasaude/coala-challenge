'use client';
import { api } from '@/services/api';
import { isAuthenticated } from '@/services/auth/is-authenticated';
import { useRouter } from 'next/navigation';
import { setCookie, destroyCookie } from 'nookies';
import { createContext, useContext, useEffect, useState } from 'react';

type LoginParams = {
  username: string;
  password: string;
};

type SignupParams = {
  name: string;
  username: string;
  password: string;
};

type LoginResponse = {
  error: string;
};

const AuthContext = createContext({
  isAuthenticated: false,
  login: async (params: LoginParams): Promise<LoginResponse | undefined> => undefined,
  signup: async (params: SignupParams): Promise<LoginResponse | undefined> => undefined,
  logout: () => undefined,
});

let authChannel: BroadcastChannel;

export const logout = (): undefined => {
  destroyCookie(null, 'auth.token');
  delete api.defaults.headers.Authorization;
  authChannel.postMessage('logout');
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const isAuth = await isAuthenticated();
      setIsAuth(isAuth);
    };

    loadUser();

    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      const mapping: Record<string, any> = {
        logout: () => {
          setIsAuth(false);
          router.push('/');
        },
      };

      mapping[message.data]();
    };
  }, []);

  const signup = async ({ name, username, password }: SignupParams) => {
    try {
      await api.post('/users', { name, username, password });
      await login({ username, password });
    } catch (error: any) {
      if (error.response.data.message === 'User already exists') return { error: 'Usuário já existe' };
      return { error: 'Erro ao cadastrar usuário' };
    }
  };

  const login = async ({ username, password }: LoginParams): Promise<LoginResponse | undefined> => {
    try {
      const { data } = await api.post('/auth/login', { username, password });

      setCookie(undefined, 'auth.token', data.access_token, {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      api.defaults.headers.Authorization = `Bearer ${data.access_token}`;

      setIsAuth(true);
      router.push('/');
    } catch (error) {
      setIsAuth(false);
      return { error: 'Usuário ou senha inválidos' };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuth, login, signup, logout }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
