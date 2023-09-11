'use client';

import { useState } from 'react';
import useSWR from 'swr';

import { Container, Grid, Stack, Typography } from '@mui/material';

import fetcher from '@/core/services/fetcher';
import { Trade } from '@/core/types';

import TradeCard from './components/TradeCard';

export default function Trades() {
  const [ownerTrades, setOwnerTrades] = useState<Trade[]>([]);

  const { data: owner } = useSWR<{ trades: Trade[] }>('/trades?scope=owner', fetcher);
  const { data: requester } = useSWR<{ trades: Trade[] }>('/trades?scope=requester', fetcher);

  const handleUpdate = (tradeId: string, status: 'REJECTED' | 'ACCEPTED') => {
    const updatedTrades = ownerTrades.map((trade) => {
      if (trade.id === tradeId) return { ...trade, status };
      return trade;
    });

    setOwnerTrades(updatedTrades);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h5" component="p" mb={2}>
        Minhas trocas
      </Typography>

      <Grid container spacing={2}>
        {requester?.trades?.map((trade) => (
          <Grid item xs={4} key={trade.id}>
            <TradeCard trade={trade} />
          </Grid>
        ))}
      </Grid>

      <Stack mt={10}>
        <Typography variant="h5" component="p" mb={2}>
          Trocas pendentes
        </Typography>

        <Grid container spacing={2}>
          {owner?.trades?.map((trade) => (
            <Grid item xs={4} key={trade.id}>
              <TradeCard
                trade={trade}
                hasActions
                onAccept={() => handleUpdate(trade.id, 'ACCEPTED')}
                onRefuse={() => handleUpdate(trade.id, 'REJECTED')}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
}
