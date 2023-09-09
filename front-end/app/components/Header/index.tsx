'use client';

import Link from 'next/link';

import { AppBar, Box, Button, Container, Typography } from '@mui/material';
import Menu from './Menu';
import { useAuth } from '@/contexts/auth-context';

export default function Header() {
  const auth = useAuth();

  return (
    <AppBar position="sticky" color="transparent" elevation={0} sx={{ bgcolor: '#fff', border: '1px solid #ccc' }}>
      <Container>
        <Box display="flex">
          <Typography variant="h4" align="center" sx={{ py: 2 }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
              Wormhole
            </Link>
          </Typography>

          <Box ml="auto" display="flex" alignItems="center">
            {auth.isAuthenticated ? (
              <Menu />
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
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
