import { useEffect, useState } from 'react';
import PublicExperience from './pages/PublicExperience';
import AdminApp from './pages/AdminApp';
import NotFound from './pages/NotFound';

const normalizePath = (pathname: string) => {
  if (pathname === '/') return pathname;
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
};

const App = () => {
  const [path, setPath] = useState<string>(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  switch (path) {
    case '/':
      return <PublicExperience />;
    case '/admin':
      return <AdminApp />;
    default:
      return <NotFound currentPath={path} />;
  }
};

export default App;
