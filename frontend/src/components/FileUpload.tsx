import React, { useCallback, useState } from 'react';
import { Upload, AlertTriangle, Loader2, Link } from 'lucide-react';
import { useBlockchain } from '../hooks/useBlockchain';

interface FileUploadProps {
  onFileSelect: (fileHash: string, fileName: string) => void;
  showDuplicateWarning?: boolean;
}

interface UploadResponse {
  message: string;
  file_url?: string;
  error?: string;
}

export function FileUpload({ onFileSelect, showDuplicateWarning = true }: FileUploadProps) {
  const { blockchain } = useBlockchain();
  const [isDragging, setIsDragging] = useState(false);
  const [duplicateFound, setDuplicateFound] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

  const calculateFileHash = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const submitFileToServer = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload/', {
        method: 'POST',
        body: formData,
      });

      const data: UploadResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload file');
      }

      if (data.file_url) {
        setUploadedFileUrl(data.file_url);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch')) {
          throw new Error('Unable to connect to server. Please check if the server is running.');
        }
        throw error;
      }
      throw new Error('Unknown error occurred during upload');
    }
  };

  const handleFile = useCallback(async (file: File) => {
    setUploadError(null);
    setUploadedFileUrl(null);
    setIsUploading(true);

    try {
      const fileHash = await calculateFileHash(file);
      
      if (showDuplicateWarning && blockchain.checkDuplicateBeforeAdd(fileHash)) {
        setDuplicateFound(true);
        const proceed = window.confirm(
          'This file already exists in the blockchain. Do you want to add it anyway?'
        );
        if (!proceed) {
          setIsUploading(false);
          return;
        }
      }

      const uploadResponse = await submitFileToServer(file);
      console.log('Upload successful:', uploadResponse);
      
      onFileSelect(fileHash, file.name);
      setDuplicateFound(false);
    } catch (error) {
      console.error('Error processing file:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }, [blockchain, onFileSelect, showDuplicateWarning]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="w-full">
      <div
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer ${
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : duplicateFound
            ? 'border-yellow-500 bg-yellow-50'
            : uploadError
            ? 'border-red-500 bg-red-50'
            : 'border-gray-300 bg-gray-50'
        } hover:bg-gray-100 transition-colors`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="w-12 h-12 text-indigo-500 mb-4 animate-spin" />
            ) : duplicateFound ? (
              <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
            ) : uploadError ? (
              <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            ) : uploadedFileUrl ? (
              <Link className="w-12 h-12 text-green-500 mb-4" />
            ) : (
              <Upload className="w-12 h-12 text-gray-400 mb-4" />
            )}
            <p className="mb-2 text-sm text-gray-500">
              {isUploading ? (
                'Uploading to Filebase...'
              ) : (
                <span className="font-semibold">Click to upload</span>
              )}
              {!isUploading && ' or drag and drop'}
            </p>
            <p className="text-xs text-gray-500">
              {uploadError || (uploadedFileUrl ? 'File uploaded successfully!' : 'Any file to add to blockchain')}
            </p>
            {uploadedFileUrl && (
              <a 
                href={uploadedFileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-600 hover:text-indigo-800 mt-2"
              >
                View uploaded file
              </a>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}