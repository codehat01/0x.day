// src/components/Navigation.tsx
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FileText, Search, LogOut, History } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg mb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/')
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/upload')
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              Upload Files
            </Link>
            <Link
              to="/verify"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/verify')
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <Search className="w-4 h-4 mr-2" />
              Verify Files
            </Link>
            <Link
              to="/history"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                isActive('/history')
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <History className="w-4 h-4 mr-2" />
              File History
            </Link>
          </div>
          
          {/* Logout Button */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}