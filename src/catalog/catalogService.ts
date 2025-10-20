import { buildStaticAssetPath } from '../lib/basePath';
import { defaultCatalog } from './defaultCatalog';
import type { CatalogComposer, CatalogDocument, CatalogGenre, CatalogLoadResult, CatalogSummary, CatalogWork } from './types';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

const asString = (value: unknown, fallback: string | null = null) =>
  typeof value === 'string' ? value : fallback;

const asNumberOrNull = (value: unknown) => (typeof value === 'number' && Number.isFinite(value) ? value : null);

const parseWork = (candidate: unknown): CatalogWork => {
  if (!isRecord(candidate)) {
    throw new Error('Each work must be an object.');
  }

  const id = asString(candidate.id ?? null ?? undefined);
  const title = asString(candidate.title ?? null ?? undefined);

  if (!id || !title) {
    throw new Error('Each work requires an id and title.');
  }

  return {
    id,
    title,
    year: asNumberOrNull(candidate.year ?? null),
    youtubeId: asString(candidate.youtubeId ?? null, null),
    searchTerm: asString(candidate.searchTerm ?? null, null),
  };
};

const parseComposer = (candidate: unknown): CatalogComposer => {
  if (!isRecord(candidate)) {
    throw new Error('Each composer must be an object.');
  }

  const id = asString(candidate.id ?? null ?? undefined);
  const name = asString(candidate.name ?? null ?? undefined);

  if (!id || !name) {
    throw new Error('Each composer requires an id and name.');
  }

  const works = Array.isArray(candidate.works) ? candidate.works.map(parseWork) : [];
  if (works.length === 0) {
    throw new Error(`Composer ${name} must define at least one work.`);
  }

  return {
    id,
    name,
    birthYear: asNumberOrNull(candidate.birthYear ?? null),
    deathYear: asNumberOrNull(candidate.deathYear ?? null),
    works,
  };
};

const parseGenre = (candidate: unknown): CatalogGenre => {
  if (!isRecord(candidate)) {
    throw new Error('Each genre must be an object.');
  }

  const id = asString(candidate.id ?? null ?? undefined);
  const name = asString(candidate.name ?? null ?? undefined);

  if (!id || !name) {
    throw new Error('Each genre requires an id and name.');
  }

  const composers = Array.isArray(candidate.composers) ? candidate.composers.map(parseComposer) : [];
  if (composers.length === 0) {
    throw new Error(`Genre ${name} must include at least one composer.`);
  }

  return {
    id,
    name,
    period: asString(candidate.period ?? null, null),
    composers,
  };
};

const computeSummary = (catalog: CatalogDocument): CatalogSummary => {
  const totalGenres = catalog.genres.length;
  let totalComposers = 0;
  let totalWorks = 0;

  catalog.genres.forEach((genre) => {
    totalComposers += genre.composers.length;
    genre.composers.forEach((composer) => {
      totalWorks += composer.works.length;
    });
  });

  return { totalGenres, totalComposers, totalWorks };
};

const STATIC_CATALOG_PATH = buildStaticAssetPath('catalog.json');
const remoteCatalogUrl = typeof import.meta !== 'undefined' ? import.meta.env.VITE_CATALOG_URL?.trim() : undefined;

const parseCatalog = (payload: unknown): CatalogDocument => {
  if (!isRecord(payload)) {
    throw new Error('Catalog payload must be an object.');
  }

  const schemaVersion = typeof payload.schemaVersion === 'number' ? payload.schemaVersion : null;
  if (!schemaVersion || schemaVersion < 1) {
    throw new Error('Catalog schemaVersion must be a positive number.');
  }

  const generatedAt = asString(payload.generatedAt ?? null ?? undefined);
  if (!generatedAt) {
    throw new Error('Catalog generatedAt timestamp is required.');
  }

  const genres = Array.isArray(payload.genres) ? payload.genres.map(parseGenre) : [];
  if (genres.length === 0) {
    throw new Error('Catalog must contain at least one genre.');
  }

  return {
    schemaVersion,
    generatedAt,
    genres,
  };
};

const fetchCatalogFromUrl = async (url: string): Promise<CatalogLoadResult> => {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to load catalog from ${url}: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();
  const catalog = parseCatalog(payload);

  return {
    catalog,
    summary: computeSummary(catalog),
    source: 'remote',
  };
};

const loadStaticCatalog = async (): Promise<CatalogLoadResult> => {
  try {
    const response = await fetch(STATIC_CATALOG_PATH, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      const payload = await response.json();
      const catalog = parseCatalog(payload);

      return {
        catalog,
        summary: computeSummary(catalog),
        source: 'static',
      };
    }
  } catch (error) {
    console.warn('Falling back to built-in catalog:', error);
  }

  const catalog = defaultCatalog;
  return {
    catalog,
    summary: computeSummary(catalog),
    source: 'static',
  };
};

export const loadCatalog = async (): Promise<CatalogLoadResult> => {
  if (remoteCatalogUrl) {
    try {
      return await fetchCatalogFromUrl(remoteCatalogUrl);
    } catch (error) {
      console.error('Failed to load catalog from remote source; falling back to static asset.', error);
    }
  }

  return loadStaticCatalog();
};

export const getConfiguredCatalogUrl = () => remoteCatalogUrl ?? null;

export const summarizeCatalog = (catalog: CatalogDocument): CatalogSummary => computeSummary(catalog);

export const parseCatalogDocument = (payload: unknown): CatalogDocument => parseCatalog(payload);
