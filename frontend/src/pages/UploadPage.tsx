import React, { useState } from 'react';
import { FileUpload } from '../components/FileUpload';
import { useBlockchain } from '../hooks/useBlockchain';
import { CheckCircle } from 'lucide-react';

export function UploadPage() {
  const { blockchain, addBlock } = useBlockchain();
  const [lastUploadedBlock, setLastUploadedBlock] = useState<any>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (fileHash: string, fileName: string) => {
    setIsUploading(true);
    try {
      const newBlock = blockchain.addBlock(fileHash, fileName);
      setLastUploadedBlock(newBlock);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Upload Files
        </h2>
        <FileUpload onFileSelect={handleFileSelect} />
      </div>

      {isUploading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 dark:border-indigo-400 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Processing file and mining block...
          </p>
        </div>
      )}

      {!isUploading && lastUploadedBlock && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              File Successfully Added to Blockchain
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Block Index</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {lastUploadedBlock.index}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">File Name</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {lastUploadedBlock.fileName}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Timestamp</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {new Date(lastUploadedBlock.timestamp).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Block Hash</p>
              <p className="font-medium text-xs break-all text-gray-900 dark:text-white">
                {lastUploadedBlock.hash}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
