'use client';

import { Stack } from '@mui/material';

import * as styles from './styles';

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
};

export default function WAuthForm({ children, onSubmit }: Props) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(event);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack sx={styles.form}>{children}</Stack>
    </form>
  );
}
