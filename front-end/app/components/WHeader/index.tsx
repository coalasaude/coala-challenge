'use client';

import Link from 'next/link';

import { AppBar, Button, Container, Stack, Typography } from '@mui/material';

import { useAuth } from '@/contexts/auth-context';

import WLink from '../WLink';
import WMenu from '../WMenu';

import * as styles from './styles';

export default function WHeader() {
  const auth = useAuth();

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={styles.appBar}>
      <Container sx={styles.container}>
        <WLink href="/">
          <Typography variant="h4" align="center">
            Wormhole
          </Typography>
        </WLink>

        <Stack direction="row" sx={styles.menu}>
          {auth.isAuthenticated ? (
            <WMenu />
          ) : (
            <>
              <Link href="/login">
                <Button variant="outlined" disableElevation sx={{ mr: 2 }}>
                  Entrar
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="contained" disableElevation>
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
}
