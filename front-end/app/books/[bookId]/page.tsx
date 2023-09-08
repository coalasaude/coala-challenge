import Image from 'next/image';

import { Box, Container, Typography } from '@mui/material';

import { getBook } from './services/get-book-by-id';
import Back from '@/components/Back';
import TradeModal from './components/TradeModal';

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
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={5}>
        <Back />
      </Box>

      <Box mt={5} display="flex">
        <Box width={300} height={450} minWidth={300} title={book.title} sx={{ background: '#ccc' }}>
          {book.image && <Image src={book.image} alt="book" fill objectFit="cover" />}
        </Box>

        <Box ml={15}>
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
