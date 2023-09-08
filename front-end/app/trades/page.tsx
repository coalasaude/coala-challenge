'use client';

import { Box, Container, Grid, Typography } from '@mui/material';
import TradeCard from './components/TradeCard';
import { useEffect, useState } from 'react';
import { getTrades } from './services/get-trades';
import { updateTrade } from './services/update-trade';

type Trade = {
  id: string;
  status: string;
  message: string;
  book: {
    id: string;
    title: string;
  };
};

export default function Trades() {
  const [ownerTrades, setOwnerTrades] = useState<Trade[]>([]);
  const [requesterTrades, setRequesterTrades] = useState<Trade[]>([]);

  const handleAccept = async (tradeId: string) => {
    const isSuccessful = await updateTrade({ tradeId, status: 'ACCEPTED' });

    if (isSuccessful) {
      const updatedTrades = ownerTrades.map((trade) => {
        if (trade.id === tradeId) return { ...trade, status: 'ACCEPTED' };
        return trade;
      });

      setOwnerTrades(updatedTrades);
    }
  };

  const handleRefuse = async (tradeId: string) => {
    const isSuccessful = await updateTrade({ tradeId, status: 'REJECTED' });

    if (isSuccessful) {
      const updatedTrades = ownerTrades.map((trade) => {
        if (trade.id === tradeId) return { ...trade, status: 'REJECTED' };
        return trade;
      });

      setOwnerTrades(updatedTrades);
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const owner = await getTrades('owner');
      setOwnerTrades(owner.trades);

      const requester = await getTrades('requester');
      setRequesterTrades(requester.trades);
    };

    fetchTrades();
  }, []);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h5" component="p" mb={2}>
          Minhas trocas
        </Typography>

        <Grid container spacing={2}>
          {requesterTrades?.map((trade) => (
            <Grid item xs={4}>
              <TradeCard trade={trade} />
            </Grid>
          ))}
        </Grid>

        <Box mt={10}>
          <Typography variant="h5" component="p" mb={2}>
            Trocas pendentes
          </Typography>

          <Grid container spacing={2}>
            {ownerTrades?.map((trade) => (
              <Grid item xs={4}>
                <TradeCard
                  trade={trade}
                  hasActions
                  onAccept={() => handleAccept(trade.id)}
                  onRefuse={() => handleRefuse(trade.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
