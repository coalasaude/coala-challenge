import { api } from '../api';

type Trade = {
  id: string;
  status: string;
  message: string;
  book: {
    id: string;
    title: string;
  };
};

type GetTradeResponse = {
  trades: Trade[];
};

export async function getTrades(scope: 'requester' | 'owner'): Promise<GetTradeResponse> {
  const response = await api.get<GetTradeResponse>('/trades');
  return response.data;
}
