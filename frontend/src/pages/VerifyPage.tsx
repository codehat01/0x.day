import React, { useState, useCallback } from 'react';
import { Search, CheckCircle, XCircle, Upload, AlertCircle } from 'lucide-react';

interface BlockchainMatch {
  index: number;
  file_name: string;
  hash: string;
  timestamp: string;
  previous_hash?: string;
}

export function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [verificationResults, setVerificationResults] = useState<BlockchainMatch[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const calculateFileHash = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/calculate-hash', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to calculate file hash');
      }

      const data = await response.json();
      return data.hash;
    } catch (err) {
      throw new Error('Error calculating file hash');
    }
  };

  const verifyFile = async (fileHash: string, fileName: string) => {
    try {
      const response = await fetch('http://localhost:8000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_hash: fileHash,
          file_name: fileName,
        }),
      });

      if (!response.ok) {
        throw new Error('Verification failed');
      }

      return await response.json();
    } catch (err) {
      throw new Error('Error during verification');
    }
  };

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      setError(null);
      setVerificationResults([]);
    }
  }, []);

  const handleVerification = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }

    setIsVerifying(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const fileHash = await calculateFileHash(file);
      const results = await verifyFile(fileHash, file.name);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setVerificationResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* File Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Verify Files on Blockchain
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Any file type supported
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                onChange={handleFileSelect}
                disabled={isVerifying}
              />
            </label>
          </div>

          {file && (
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </span>
              <button
                onClick={handleVerification}
                disabled={isVerifying}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? 'Verifying...' : 'Verify File'}
              </button>
            </div>
          )}

          {isVerifying && (
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Processing file...
              </p>
            </div>
          )}

          {error && (
            <div className="p-4 text-red-900 bg-red-100 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                <p>{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {!isVerifying && verificationResults.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-6">
            <CheckCircle className="w-6 h-6 text-green-500 dark:text-green-400 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              File Found in Blockchain
            </h3>
          </div>
          <div className="space-y-4">
            {verificationResults.map((block) => (
              <div
                key={block.hash}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Block Index</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {block.index}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">File Name</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {block.file_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Timestamp</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {new Date(block.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Block Hash</p>
                    <p className="font-medium text-xs break-all text-gray-900 dark:text-white">
                      {block.hash}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!isVerifying && verificationResults.length === 0 && file && !error && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
          <XCircle className="w-12 h-12 text-red-500 dark:text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            File Not Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            This file was not found in the blockchain or has been tampered with.
          </p>
        </div>
      )}
    </div>
  );
}