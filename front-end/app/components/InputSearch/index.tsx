'use client';

import { useRouter } from 'next/navigation';

import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function InputSearch() {
  const router = useRouter();

  const handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/search?q=${event.currentTarget.value}`);
    }
  };

  return (
    <Box
      width="100%"
      display="flex"
      alignItems="center"
      sx={{
        backgroundColor: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        p: 1,
      }}
    >
      <SearchIcon sx={{ mr: 1 }} htmlColor="#888" />
      <InputBase placeholder="Buscar por livros" fullWidth onKeyDown={handleInput} />
    </Box>
  );
}
