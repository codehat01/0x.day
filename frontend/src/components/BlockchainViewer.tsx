import React from 'react';
import { type Block } from '../lib/blockchain';
import { Link2, FileText, Clock, Hash } from 'lucide-react';

interface BlockchainViewerProps {
  blocks: Block[];
}

export function BlockchainViewer({ blocks }: BlockchainViewerProps) {
  return (
    <div className="space-y-4">
      {blocks.map((block) => (
        <div
          key={block.hash}
          className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Block #{block.index}
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              <Clock className="inline-block w-4 h-4 mr-1" />
              {new Date(block.timestamp).toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <FileText className="w-4 h-4 mr-2 text-blue-500 dark:text-blue-300" />
              <span className="font-medium text-gray-900 dark:text-gray-100">File:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300">{block.fileName}</span>
            </div>

            <div className="flex items-center text-sm">
              <Hash className="w-4 h-4 mr-2 text-green-500 dark:text-green-300" />
              <span className="font-medium text-gray-900 dark:text-gray-100">File Hash:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300 break-all">{block.fileHash}</span>
            </div>

            <div className="flex items-center text-sm">
              <Link2 className="w-4 h-4 mr-2 text-purple-500 dark:text-purple-300" />
              <span className="font-medium text-gray-900 dark:text-gray-100">Previous Hash:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300 break-all">{block.previousHash}</span>
            </div>

            <div className="flex items-center text-sm">
              <Hash className="w-4 h-4 mr-2 text-orange-500 dark:text-orange-300" />
              <span className="font-medium text-gray-900 dark:text-gray-100">Block Hash:</span>
              <span className="ml-2 text-gray-600 dark:text-gray-300 break-all">{block.hash}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
