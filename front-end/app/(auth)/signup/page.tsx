'use client';

import { useState } from 'react';

import { Alert, Box, Container, FormControl, Button, TextField, Typography } from '@mui/material';

import Back from '@/components/Back';
import { useRouter } from 'next/navigation';
import { signup } from '../services/singup';
import { login } from '../services/login';

export default function Login() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const signupResponse = await signup({ name, username, password });

      if (signupResponse.error?.statusCode === 400 && signupResponse.error?.message === 'User already exists') {
        setError('Usuário já existe');
        return;
      }

      const loginResponse = await login({ username, password });

      localStorage.setItem('token', loginResponse.data?.access_token as string);

      router.push('/search?q=');
    } catch {
      setError('Erro ao cadastrar usuário');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box mt={3} position="absolute" top={0} left={0}>
          <Back />
        </Box>

        <Typography variant="h5" sx={{ mb: 4 }}>
          Cadastro
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            gap={2}
            border="1px solid #ccc"
            borderRadius={1}
            p={4}
            sx={{ bgcolor: '#fff' }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 1 }}>
                Usuário ou senha incorretos
              </Alert>
            )}

            <FormControl>
              <TextField
                type="text"
                label="Nome"
                fullWidth
                size="small"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <TextField
                type="text"
                label="Usuário"
                fullWidth
                size="small"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </FormControl>

            <FormControl>
              <TextField
                type="password"
                label="Senha"
                fullWidth
                size="small"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </FormControl>

            <Button
              disableElevation
              variant="contained"
              type="submit"
              sx={{ mt: 1, width: '100%' }}
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Cadastrar'}
            </Button>

            <Button variant="text" sx={{ mt: 1, width: '100%' }} onClick={() => router.push('/login')}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
