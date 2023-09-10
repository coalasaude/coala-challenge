import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

import { getBook } from '@/services/books/get-book-by-id';
import TradeModal from './components/TradeModal';
import Banner from '@/components/Banner';

type Props = {
  params: { bookId: string };
};

export async function generateMetadata({ params }: Props) {
  const book = await getBook(params.bookId);
  return { title: `Wormhole | ${book.title}` };
}

export default async function Book({ params }: Props) {
  const { bookId } = params;
  const book = await getBook(bookId);

  return (
    <Container sx={{ pb: 10 }}>
      <Box mt={5} display="flex">
        <Banner book={book} />

        <Box ml={5}>
          <Typography variant="h3" component="h1">
            {book.title}
          </Typography>

          <Box mt={2}>
            <Typography variant="body1" component="p">
              {book.description}
            </Typography>
          </Box>

          <TradeModal bookId={bookId} />
        </Box>
      </Box>
    </Container>
  );
}
