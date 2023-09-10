'use client';

import { Box, Container, Link, Stack, Typography } from '@mui/material';

import InputSearch from '@/components/InputSearch';
import Menu from '@/components/Header/Menu';
import WButton from '@/components/WButton';

import { useAuth } from '../contexts/auth-context';

export default function Home() {
  const auth = useAuth();

  return (
    <main>
      <Container>
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box position="absolute" top={0} right={0} mt={3}>
            <Box ml="auto" display="flex" alignItems="center">
              {auth.isAuthenticated ? (
                <Menu />
              ) : (
                <Stack direction="row" gap={2}>
                  <Link href="/login">
                    <WButton variant="outlined">Entrar</WButton>
                  </Link>
                  <Link href="/signup">
                    <WButton>Cadastrar</WButton>
                  </Link>
                </Stack>
              )}
            </Box>
          </Box>

          <Box minWidth={500} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
              Wormhole
            </Typography>

            <InputSearch />
          </Box>
        </Box>
      </Container>
    </main>
  );
}
