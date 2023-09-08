type LoginParams = {
  username: string;
  password: string;
};

type LoginResponse = {
  error?: {
    message: string;
    error: string;
    statusCode: number;
  };

  data?: {
    access_token: string;
  };
};

export async function login({ username, password }: LoginParams): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3001/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const body = await response.json();

  if (response.ok) return { data: body };
  return { error: body };
}
