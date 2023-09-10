import { Box, Input, Stack, Typography } from '@mui/material';

import * as styles from './styles';
import WBanner from '@/components/WBanner';

type Props = {
  preview: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputFile({ preview, onChange }: Props) {
  return (
    <Box sx={styles.container} component="label" htmlFor="book-cover">
      {preview ? (
        <WBanner image={preview} />
      ) : (
        <Stack sx={styles.placeholder}>
          <Typography variant="body1" align="center">
            Clique aqui para adicionar uma capa
          </Typography>
        </Stack>
      )}

      <Input type="file" id="book-cover" sx={styles.input} inputProps={{ accept: 'image/*' }} onChange={onChange} />
    </Box>
  );
}
