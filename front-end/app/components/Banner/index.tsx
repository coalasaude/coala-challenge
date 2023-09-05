import Image from 'next/image';
import Link from 'next/link';

import { Box } from '@mui/material';

type Book = {
  id: number;
  title: string;
  image: string;
};

type Props = {
  book: Book;
};

export default function Banner({ book }: Props) {
  return (
    <Box sx={{ width: 200, height: 300, position: 'relative', minWidth: 200 }} title={book.title}>
      <Link href={`/book/${book.id}`}>
        <Image src={book.image} alt="book" fill objectFit="cover" />
      </Link>
    </Box>
  );
}
