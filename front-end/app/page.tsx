import { Box, Button, Container, Link, Typography } from '@mui/material';
import InputSearch from '@/components/InputSearch';

export default function Home() {
  return (
    <main>
      <Container>
        <Box position="relative" display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Box position="absolute" top={0} right={0} mt={3}>
            <Link href="/signup">
              <Button variant="outlined" disableElevation sx={{ mr: 2 }}>
                Entrar
              </Button>
            </Link>

            <Link href="/login">
              <Button variant="contained" disableElevation>
                Cadastrar
              </Button>
            </Link>
          </Box>

          <Box minWidth={500} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h2" component="h1" sx={{ mb: 1 }}>
              Wormhole
            </Typography>

            <InputSearch />
          </Box>
        </Box>
      </Container>
    </main>
  );
}
