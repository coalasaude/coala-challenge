'use client';
import { api } from '@/core/services/api';
import { getUser } from '@/core/services/auth/get-user';
import { User } from '@/core/types';
import { useRouter } from 'next/navigation';
import { setCookie, destroyCookie, parseCookies } from 'nookies';
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
  user: {} as User | undefined,
});

let channel: BroadcastChannel;

export const logout = () => {
  channel.postMessage('logout');
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    loadUser();

    channel = new BroadcastChannel('auth');

    channel.onmessage = (message) => {
      if (message.data === 'logout') logout();
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

      await loadUser();
      router.push('/');
    } catch (error) {
      return { error: 'Usuário ou senha inválidos' };
    }
  };

  const logout = (): undefined => {
    destroyCookie(null, 'auth.token', { path: '/' });
    delete api.defaults.headers.Authorization;
    setUser(undefined);
    router.push('/');
  };

  const loadUser = async () => {
    const user = await getUser();
    if (user) setUser(user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
