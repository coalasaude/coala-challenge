'use client';

import { useState } from 'react';

import { Alert, Box, Button, Modal, TextField, Typography } from '@mui/material';
import { createTrade } from '../../services/create-trade';

type Props = {
  bookId: string;
};

export default function TradeModal({ bookId }: Props) {
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
      return;
    }

    setIsLoading(false);
    handleClose();
  };

  return (
    <>
      <Button variant="contained" disableElevation sx={{ mt: 3 }} onClick={handleOpen}>
        Iniciar troca
      </Button>

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

                <Box mt={2}>
                  <Button variant="outlined" color="error" disableElevation sx={{ mt: 3 }} onClick={handleClose}>
                    Cancelar
                  </Button>

                  <Button type="submit" variant="contained" disableElevation sx={{ mt: 3, ml: 2 }} disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
