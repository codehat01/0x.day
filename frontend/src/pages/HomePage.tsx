import { Link } from 'react-router-dom';
import { FileText, Search, History} from 'lucide-react';

export function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Blockchain File System
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Secure file storage and verification using blockchain technology
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link
          to="/upload"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Upload Files
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Add new files to the blockchain with secure hash verification
            </p>
          </div>
        </Link>

        <Link
          to="/verify"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center">
            <Search className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Verify Files
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Check file authenticity and view blockchain records
            </p>
          </div>
        </Link>
        <Link
          to="/history"
          className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex flex-col items-center">
            <History className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              view history 
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              view files and download
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
