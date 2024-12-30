const DB_NAME = 'blockchain-files';
const DB_VERSION = 1;
const STORE_NAME = 'files';

export class FileStorage {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };
    });
  }

  async storeFile(file: File, hash: string): Promise<string> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        const id = crypto.randomUUID();
        const storedFile = {
          id,
          name: file.name,
          content: reader.result,
          hash,
          timestamp: Date.now()
        };

        const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        
        const request = store.add(storedFile);
        request.onsuccess = () => resolve(id);
        request.onerror = () => reject(request.error);
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsArrayBuffer(file);
    });
  }

  async getFile(id: string): Promise<ArrayBuffer> {
    if (!this.db) throw new Error('Database not initialized');

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result.content);
      request.onerror = () => reject(request.error);
    });
  }
}