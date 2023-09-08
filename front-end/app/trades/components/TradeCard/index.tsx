import { Box, Button, Typography } from '@mui/material';

import Banner from '@/components/Banner';

type TradeCardProps = {
  trade: {
    id: string;
    status: string;
    message: string;
    book: {
      id: string;
      title: string;
    };
  };

  hasActions?: boolean;

  onAccept?: () => void;
  onRefuse?: () => void;
};

export default function TradeCard({ trade, hasActions, onAccept, onRefuse }: TradeCardProps) {
  const mappingStatus: Record<string, string> = {
    PENDING: 'Pendente',
    ACCEPTED: 'Aceita',
    REJECTED: 'Recusada',
  };

  return (
    <Box display="flex" maxWidth={400} borderRadius={1} sx={{ p: 2, background: '#E9F3F8' }}>
      <Banner book={trade.book} width={100} height={150} />

      <Box ml={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" component="p">
            <strong>{mappingStatus[trade.status]}</strong>
          </Typography>

          {hasActions && trade.status === 'PENDING' && (
            <Box>
              <Button variant="text" color="error" size="small" onClick={onRefuse}>
                Recusar
              </Button>

              <Button variant="text" color="primary" size="small" onClick={onAccept}>
                Aceitar
              </Button>
            </Box>
          )}
        </Box>

        <Typography variant="body2" component="p" sx={{ mt: 2 }}>
          <strong>Mensagem</strong>
        </Typography>

        <Typography variant="body2" component="p" sx={{ mt: 1, textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {trade.message}
        </Typography>
      </Box>
    </Box>
  );
}
