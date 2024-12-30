export interface StoredFile {
  id: string;
  name: string;
  content: ArrayBuffer;
  hash: string;
  timestamp: number;
}