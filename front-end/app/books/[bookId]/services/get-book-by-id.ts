type Book = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  description: string;
  image?: string;
};

export async function getBook(bookId: string): Promise<Book> {
  const response = await fetch(`http://localhost:3001/books/${bookId}`);
  const book = await response.json();
  return book;
}
