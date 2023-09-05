import { Button as MuiButton } from '@mui/material';

type Props = {
  children: React.ReactNode;
};

export default function Button({ children }: Props) {
  return (
    <MuiButton variant="contained" disableElevation disableRipple sx={{ borderRadius: 1, whiteSpace: 'nowrap' }}>
      {children}
    </MuiButton>
  );
}
