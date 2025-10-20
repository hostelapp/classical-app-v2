import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const normalizeBasePath = (value?: string) => {
  if (!value || value === '/') {
    return '/';
  }

  let normalized = value.trim();
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  if (!normalized.endsWith('/')) {
    normalized = `${normalized}/`;
  }

  return normalized;
};

const resolveBasePath = (rawEnv: Record<string, string>) => {
  const configured = rawEnv.VITE_BASE_PATH;

  if (configured && configured.trim() !== '') {
    return normalizeBasePath(configured);
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
  if (repoName) {
    return normalizeBasePath(`/${repoName}/`);
  }

  return '/';
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: resolveBasePath(env),
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
  };
});
