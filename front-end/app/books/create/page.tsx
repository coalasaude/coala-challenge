'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Box, Container, Input, TextField, Typography } from '@mui/material';

import { createBook } from '@/services/books/create-book';
import { uploadBookCover } from '@/services/books/upload-book-cover';
import WButton from '@/components/WButton';

type BookForm = Partial<{
  title: string;
  publisher: string;
  year: string;
  author: string;
  description: string;
}>;

export default function Book() {
  const [book, setBook] = useState<BookForm>({
    title: '',
    publisher: '',
    year: '',
    author: '',
    description: '',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const router = useRouter();

  const onChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files?.[0]) return;

    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length > 4) return;

    setBook({ ...book, year: value.replace(/\D/, '') });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = await createBook({
      title: book.title,
      publisher: book.publisher,
      year: Number(book.year),
      author: book.author,
      description: book.description,
    });

    if (image) {
      await uploadBookCover({ id: data.id, image });
    }

    router.push(`/books/${data.id}`);
  };

  return (
    <Container>
      <Box my={5}>
        <form onSubmit={handleSubmit}>
          <Box mt={5} display="flex" flexDirection="row" justifyContent="center" gap={5}>
            <Box>
              <Typography variant="body1" component="label" htmlFor="book-cover" sx={{ cursor: 'pointer' }}>
                {imagePreview ? (
                  <Box
                    width={200}
                    height={300}
                    border="1px dashed #ccc"
                    borderRadius={1}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image src={imagePreview} width={200} height={300} alt="Capa do livro" />
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

              <Input
                type="file"
                id="book-cover"
                sx={{ display: 'none' }}
                inputProps={{ accept: 'image/*' }}
                onChange={onChangePicture}
              />
            </Box>

            <Box width="50%">
              <Box display="flex" width="100%" gap={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Título"
                  fullWidth
                  required
                  value={book.title}
                  onChange={(event) => setBook({ ...book, title: event.target.value })}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Autor"
                  fullWidth
                  required
                  value={book.author}
                  onChange={(event) => setBook({ ...book, author: event.target.value })}
                />
              </Box>

              <Box display="flex" width="100%" my={2} gap={2}>
                <TextField
                  variant="outlined"
                  size="small"
                  label="Editora"
                  fullWidth
                  required
                  value={book.publisher}
                  onChange={(event) => setBook({ ...book, publisher: event.target.value })}
                />
                <TextField
                  variant="outlined"
                  size="small"
                  label="Ano"
                  type="tel"
                  required
                  value={book.year}
                  inputProps={{ pattern: '[0-9]{4}' }}
                  onChange={handleYearChange}
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
                  value={book.description}
                  onChange={(event) => setBook({ ...book, description: event.target.value })}
                />
              </Box>

              <Box width="100%" display="flex" justifyContent="flex-end" mt={5}>
                <WButton type="submit">Adicionar livro</WButton>
              </Box>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
