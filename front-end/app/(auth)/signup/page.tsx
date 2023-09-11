'use client';

import { useState } from 'react';
import Link from 'next/link';

import { Alert, Box, Container, Typography } from '@mui/material';

import WBack from '@/components/WBack';
import { useAuth } from '@/contexts/auth-context';
import WButton from '@/components/WButton';
import WInput from '@/components/WInput';

import WAuthForm from '../components/WAuthForm';
import * as styles from './styles';

export default function Login() {
  const auth = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const error = await auth.signup({ name, username, password });
      if (error) setError(error.error);
    } catch {
      setError('Erro ao cadastrar usuário');
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
        Cadastro
      </Typography>

      <WAuthForm onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            Usuário ou senha incorretos
          </Alert>
        )}

        <WInput label="Nome" value={name} onChange={(event) => setName(event.target.value)} required />
        <WInput label="Usuário" value={username} onChange={(event) => setUsername(event.target.value)} required />

        <WInput
          type="password"
          label="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <WButton type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Cadastrar'}
        </WButton>

        <Link href="/login">
          <WButton variant="text">Login</WButton>
        </Link>
      </WAuthForm>
    </Container>
  );
}
