import { Button as MuiButton } from '@mui/material';

type Props = {
  children: React.ReactNode;
  sx?: Record<string, unknown>;
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({ children, sx, type }: Props) {
  return (
    <MuiButton
      type={type}
      variant="contained"
      disableElevation
      disableRipple
      sx={{ borderRadius: 1, whiteSpace: 'nowrap', ...sx }}
    >
      {children}
    </MuiButton>
  );
}
