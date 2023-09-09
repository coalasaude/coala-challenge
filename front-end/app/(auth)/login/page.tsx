'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Alert, Box, Container, FormControl, Button, TextField, Typography } from '@mui/material';

import Back from '@/components/Back';
import { useAuth } from '@/contexts/auth-context';

export default function Login() {
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const error = await login({ username, password });

      if (error) setError(error.error);
    } catch (error) {
      console.log(error);
      setError('Usuário ou senha incorretos');
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
          Login
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
              {isLoading ? 'Carregando...' : 'Entrar'}
            </Button>

            <Link href="/signup">
              <Button variant="text" sx={{ mt: 1, width: '100%' }}>
                Cadastrar
              </Button>
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
