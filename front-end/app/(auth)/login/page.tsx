'use client';

import { useState } from 'react';

import { Alert, Box, Container, Typography } from '@mui/material';

import { useAuth } from '@/contexts/auth-context';

import WBack from '@/components/WBack';
import WButton from '@/components/WButton';
import WInput from '@/components/WInput';
import WLink from '@/components/WLink';

import WAuthForm from '../components/WAuthForm';

import * as styles from './styles';

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
    <Container sx={styles.container}>
      <Box sx={styles.back}>
        <WBack />
      </Box>

      <Typography variant="h5" sx={{ mb: 4 }}>
        Login
      </Typography>

      <WAuthForm onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            Usuário ou senha incorretos
          </Alert>
        )}

        <WInput label="Usuário" value={username} onChange={(event) => setUsername(event.target.value)} required />
        <WInput
          type="password"
          label="Usuário"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <WButton type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </WButton>

        <WLink href="/signup">
          <WButton variant="text">Cadastrar</WButton>
        </WLink>
      </WAuthForm>
    </Container>
  );
}
