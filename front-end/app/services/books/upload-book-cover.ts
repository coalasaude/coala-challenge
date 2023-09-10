import { api } from '../api';

type CreateBookParams = {
  id: string;
  image: File;
};

export async function uploadBookCover({ id, image }: CreateBookParams): Promise<void> {
  const formData = new FormData();
  formData.append('file', image);

  const response = await api.post(`/books/${id}/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  console.log(response.data);
}
