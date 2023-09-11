'use client';

import { useRouter } from 'next/navigation';

import { Typography } from '@mui/material';

export default function WBack() {
  const router = useRouter();

  return (
    <Typography variant="h6" component="h1" onClick={() => router.back()} sx={{ cursor: 'pointer' }}>
      Voltar
    </Typography>
  );
}
