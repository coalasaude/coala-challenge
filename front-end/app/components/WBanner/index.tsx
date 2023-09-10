import Image from 'next/image';

import { Stack, Typography } from '@mui/material';

import * as styles from './styles';

type Props = {
  image?: string;
  placeholder?: string;
  width?: number;
  height?: number;
};

const DEFAULT_WIDTH = 200;
const DEFAULT_HEIGHT = 300;

export default function WBanner({ placeholder, image, height, width }: Props) {
  return (
    <Stack
      width={width || DEFAULT_WIDTH}
      minWidth={width || DEFAULT_WIDTH}
      height={height || DEFAULT_HEIGHT}
      title={placeholder}
      sx={styles.container}
    >
      {image ? (
        <Image
          src={image}
          alt={placeholder || 'book'}
          fill
          sizes={`${width || DEFAULT_WIDTH}px ${height || DEFAULT_HEIGHT}px`}
          style={styles.image}
        />
      ) : (
        <Typography variant="h6" component="h2" sx={styles.placeholder}>
          {placeholder}
        </Typography>
      )}
    </Stack>
  );
}
