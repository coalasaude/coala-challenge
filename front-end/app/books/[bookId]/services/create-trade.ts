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
  const token = localStorage.getItem('token');

  console.log('message', message);

  const response = await fetch(`http://localhost:3001/books/${bookId}/trades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (!response.ok && data?.message === 'Cannot create trade') {
    return { error: { message: 'Você não pode criar um proposta de troca para seu próprio livro' } };
  }

  return { trade: data.trade };
}
