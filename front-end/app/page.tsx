import { Box, Container, Typography } from '@mui/material';
import InputSearch from '@/components/InputSearch';

export default function Home() {
  return (
    <main>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box minWidth={500} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" component="h1" sx={{ mb: 0 }}>
              Wormhole
            </Typography>

            <InputSearch />
          </Box>
        </Box>
      </Container>
    </main>
  );
}
