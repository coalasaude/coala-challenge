import { Box, Container, Typography } from '@mui/material';

import Banner from '@/components/Banner';
import SelectFilter from './components/SelectFilter';

async function getBooks(q: string) {
  return [
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
    {
      id: 1,
      title: 'vinte mil léguas submarinas',
      image: '/book.jpg',
    },
  ];
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
  const books = await getBooks(searchParams.q as string);

  return (
    <Container>
      <Box mt={15} display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">Resultados para "{searchParams.q}"</Typography>

          <Box mt={2}>
            <Typography variant="body1">Encontramos {books.length} resultados</Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="flex-end">
          <SelectFilter
            placeholder="Categorias"
            filter="category"
            items={['Drama', 'Aventura', 'Comédia', 'Biografia']}
          />
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
