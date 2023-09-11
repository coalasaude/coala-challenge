export interface UploadBookCoverUseCase {
  upload(params: UploadBookCoverUseCase.Params): Promise<UploadBookCoverUseCase.Result>;
}

export namespace UploadBookCoverUseCase {
  export type Params = {
    userId: string;
    bookId: string;
    file: Buffer;
    mimetype: string;
  };

  export type Result = {
    id: string;
    title: string;
    publisher: string;
    author: string;
    year: number;
    description: string;
    image: string;
  };
}
