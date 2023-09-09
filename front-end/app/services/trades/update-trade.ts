import { api } from '../api';

type UpdateTradeParams = {
  tradeId: string;
  status: 'ACCEPTED' | 'REJECTED';
};

export async function updateTrade({ tradeId, status }: UpdateTradeParams): Promise<Boolean> {
  try {
    await api.patch(`/trades/${tradeId}`, { status });
  } catch (error) {
    return false;
  }

  return true;
}
