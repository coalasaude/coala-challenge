import Crypto from 'crypto';
import { Box, FormHelperText, InputBase as MuiInput, Typography } from '@mui/material';

type Props = {
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  minRows?: number;
};

export default function Input({ label, placeholder, multiline, minRows }: Props) {
  const uuid = Crypto.randomUUID();

  return (
    <Box width="100%">
      <Typography variant="body1" component="label" htmlFor={uuid}>
        {label}
      </Typography>

      <MuiInput
        id={uuid}
        placeholder={placeholder}
        multiline={multiline}
        minRows={minRows}
        sx={{
          px: 2,
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#FFFFFF',
          width: '100%',
        }}
      />
    </Box>
  );
}
