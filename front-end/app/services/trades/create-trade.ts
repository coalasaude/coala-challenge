import { AxiosError } from 'axios';
import { api } from '../api';

type CreateTradeParams = {
  bookId: string;
  message: string;
};

type CreateTradeResponse = {
  error?: {
    message: string;
  };

  trade?: {
    id: string;
    message: string;
    status: string;
  };
};

export async function createTrade({ bookId, message }: CreateTradeParams): Promise<CreateTradeResponse> {
  try {
    const response = await api.post(`/books/${bookId}/trades`, { message });
    return { trade: response.data.trade };
  } catch (error) {
    if (isAxiosError(error) && error?.response?.data?.message === 'Cannot create trade') {
      return { error: { message: 'Você não pode criar um proposta de troca para seu próprio livro' } };
    }

    return { error: { message: 'Ocorreu um erro ao criar a proposta de troca' } };
  }
}

function isAxiosError(error: any): error is AxiosError<{ message: string }> {
  return error;
}
