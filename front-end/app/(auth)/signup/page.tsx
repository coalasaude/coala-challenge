'use client';

import { useState } from 'react';

import { Alert, Box, Container, InputBase, Typography } from '@mui/material';

import Button from '@/components/Button';
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
        <Box mt={5} position="absolute" top={0} left={0}>
          <Back />
        </Box>

        <Typography variant="h5" sx={{ mb: 4 }}>
          Cadastro
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column" gap={2}>
            {error && <Alert severity="error">{error}</Alert>}

            <Box>
              <Typography variant="body1" component="label" sx={{ color: '#666' }}>
                Nome
              </Typography>
              <InputBase
                type="text"
                placeholder="Nome"
                fullWidth
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                inputProps={{ minLength: 6 }}
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
              {isLoading ? 'Carregando...' : 'Cadastrar'}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
