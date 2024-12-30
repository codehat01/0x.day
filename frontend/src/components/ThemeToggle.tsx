import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed bottom-4 right-4 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};