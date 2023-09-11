import { Box, Modal } from '@mui/material';
import * as styles from './styles';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function WModal({ children, open, onClose }: Props) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.modal}>{children}</Box>
    </Modal>
  );
}
