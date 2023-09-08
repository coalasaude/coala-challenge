'use client';
import { useState } from 'react';
import Image from 'next/image';

import { Box, Container, Input, Button, TextField, Typography } from '@mui/material';

import { useRouter } from 'next/navigation';
import { createBook } from './services/create-book';

export default function Book() {
  const [title, setTitle] = useState<string>('');
  const [publisher, setPublisher] = useState<string>('');
  const [year, setYear] = useState<number>();
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [picture, setPicture] = useState<string | null>(null);

  const router = useRouter();

  const onChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files?.[0]) return;
    setPicture(URL.createObjectURL(event.target?.files?.[0]));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await createBook({ title, publisher, year: year as number, author, description });
    router.push(`/books/${data.id}`);
  };

  return (
    <Container>
      <Box my={5}>
        <form onSubmit={handleSubmit}>
          <Box mt={5} display="flex" flexDirection="row" justifyContent="center" gap={5}>
            <Box>
              <Typography variant="body1" component="label" htmlFor="book-cover" sx={{ cursor: 'pointer' }}>
                {picture ? (
                  <Box
                    width={200}
                    height={300}
                    border="1px dashed #ccc"
                    borderRadius={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image src={picture} width={200} height={300} alt="Capa do livro" />
                  </Box>
                ) : (
                  <Box p={2} sx={{ backgroundColor: '#FFFFFF', border: '1px solid #ccc', borderRadius: '4px' }}>
                    <Box
                      width={200}
                      height={300}
                      border="1px dashed #ccc"
                      borderRadius={1}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Typography variant="body1" component="span" sx={{ color: '#ccc' }} align="center">
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
                <TextField
                  variant="outlined"
                  size="small"
                  label="Título"
                  fullWidth
                  required
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Autor"
                  fullWidth
                  required
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                />
              </Box>

              <Box display="flex" width="100%" my={2} gap={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Editora"
                  fullWidth
                  required
                  value={publisher}
                  onChange={(event) => setPublisher(event.target.value)}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Ano"
                  type="tel"
                  required
                  value={year}
                  onChange={(event) => setYear(Number(event.target.value))}
                />
              </Box>

              <Box display="flex" width="100%" sx={{ mt: 2 }}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Descrição"
                  multiline
                  minRows={5}
                  fullWidth
                  required
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Box>

              <Box width="100%" display="flex" justifyContent="flex-end" mt={5}>
                <Button variant="contained" type="submit" disableElevation>
                  Adicionar livro
                </Button>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
