type UpdateTradeParams = {
  tradeId: string;
  status: 'ACCEPTED' | 'REJECTED';
};

export async function updateTrade({ tradeId, status }: UpdateTradeParams): Promise<Boolean> {
  const token = localStorage.getItem('token');

  const response = await fetch(`http://localhost:3001/trades/${tradeId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  return response.ok;
}
