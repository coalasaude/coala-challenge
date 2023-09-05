import Banner from '@/components/Banner';
import { Box, Container, Typography } from '@mui/material';

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
      <Box mt={15}>
        <Typography variant="h4">Resultados para "{searchParams.q}"</Typography>

        <Box mt={2}>
          <Typography variant="body1">Encontramos {books.length} resultados</Typography>
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
