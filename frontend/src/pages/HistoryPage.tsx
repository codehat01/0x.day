// src/pages/HistoryPage.tsx
import React from 'react';
import { FileHistory } from '../components/FileHistory';
import { Shield } from 'lucide-react';

export function HistoryPage() {
  return (
    <div className="container mx-auto px-4">
      <div className="mb-8">
        <div className="flex items-center">
          <Shield className="w-8 h-8 text-indigo-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Blockchain File History</h1>
        </div>
        <p className="mt-2 text-gray-600">
          View and download your previously uploaded files, secured by blockchain technology.
        </p>
      </div>
      <FileHistory />
    </div>
  );
}