import Image from 'next/image';
import Link from 'next/link';

import { Box, Typography } from '@mui/material';

type Book = {
  id: string;
  title: string;
  image?: string;
};

type Props = {
  book: Book;
  width?: number;
  height?: number;
};

export default function Banner({ book, height, width }: Props) {
  return (
    <Link href={`/books/${book.id}`} style={{ textDecoration: 'none', color: '#666' }}>
      <Box
        width={width || 200}
        minWidth={width || 200}
        height={height || 300}
        display="flex"
        justifyContent="center"
        alignItems="center"
        title={book.title}
        sx={{ background: '#ccc' }}
      >
        {book.image ? (
          <Image src={book.image} alt="book" fill objectFit="cover" />
        ) : (
          <Typography
            variant="h6"
            component="h2"
            sx={{
              width: '100%',
              textAlign: 'center',
              p: 2,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {book.title}
          </Typography>
        )}
      </Box>
    </Link>
  );
}
