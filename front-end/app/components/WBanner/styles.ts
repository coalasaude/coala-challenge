import { SxProps } from '@mui/material';
import { CSSProperties } from 'react';

export const container: SxProps = {
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',

  background: '#ccc',
  color: '#888',
};

export const image: CSSProperties = {
  objectFit: 'cover',
};

export const placeholder: SxProps = {
  width: '100%',
  textAlign: 'center',
  p: 2,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};
