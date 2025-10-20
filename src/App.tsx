import { useEffect, useState } from 'react';
import PublicExperience from './pages/PublicExperience';
import AdminApp from './pages/AdminApp';
import NotFound from './pages/NotFound';
import { stripBasePath } from './lib/basePath';

const App = () => {
  const [path, setPath] = useState<string>(() => stripBasePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPath(stripBasePath(window.location.pathname));
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
