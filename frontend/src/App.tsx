import { createContext, useState, useEffect, ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { BlockchainProvider } from './contexts/BlockchainContext';
import { UploadPage } from './pages/UploadPage';
import { VerifyPage } from './pages/VerifyPage';
import { AuthForm } from './components/AuthForm';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { ThemeToggle } from './components/ThemeToggle';
import { HistoryPage } from './pages/HistoryPage';
const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-200">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white tracking-wider">
          {['H', 'A', 'A', 'M', 'S'].map((letter, index) => (
            <span
              key={index}
              className="inline-block animate-pulse"
              style={{
                animationDelay: `${index * 0.1}s`,
                opacity: 0.3,
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
        <div className="mt-8">
          <div className="w-32 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto overflow-hidden">
            <div className="w-full h-full bg-blue-600 animate-loadingBar" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export function App() {
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitializing(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (initializing) {
    return <SplashScreen />;
  }

  return (
    <BlockchainProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
          <Routes>
            <Route
              path="/auth"
              element={
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
                  <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 transition-colors duration-200">
                      <AuthForm />
                    </div>
                  </div>
                </div>
              }
            />
            
            <Route
              element={
                <ProtectedRoute>
                  <div>
                    <Navigation />
                    <main className="py-8">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/upload" element={<UploadPage />} />
                          <Route path="/verify" element={<VerifyPage />} />
                          <Route path="/history" element={<HistoryPage />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<HomePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ThemeToggle />
        </div>
      </Router>
    </BlockchainProvider>
  );
}

export default App;