import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadCatalog } from './catalogService';
import type { CatalogLoadResult } from './types';

type Status = 'idle' | 'loading' | 'loaded' | 'error';

interface CatalogState {
  status: Status;
  result: CatalogLoadResult | null;
  error: Error | null;
  reload: () => Promise<void>;
}

export const useCatalog = (): CatalogState => {
  const [status, setStatus] = useState<Status>('idle');
  const [result, setResult] = useState<CatalogLoadResult | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const reload = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const next = await loadCatalog();
      setResult(next);
      setStatus('loaded');
    } catch (err) {
      const failure = err instanceof Error ? err : new Error('Failed to load catalog');
      setError(failure);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return useMemo(
    () => ({
      status,
      result,
      error,
      reload,
    }),
    [status, result, error, reload]
  );
};
