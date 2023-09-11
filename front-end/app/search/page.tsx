import { Container, Stack, Typography } from '@mui/material';

import WBanner from '@/components/WBanner';
import WInputSearch from '@/components/WInputSearch';
import { searchBooks } from '@/core/services/books/search-books';
import WLink from '@/components/WLink';

import * as styles from './styles';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
  const query = searchParams.q as string;
  const books = await searchBooks(searchParams.q as string);

  return (
    <Container sx={styles.container}>
      <WInputSearch />

      <Stack sx={styles.descriptions}>
        <Typography variant="h4">{query ? `Resultados para \"${query}\"` : 'Todos os livros'}</Typography>

        <Typography variant="body1" sx={styles.subtitle}>
          Encontramos {books.length} resultados
        </Typography>
      </Stack>

      <Stack direction="row" sx={styles.books}>
        {books.map((book) => (
          <WLink href={`/books/${book.id}`} key={book.id}>
            <WBanner image={book.image} placeholder={book.title} />
          </WLink>
        ))}
      </Stack>
    </Container>
  );
}
