import Image from 'next/image';
import { Box, Container, Typography } from '@mui/material';
import Button from '@/components/Button';

type Props = {
  params: { bookId: string };
};

async function getBook(bookId: string) {
  return {
    id: 1,
    title: 'vinte mil léguas submarinas',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl nisl vitae aliquam ultricies, nunc nisl ultricies nunc, vitae aliquam nisl',
    image: '/book.jpg',
  };
}

export async function generateMetadata({ params }: Props) {
  const book = await getBook(params.bookId);

  return { title: `Wormhole | ${book.title}` };
}

export default async function Book({ params }: Props) {
  const { bookId } = params;
  const book = await getBook(bookId);

  return (
    <Container>
      <Box mt={15} display="flex">
        <Box sx={{ width: 400, height: 600, position: 'relative', minWidth: 400 }} title={book.title}>
          <Image src={book.image} alt="book" fill objectFit="cover" />
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

          <Button sx={{ mt: 3 }}>Iniciar troca</Button>
        </Box>
      </Box>
    </Container>
  );
}
