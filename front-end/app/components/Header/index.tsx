'use client';

import Link from 'next/link';

import { AppBar, Box, Button, Container, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const token = localStorage.getItem('token');
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.refresh();
  };

  return (
    <AppBar position="static" color="secondary" elevation={0}>
      <Container>
        <Box display="flex">
          <Typography variant="h4" align="center" sx={{ py: 2 }}>
            <Link href="/" style={{ textDecoration: 'none', color: '#000' }}>
              Womhole
            </Link>
          </Typography>

          <Box ml="auto" display="flex" alignItems="center">
            {token ? (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  Menu
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem>
                    <Link href="/books/create" style={{ textDecoration: 'none', color: '#333' }}>
                      Adicionar Livro
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="#" style={{ textDecoration: 'none', color: '#333' }}>
                      Ver trocas
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/login" passHref>
                <Button variant="outlined" color="inherit">
                  Entrar
                </Button>
              </Link>
            )}
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
