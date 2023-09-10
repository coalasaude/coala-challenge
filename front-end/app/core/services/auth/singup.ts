import { User } from '@/core/types';

type SignupParams = {
  name: string;
  username: string;
  password: string;
};

type SignupResponse = {
  error?: {
    message: string;
    error: string;
    statusCode: number;
  };

  data?: User;
};

export async function signup({ name, username, password }: SignupParams): Promise<SignupResponse> {
  const response = await fetch('http://localhost:3001/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, username, password }),
  });

  const body = await response.json();

  if (response.ok) return { data: body };
  return { error: body };
}
