import { api } from '../api';

type CreateBookParams = {
  id: string;
  image: File;
};

export async function uploadBookCover({ id, image }: CreateBookParams): Promise<void> {
  const formData = new FormData();
  formData.append('file', image);

  await api.post(`/books/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
