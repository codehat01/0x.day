import React, { useEffect, useState } from 'react';
import { Download, Clock, FileText, Hash, Loader2 } from 'lucide-react';

interface FileInfo {
  name: string;
  hash: string;
  url: string;
  timestamp: string;
  block_number: number;
}

export function FileHistory() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://127.0.0.1:8000/history');
        if (!response.ok) {
          throw new Error('Failed to fetch history');
        }
        const data = await response.json();
        setFiles(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleDownload = async (fileName: string) => {
    try {
      setDownloading(fileName);
      const response = await fetch(`http://127.0.0.1:8000/download/${fileName}`);
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="ml-2">Loading files...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 font-medium mb-2">Error loading files</div>
        <div className="text-gray-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-2xl font-bold mb-6">Blockchain File History</h2>
      <div className="grid gap-4">
        {files.map((file) => (
          <div
            key={file.hash}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-indigo-500 mr-2" />
                  <span className="font-medium text-lg">{file.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{new Date(file.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Hash className="w-4 h-4 mr-2" />
                  <span className="truncate" title={file.hash}>
                    Block #{file.block_number} - Hash: {file.hash.substring(0, 20)}...
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleDownload(file.name)}
                disabled={downloading === file.name}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
              >
                {downloading === file.name ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
        {files.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files in blockchain</h3>
            <p className="text-gray-500">Upload some files to see them here.</p>
          </div>
        )}
      </div>
    </div>
  );
}