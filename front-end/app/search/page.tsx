import { Box, Container, Typography } from '@mui/material';

import Banner from '@/components/Banner';
import InputSearch from '@/components/InputSearch';

import { searchBooks } from '@/services/books/search-books';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
  const query = searchParams.q as string;
  const books = await searchBooks(searchParams.q as string);

  return (
    <Container sx={{ pb: 20 }}>
      <Box mt={4}>
        <InputSearch />
      </Box>

      <Box mt={5} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">{query ? `Resultados para \"${query}\"` : 'Todos os livros'}</Typography>

          <Box mt={2}>
            <Typography variant="body1">Encontramos {books.length} resultados</Typography>
          </Box>
        </Box>
      </Box>

      <Box mt={5}>
        <Box mt={2} display="flex" flexWrap="wrap" gap="2rem">
          {books.map((book) => (
            <Banner book={book} key={book.id} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
