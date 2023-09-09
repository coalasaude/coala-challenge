'use client';

import { useState } from 'react';
import { Button, Link, MenuItem, Menu as MuiMenu } from '@mui/material';
import { logout, useAuth } from '@/contexts/auth-context';

export default function Menu() {
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

  return (
    <>
      <Button onClick={handleClick}>{auth.user?.name}</Button>
      <MuiMenu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
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
      </MuiMenu>
    </>
  );
}
