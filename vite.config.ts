import { defineConfig } from 'vite';
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

// https://vitejs.dev/config/
export default defineConfig({
  base: normalizeBasePath(process.env.VITE_BASE_PATH),
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
