import { AppBar, Container, Stack, Typography } from '@mui/material';

import Button from '../Button';
import InputSearch from '../InputSearch';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar
      elevation={0}
      color="secondary"
      sx={{
        backdropFilter: 'blur(20px)',
        border: '1px solid #ccc',
        borderRadius: 1,
      }}
    >
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 2 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6">Wormhole</Typography>
          </Link>

          <InputSearch />

          <Button>Adicionar livro</Button>
        </Stack>
      </Container>
    </AppBar>
  );
}
