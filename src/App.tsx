import { useEffect, useState } from 'react';
import PublicExperience from './pages/PublicExperience';
import AdminApp from './pages/AdminApp';
import NotFound from './pages/NotFound';

const ensureLeadingSlash = (value: string) => (value.startsWith('/') ? value || '/' : `/${value}`);

const trimTrailingSlash = (value: string) => {
  if (value === '/') {
    return value;
  }

  return value.replace(/\/+$/, '') || '/';
};

const basePath = trimTrailingSlash(ensureLeadingSlash(import.meta.env.BASE_URL));

const getRoutePath = (pathname: string) => {
  const normalizedPath = trimTrailingSlash(ensureLeadingSlash(pathname));

  if (basePath !== '/' && normalizedPath.startsWith(basePath)) {
    const remainder = normalizedPath.slice(basePath.length);
    if (remainder === '') {
      return '/';
    }

    return trimTrailingSlash(ensureLeadingSlash(remainder));
  }

  return normalizedPath;
};

const App = () => {
  const [path, setPath] = useState<string>(() => getRoutePath(window.location.pathname));

  useEffect(() => {
    const handlePopState = () => {
      setPath(getRoutePath(window.location.pathname));
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
