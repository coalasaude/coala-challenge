'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Alert, Stack, TextField, Typography } from '@mui/material';

import { useAuth } from '@/contexts/auth-context';
import { createTrade } from '@/core/services/trades/create-trade';

import WButton from '@/components/WButton';
import WModal from '@/components/WModal';

import * as styles from './styles';

type Props = {
  bookId: string;
};

export default function TradeModal({ bookId }: Props) {
  const auth = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = await createTrade({ bookId, message });

    if (data.error?.message) {
      setError(data.error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    handleClose();
  };

  useEffect(() => {
    if (open) {
      !auth.isAuthenticated && router.push('/login');
    }
  }, [open]);

  return (
    <>
      <WButton onClick={handleOpen}>Iniciar troca</WButton>

      <WModal open={open} onClose={handleClose}>
        <Typography variant="h6" component="h2">
          Iniciar troca
        </Typography>

        <Stack mt={2}>
          <Typography variant="body2" component="p">
            Escreva uma mensagem para o dono do livro que você deseja trocar.
          </Typography>

          {error && (
            <Alert severity="error" sx={styles.alert}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Mensagem"
              size="small"
              multiline
              minRows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              sx={styles.textArea}
              required
            />

            <Stack direction="row" sx={styles.buttons}>
              <WButton variant="outlined" color="error" onClick={handleClose}>
                Cancelar
              </WButton>

              <WButton type="submit" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar'}
              </WButton>
            </Stack>
          </form>
        </Stack>
      </WModal>
    </>
  );
}
