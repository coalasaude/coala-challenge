import { Container, Typography } from '@mui/material';

async function getBooks(q: string) {
  const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${q}`);
  return response.json();
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Search({ searchParams }: Props) {
  const books = await getBooks(searchParams.q as string);

  return (
    <Container>
      <Typography variant="h1">Search</Typography>

      <pre>{JSON.stringify(books, null, 2)}</pre>
    </Container>
  );
}
