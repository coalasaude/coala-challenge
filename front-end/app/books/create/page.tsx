'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Container, Grid, Stack } from '@mui/material';

import { uploadBookCover } from '@/core/services/books/upload-book-cover';
import { createBook } from '@/core/services/books/create-book';

import WButton from '@/components/WButton';
import WInput from '@/components/WInput';
import WTextArea from '@/components/WTextArea';

import InputFile from './components/InputFile';
import * as styles from './styles';

export default function Book() {
  const [book, setBook] = useState({ title: '', publisher: '', year: '', author: '', description: '' });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const router = useRouter();

  const onChangePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files?.[0]) return;

    setImage(event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));
  };

  const handleYearChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.value.length > 4) return;
    setBook({ ...book, year: target.value.replace(/\D/, '') });
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
    <Container sx={styles.container}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" sx={styles.form}>
          <InputFile preview={imagePreview} onChange={onChangePicture} />

          <Stack gap={2} width="50%">
            <WInput
              label="Título"
              value={book.title}
              onChange={(event) => setBook({ ...book, title: event.target.value })}
              required
            />

            <WInput
              label="Autor"
              value={book.author}
              onChange={(event) => setBook({ ...book, author: event.target.value })}
              required
            />

            <Grid container spacing={2}>
              <Grid item xs={8}>
                <WInput
                  label="Editora"
                  value={book.publisher}
                  onChange={(event) => setBook({ ...book, publisher: event.target.value })}
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <WInput type="tel" label="Ano" value={book.year} onChange={handleYearChange} required />
              </Grid>
            </Grid>

            <WTextArea
              label="Descrição"
              value={book.description}
              onChange={(event) => setBook({ ...book, description: event.target.value })}
              required
            />

            <WButton type="submit">Adicionar livro</WButton>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}
