'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { InputBase, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import * as styles from './styles';

export default function WInputSearch() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?q=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Stack direction="row" sx={styles.container}>
        <SearchIcon sx={styles.icon} />
        <InputBase placeholder="Buscar por livros" value={query} onChange={handleChange} fullWidth />
      </Stack>
    </form>
  );
}
