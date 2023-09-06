'use client';
import { useState } from 'react';
import Image from 'next/image';

import { Box, Container, FormControl, Input, TextField, Typography } from '@mui/material';

import Button from '@/components/Button';

export default function Book() {
  const [picture, setPicture] = useState<string | null>(null);

  const onChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files?.[0]) return;
    setPicture(URL.createObjectURL(event.target?.files?.[0]));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submit');
  };

  return (
    <Container>
      <Box mt={15}>
        <Typography variant="h3" component="h1">
          Adicionar livro
        </Typography>

        <form onSubmit={onSubmit}>
          <FormControl
            margin="normal"
            fullWidth
            sx={{ mt: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Box>
              <Typography variant="body1" component="label" htmlFor="book-cover" sx={{ cursor: 'pointer' }}>
                {picture ? (
                  <Box
                    width={400}
                    height={600}
                    border="1px dashed #ccc"
                    borderRadius={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image src={picture} width={400} height={600} alt="Capa do livro" />
                  </Box>
                ) : (
                  <Box p={2} sx={{ backgroundColor: '#FFFFFF', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Box
                      width={400}
                      height={600}
                      border="1px dashed #ccc"
                      borderRadius={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1" component="span" sx={{ color: '#ccc' }}>
                        Clique aqui para adicionar uma capa
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Typography>

              <Input type="file" id="book-cover" sx={{ display: 'none' }} onChange={onChangePicture} />
            </Box>

            <Box width="50%">
              <Box display="flex" width="100%" gap={2}>
                <TextField variant="outlined" size="small" label="Título" fullWidth required />
                <TextField variant="outlined" size="small" label="Autor" fullWidth required />
              </Box>

              <Box display="flex" width="100%" my={2} gap={2}>
                <TextField variant="outlined" size="small" label="Editora" fullWidth required />
                <TextField variant="outlined" size="small" label="Ano" type="tel" required />
              </Box>

              <Box display="flex" width="100%" sx={{ mt: 2 }}>
                <TextField variant="outlined" size="small" label="Descrição" multiline minRows={5} fullWidth required />
              </Box>

              <Box width="100%" display="flex" justifyContent="flex-end" mt={5}>
                <Button type="submit">
                  <Typography variant="body1" component="span">
                    Adicionar livro
                  </Typography>
                </Button>
              </Box>
            </Box>
          </FormControl>
        </form>
      </Box>
    </Container>
  );
}
