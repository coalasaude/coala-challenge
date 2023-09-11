export interface Storage {
  upload(params: Storage.UploadParams): Promise<Storage.UploadResponse>;
}

export namespace Storage {
  export type UploadParams = {
    file: Buffer;
    path: string;
    mimetype: string;
  };

  export type UploadResponse = {
    url: string;
  };
}
