'use client';
import { api } from '@/services/api';
import { getUser } from '@/services/auth/get-user';
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

type User = {
  id: string;
  name: string;
  username: string;
};

const AuthContext = createContext({
  isAuthenticated: false,
  login: async (params: LoginParams): Promise<LoginResponse | undefined> => undefined,
  signup: async (params: SignupParams): Promise<LoginResponse | undefined> => undefined,
  logout: () => undefined,
  user: {} as User | undefined,
});

let authChannel: BroadcastChannel;

export const logout = (): undefined => {
  destroyCookie(null, 'auth.token', { path: '/' });
  delete api.defaults.headers.Authorization;
  authChannel.postMessage('logout');
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      if (user) setUser(user);
    };

    loadUser();

    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      const mapping: Record<string, any> = {
        logout: () => {
          setUser(undefined);
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

      router.push('/');
    } catch (error) {
      return { error: 'Usuário ou senha inválidos' };
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
