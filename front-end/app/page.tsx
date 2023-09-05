import { Box, Container, Stack } from '@mui/material';

import Carousel from '@/components/Carousel';
import Banner from '@/components/Banner';

const books = [
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
  {
    id: 1,
    title: 'Vinte mil léguas submarinas',
    image: '/book.jpg',
  },
];

export default function Home() {
  return (
    <main>
      <Container>
        <Stack>
          <Box mt={15}>
            <Carousel title="Drama">
              {books.map((book, index) => (
                <Banner key={index} book={book} />
              ))}
            </Carousel>
          </Box>

          <Box mt={7}>
            <Carousel title="Ficção Cientifica">
              {books.map((book, index) => (
                <Banner key={index} book={book} />
              ))}
            </Carousel>
          </Box>

          <Box mt={7}>
            <Carousel title="Ficção Cientifica">
              {books.map((book, index) => (
                <Banner key={index} book={book} />
              ))}
            </Carousel>
          </Box>

          <Box mt={7}>
            <Carousel title="Ficção Cientifica">
              {books.map((book, index) => (
                <Banner key={index} book={book} />
              ))}
            </Carousel>
          </Box>
        </Stack>
      </Container>
    </main>
  );
}
