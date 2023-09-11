import { isVariableStatement } from 'typescript';
import * as styles from './style';
import { Button as MuiButton } from '@mui/material';

type Props = {
  children: React.ReactNode;
  type?: 'submit';
  disabled?: boolean;
  variant?: 'text' | 'contained' | 'outlined';
  color?: 'error';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function WButton({ children, variant, type, disabled, color, onClick }: Props) {
  return (
    <MuiButton
      type={type}
      variant={variant || 'contained'}
      disableElevation
      disableRipple
      disabled={disabled}
      sx={styles.button}
      onClick={onClick}
      color={color}
    >
      {children}
    </MuiButton>
  );
}
