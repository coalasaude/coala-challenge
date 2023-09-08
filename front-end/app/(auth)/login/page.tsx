'use client';

import { useState } from 'react';

import { Alert, Box, Container, FormControl, InputBase, Typography } from '@mui/material';

import Button from '@/components/Button';
import Back from '@/components/Back';
import { useRouter } from 'next/navigation';
import { login } from '../services/login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const response = await login({ username, password });

      if (response.error) {
        setError(true);
        return;
      }

      localStorage.setItem('token', response.data?.access_token as string);

      router.push('/search?q=');
    } catch {
      setError(true);
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
        <Box mt={5} position="absolute" top={0} left={0}>
          <Back />
        </Box>

        <Typography variant="h5" sx={{ mb: 4 }}>
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column" gap={2}>
            {error && <Alert severity="error">Usuário ou senha incorretos</Alert>}
            <Box>
              <Typography variant="body1" component="label" sx={{ color: '#666' }}>
                Usuário
              </Typography>
              <InputBase
                type="text"
                placeholder="Nome de usuário"
                fullWidth
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                sx={{
                  width: '100%',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  p: 1,
                }}
              />
            </Box>

            <Box>
              <Typography variant="body1" component="label" sx={{ color: '#666' }}>
                Senha
              </Typography>
              <InputBase
                type="password"
                placeholder="Senha"
                fullWidth
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                sx={{
                  width: '100%',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: 1,
                  p: 1,
                }}
              />
            </Box>

            <Button type="submit" sx={{ mt: 2, width: '100%' }} disabled={isLoading}>
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
