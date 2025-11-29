export interface Document {
  _id: string;
  fileName: string;
  userId: {
    _id: string;
    name: string;
  };
  path: string;
  comment: string;
  fileSize?: number;
  uploadDate?: string;
  fileType?: string;
}