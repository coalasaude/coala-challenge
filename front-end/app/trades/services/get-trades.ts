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
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:3001/trades?scope=${scope}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}
