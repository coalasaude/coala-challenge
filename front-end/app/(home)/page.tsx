import { Box, Container, Stack, Typography } from '@mui/material';

import WMenu from '@/components/WMenu';
import WInputSearch from '@/components/WInputSearch';

import * as styles from './styles';

export default function Home() {
  return (
    <main>
      <Container sx={styles.container}>
        <Box sx={styles.menu}>
          <WMenu />
        </Box>

        <Stack minWidth={500} alignItems="center">
          <Typography variant="h2" component="h1" sx={styles.brand}>
            Wormhole
          </Typography>

          <WInputSearch />
        </Stack>
      </Container>
    </main>
  );
}
