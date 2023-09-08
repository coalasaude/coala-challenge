type Pagination = {
  page: number;
  limit: number;
  total: number;
};

type Book = {
  id: string;
  title: string;
  image?: string;
};

type SearchBookResponse = {
  pagination: Pagination;
  books: Book[];
};

export async function getBooks(q: string) {
  const response = await fetch(`http://localhost:3001/books?q=${q}`);
  const data: SearchBookResponse = await response.json();

  return data.books;
}
