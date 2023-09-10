'use client';

import { useEffect, useState } from 'react';

import { Alert, Box, Modal, Stack, TextField, Typography } from '@mui/material';

import { createTrade } from '@/services/trades/create-trade';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import WButton from '@/components/WButton';

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

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 1,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Iniciar troca
            </Typography>
            <Box mt={2}>
              <Typography id="modal-modal-description" variant="body2" component="p">
                Escreva uma mensagem para o dono do livro que você deseja trocar.
              </Typography>

              {error && (
                <Alert severity="error" sx={{ my: 2 }}>
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
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                />

                <Stack direction="row" gap={2} mt={2} justifyContent="flex-end">
                  <WButton variant="outlined" color="error" onClick={handleClose}>
                    Cancelar
                  </WButton>

                  <WButton type="submit" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </WButton>
                </Stack>
              </form>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
