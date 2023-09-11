import { Box, Stack, Typography } from '@mui/material';

import WBanner from '@/components/WBanner';
import WLink from '@/components/WLink';
import WButton from '@/components/WButton';
import { Trade } from '@/core/types';

import * as styles from './styles';

type TradeCardProps = {
  trade: Trade;
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
    <Stack direction="row" sx={styles.container}>
      <WLink href={`/books/${trade.book.id}`}>
        <WBanner placeholder={trade.book.title} image={trade.book.image} width={100} height={150} />
      </WLink>

      <Stack sx={styles.content}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="body1" component="p">
            <strong>{mappingStatus[trade.status]}</strong>
          </Typography>

          {hasActions && trade.status === 'PENDING' && (
            <Stack direction="row">
              <WButton variant="text" color="error" onClick={onRefuse}>
                Recusar
              </WButton>

              <WButton variant="text" onClick={onAccept}>
                Aceitar
              </WButton>
            </Stack>
          )}
        </Stack>

        <Typography variant="body2" component="p" sx={styles.messageLabel}>
          <strong>Mensagem</strong>
        </Typography>

        <Typography variant="body2" component="p" sx={styles.message}>
          {trade.message}
        </Typography>
      </Stack>
    </Stack>
  );
}
