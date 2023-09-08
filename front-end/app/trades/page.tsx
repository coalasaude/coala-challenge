'use client';

import { Box, Container, Typography } from '@mui/material';
import TradeCard from './components/TradeCard';
import { useEffect, useState } from 'react';

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
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3001/trades/${tradeId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'ACCEPTED' }),
    });

    if (response.ok) {
      const updatedTrades = ownerTrades.map((trade) => {
        if (trade.id === tradeId) {
          return { ...trade, status: 'ACCEPTED' };
        }

        return trade;
      });

      setOwnerTrades(updatedTrades);
    }
  };

  const handleRefuse = async (tradeId: string) => {
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:3001/trades/${tradeId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'REJECTED' }),
    });

    if (response.ok) {
      const updatedTrades = ownerTrades.map((trade) => {
        if (trade.id === tradeId) {
          return { ...trade, status: 'REJECTED' };
        }

        return trade;
      });

      setOwnerTrades(updatedTrades);
    }
  };

  useEffect(() => {
    const fetchTrades = async () => {
      const token = localStorage.getItem('token');

      let response = await fetch('http://localhost:3001/trades?scope=owner', {
        headers: { Authorization: `Bearer ${token}` },
      });
      let data = await response.json();

      if (response.ok) setOwnerTrades(data.trades);

      response = await fetch('http://localhost:3001/trades?scope=requester', {
        headers: { Authorization: `Bearer ${token}` },
      });
      data = await response.json();

      if (response.ok) setRequesterTrades(data.trades);
    };

    fetchTrades();
  }, []);

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h3" component="h1">
          Trocas
        </Typography>
      </Box>

      <Box mt={5}>
        <Typography variant="h5" component="p" mb={2}>
          Minhas trocas
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2}>
          {requesterTrades?.map((trade) => (
            <TradeCard trade={trade} />
          ))}
        </Box>

        <Box mt={10}>
          <Typography variant="h5" component="p" mb={2}>
            Trocas pendentes
          </Typography>

          <Box display="flex" flexWrap="wrap" gap={2}>
            {ownerTrades?.map((trade) => (
              <TradeCard
                trade={trade}
                hasActions
                onAccept={() => handleAccept(trade.id)}
                onRefuse={() => handleRefuse(trade.id)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
