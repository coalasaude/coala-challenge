import { Trade } from '@/core/types';
import { api } from '../api';

type GetTradeResponse = {
  trades: Trade[];
};

export async function getTrades(scope: 'requester' | 'owner'): Promise<GetTradeResponse> {
  const response = await api.get<GetTradeResponse>(`/trades?scope=${scope}`);
  return response.data;
}
