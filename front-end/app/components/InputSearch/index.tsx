'use client';
import { useRouter } from 'next/navigation';

import { Box, InputBase, Button, FormControl } from '@mui/material';

export default function InputSearch() {
  const router = useRouter();

  const handleInput = (event: React.KeyboardEvent) => {
    console.log(event.key);
    if (event.key === 'Enter') {
      redirectToSearch('teste');
    }
  };

  const redirectToSearch = (q: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('q', q);

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <Box
      border="1px solid #ccc"
      borderRadius={1}
      height="auto"
      display="flex"
      alignItems="center"
      sx={{ background: '#F5F5F5' }}
    >
      <InputBase
        placeholder="Search"
        sx={{
          backgroundColor: '#f5f5f5',
          px: 2,
          width: 400,
        }}
        onKeyDown={handleInput}
      />

      <Button
        variant="contained"
        disableElevation
        disableRipple
        sx={{ borderRadius: 0, whiteSpace: 'nowrap' }}
        onClick={() => redirectToSearch('teste')}
      >
        Pesquisar
      </Button>
    </Box>
  );
}
