import { Container, Stack, Typography } from '@mui/material';

import { getBook } from '@/core/services/books/get-book-by-id';
import TradeModal from './components/TradeModal';
import WBanner from '@/components/WBanner';

import * as styles from './styles';

type Props = {
  params: { bookId: string };
};

export async function generateMetadata({ params }: Props) {
  const book = await getBook(params.bookId);
  return { title: `Wormhole | ${book?.title}` };
}

export default async function Book({ params }: Props) {
  const { bookId } = params;
  const book = await getBook(bookId);

  return (
    <Container sx={styles.container}>
      <Stack gap={2}>
        <WBanner placeholder={book?.title} image={book?.image} />
        <TradeModal bookId={bookId} />
      </Stack>

      <Stack sx={styles.content}>
        <Typography variant="h3" component="h1">
          {book?.title}
        </Typography>

        <Typography variant="body1" component="p" sx={styles.description}>
          {book?.description}
        </Typography>
      </Stack>
    </Container>
  );
}
