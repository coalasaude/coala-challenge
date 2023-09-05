'use client';

import { Typography, IconButton, Box, Link } from '@mui/material';
import ScrollContainer from 'react-indiana-drag-scroll';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRef } from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const OFFSET = 225;

export default function Carousel({ title, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  const handlePrev = () => {
    const offset = (ref.current?.scrollLeft || 0) - OFFSET;
    ref.current?.scrollTo({ left: offset, behavior: 'smooth' });
  };

  const handleNext = () => {
    const offset = (ref.current?.scrollLeft || 0) + OFFSET;
    ref.current?.scrollTo({ left: offset, behavior: 'smooth' });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>

        <Box mb={1}>
          <IconButton onClick={() => handlePrev()}>
            <ArrowForwardIosIcon sx={{ rotate: '180deg' }} />
          </IconButton>

          <IconButton onClick={() => handleNext()}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      <ScrollContainer horizontal innerRef={ref} style={{ display: 'flex', gap: '1.5rem', position: 'relative' }}>
        {children}
      </ScrollContainer>
    </Box>
  );
}
