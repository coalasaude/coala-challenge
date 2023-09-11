'use client';

import { useState } from 'react';
import { Link, MenuItem, Menu, Stack } from '@mui/material';
import { logout, useAuth } from '@/contexts/auth-context';

import WButton from '../WButton';

export default function WMenu() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
  };

  if (!auth.isAuthenticated)
    return (
      <Stack direction="row" gap={2}>
        <Link href="/login">
          <WButton variant="outlined">Entrar</WButton>
        </Link>
        <Link href="/signup">
          <WButton>Cadastrar</WButton>
        </Link>
      </Stack>
    );
  else
    return (
      <>
        <WButton variant="text" onClick={handleClick}>
          {auth.user?.name}
        </WButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>
            <Link href="/books/create" style={{ textDecoration: 'none', color: '#333' }}>
              Adicionar Livro
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/trades" style={{ textDecoration: 'none', color: '#333' }}>
              Ver trocas
            </Link>
          </MenuItem>

          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>
    );
}
