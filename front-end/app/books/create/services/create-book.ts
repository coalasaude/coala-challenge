type CreateBookParams = {
  title: string;
  publisher: string;
  year: number;
  author: string;
  description: string;
};

type CreateBookResponse = {
  id: string;
  title: string;
  publisher: string;
  year: number;
  image?: string;
};

export async function createBook(params: CreateBookParams): Promise<CreateBookResponse> {
  const token = localStorage.getItem('token');
  const { title, publisher, year, author, description } = params;

  const response = await fetch('http://localhost:3001/books', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, publisher, year, author, description }),
  });

  const data = await response.json();

  return data;
}
