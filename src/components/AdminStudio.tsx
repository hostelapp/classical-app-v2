import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Download,
  FileUp,
  Plus,
  RefreshCcw,
  Trash2,
  Undo2,
} from 'lucide-react';
import { defaultCatalog } from '../catalog/defaultCatalog';
import {
  parseCatalogDocument,
  summarizeCatalog,
  getConfiguredCatalogUrl,
} from '../catalog/catalogService';
import type { CatalogComposer, CatalogDocument, CatalogGenre, CatalogWork } from '../catalog/types';

const cloneCatalog = (catalog: CatalogDocument): CatalogDocument =>
  typeof structuredClone === 'function' ? structuredClone(catalog) : JSON.parse(JSON.stringify(catalog));

const slugify = (value: string, fallback: string) => {
  const slug = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  if (slug.length > 0) {
    return slug;
  }

  return `${fallback}-${Math.random().toString(36).slice(2, 8)}`;
};

const ensureUniqueId = (proposed: string, existingIds: Set<string>) => {
  if (!existingIds.has(proposed)) {
    return proposed;
  }

  let suffix = 2;
  let candidate = `${proposed}-${suffix}`;
  while (existingIds.has(candidate)) {
    suffix += 1;
    candidate = `${proposed}-${suffix}`;
  }

  return candidate;
};

const getExistingIds = (catalog: CatalogDocument) => {
  const ids = new Set<string>();

  catalog.genres.forEach((genre) => {
    ids.add(genre.id);
    genre.composers.forEach((composer) => {
      ids.add(composer.id);
      composer.works.forEach((work) => ids.add(work.id));
    });
  });

  return ids;
};

const createGenre = (name: string, catalog: CatalogDocument): CatalogGenre => {
  const existing = getExistingIds(catalog);
  const baseId = slugify(name, 'genre');
  return {
    id: ensureUniqueId(baseId, existing),
    name,
    period: null,
    composers: [],
  };
};

const createComposer = (
  name: string,
  catalog: CatalogDocument,
  targetGenre: CatalogGenre
): CatalogComposer => {
  const existing = getExistingIds(catalog);
  const baseId = slugify(`${targetGenre.name}-${name}`, 'composer');
  return {
    id: ensureUniqueId(baseId, existing),
    name,
    birthYear: null,
    deathYear: null,
    works: [],
  };
};

const createWork = (
  title: string,
  catalog: CatalogDocument,
  targetComposer: CatalogComposer
): CatalogWork => {
  const existing = getExistingIds(catalog);
  const baseId = slugify(`${targetComposer.name}-${title}`, 'work');
  return {
    id: ensureUniqueId(baseId, existing),
    title,
    year: null,
    youtubeId: null,
    searchTerm: null,
  };
};

interface AdminStudioProps {
  initialCatalog: CatalogDocument | null;
  initialSource: 'remote' | 'static' | null;
  onReload: () => Promise<void>;
  loadingInitial: boolean;
  error: Error | null;
}

const AdminStudio = ({ initialCatalog, initialSource, onReload, loadingInitial, error }: AdminStudioProps) => {
  const [draft, setDraft] = useState<CatalogDocument | null>(() =>
    initialCatalog ? cloneCatalog(initialCatalog) : null
  );
  const [dirty, setDirty] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState<string | null>(null);
  const [selectedComposerId, setSelectedComposerId] = useState<string | null>(null);
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialCatalog && !dirty) {
      setDraft(cloneCatalog(initialCatalog));
    }
  }, [initialCatalog, dirty]);

  useEffect(() => {
    if (!draft) {
      setSelectedGenreId(null);
      setSelectedComposerId(null);
      setSelectedWorkId(null);
      return;
    }

    if (!selectedGenreId || !draft.genres.some((genre) => genre.id === selectedGenreId)) {
      setSelectedGenreId(draft.genres[0]?.id ?? null);
      setSelectedComposerId(null);
      setSelectedWorkId(null);
      return;
    }

    const selectedGenre = draft.genres.find((genre) => genre.id === selectedGenreId);
    if (!selectedGenre) {
      return;
    }

    if (!selectedComposerId || !selectedGenre.composers.some((composer) => composer.id === selectedComposerId)) {
      const defaultComposer = selectedGenre.composers[0]?.id ?? null;
      setSelectedComposerId(defaultComposer);
      setSelectedWorkId(null);
      return;
    }

    const selectedComposer = selectedGenre.composers.find((composer) => composer.id === selectedComposerId);
    if (!selectedComposer) {
      return;
    }

    if (!selectedWorkId || !selectedComposer.works.some((work) => work.id === selectedWorkId)) {
      setSelectedWorkId(selectedComposer.works[0]?.id ?? null);
    }
  }, [draft, selectedGenreId, selectedComposerId, selectedWorkId]);

  const summary = useMemo(() => (draft ? summarizeCatalog(draft) : null), [draft]);
  const remoteCatalogUrl = getConfiguredCatalogUrl();

  const handleAdoptInitial = () => {
    if (!initialCatalog) {
      return;
    }

    setDraft(cloneCatalog(initialCatalog));
    setDirty(false);
  };

  const handleUseDefault = () => {
    setDraft(cloneCatalog(defaultCatalog));
    setDirty(true);
  };

  const handleResetToSource = () => {
    if (!initialCatalog) {
      return;
    }

    setDraft(cloneCatalog(initialCatalog));
    setDirty(false);
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const contents = await file.text();
      const payload = JSON.parse(contents);
      const catalog = parseCatalogDocument(payload);
      setDraft(cloneCatalog(catalog));
      setDirty(true);
    } catch (uploadError) {
      console.error('Failed to load catalog from file', uploadError);
      alert('Could not read that catalog. Please ensure the file is valid JSON and follows the catalog schema.');
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const updateDraft = (updater: (catalog: CatalogDocument) => void) => {
    setDraft((current) => {
      if (!current) {
        return current;
      }

      const clone = cloneCatalog(current);
      updater(clone);
      setDirty(true);
      return clone;
    });
  };

  const handleAddGenre = () => {
    if (!draft) {
      setDraft(cloneCatalog(defaultCatalog));
      setDirty(true);
      return;
    }

    updateDraft((catalog) => {
      const genre = createGenre('New Genre', catalog);
      catalog.genres.push(genre);
      setSelectedGenreId(genre.id);
      setSelectedComposerId(null);
      setSelectedWorkId(null);
    });
  };

  const handleAddComposer = () => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      if (!genre) {
        return;
      }

      const composer = createComposer('New Composer', catalog, genre);
      genre.composers.push(composer);
      setSelectedComposerId(composer.id);
      setSelectedWorkId(null);
    });
  };

  const handleAddWork = () => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      if (!genre) {
        return;
      }

      const composer = genre.composers.find((candidate) => candidate.id === selectedComposerId);
      if (!composer) {
        return;
      }

      const work = createWork('New Work', catalog, composer);
      composer.works.push(work);
      setSelectedWorkId(work.id);
    });
  };

  const handleRemoveWork = () => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      const composer = genre?.composers.find((candidate) => candidate.id === selectedComposerId);
      if (!genre || !composer) {
        return;
      }

      composer.works = composer.works.filter((work) => work.id !== selectedWorkId);
      setSelectedWorkId(composer.works[0]?.id ?? null);
    });
  };

  const handleRemoveComposer = () => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      if (!genre) {
        return;
      }

      genre.composers = genre.composers.filter((composer) => composer.id !== selectedComposerId);
      setSelectedComposerId(genre.composers[0]?.id ?? null);
      setSelectedWorkId(null);
    });
  };

  const handleRemoveGenre = () => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      catalog.genres = catalog.genres.filter((genre) => genre.id !== selectedGenreId);
      setSelectedGenreId(catalog.genres[0]?.id ?? null);
      setSelectedComposerId(null);
      setSelectedWorkId(null);
    });
  };

  const downloadCatalog = () => {
    if (!draft) {
      return;
    }

    const prepared: CatalogDocument = {
      ...draft,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(prepared, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'catalog.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const selectedGenre = draft?.genres.find((genre) => genre.id === selectedGenreId) ?? null;
  const selectedComposer = selectedGenre?.composers.find((composer) => composer.id === selectedComposerId) ?? null;
  const selectedWork = selectedComposer?.works.find((work) => work.id === selectedWorkId) ?? null;

  const handleGenreFieldChange = (field: 'name' | 'period', value: string) => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      if (!genre) {
        return;
      }

      genre[field] = value.trim() === '' ? null : value;
    });
  };

  const handleComposerFieldChange = (
    field: 'name' | 'birthYear' | 'deathYear',
    value: string
  ) => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      const composer = genre?.composers.find((candidate) => candidate.id === selectedComposerId);
      if (!genre || !composer) {
        return;
      }

      if (field === 'name') {
        composer.name = value;
        return;
      }

      const numeric = value.trim() === '' ? null : Number.parseInt(value, 10);
      composer[field] = Number.isNaN(numeric) ? null : numeric;
    });
  };

  const handleWorkFieldChange = (
    field: 'title' | 'year' | 'youtubeId' | 'searchTerm',
    value: string
  ) => {
    if (!draft) {
      return;
    }

    updateDraft((catalog) => {
      const genre = catalog.genres.find((candidate) => candidate.id === selectedGenreId);
      const composer = genre?.composers.find((candidate) => candidate.id === selectedComposerId);
      const work = composer?.works.find((candidate) => candidate.id === selectedWorkId);
      if (!genre || !composer || !work) {
        return;
      }

      if (field === 'year') {
        const numeric = value.trim() === '' ? null : Number.parseInt(value, 10);
        work.year = Number.isNaN(numeric) ? null : numeric;
        return;
      }

      const nextValue = value.trim() === '' ? null : value;
      if (field === 'title') {
        work.title = value;
      } else if (field === 'youtubeId') {
        work.youtubeId = nextValue;
      } else {
        work.searchTerm = nextValue;
      }
    });
  };

  if (loadingInitial && !draft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading admin" />
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl w-full space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Catalog Studio</h1>
          <p className="text-gray-600 text-center">
            Load a catalog to begin editing. You can import the current live catalog, start from the built-in repertoire, or
            upload a JSON export.
          </p>

          <div className="grid gap-4">
            {initialCatalog && (
              <button
                onClick={handleAdoptInitial}
                className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-left transition hover:border-blue-300"
              >
                <div>
                  <p className="text-sm font-semibold text-blue-900">Use loaded catalog</p>
                  <p className="text-xs text-blue-700">
                    {initialSource === 'remote'
                      ? 'Loaded from remote source'
                      : 'Loaded from static asset'}
                  </p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-blue-700" aria-hidden="true" />
              </button>
            )}

            <button
              onClick={handleUseDefault}
              className="flex items-center justify-between rounded-lg border border-purple-200 bg-purple-50 px-4 py-3 text-left transition hover:border-purple-300"
            >
              <div>
                <p className="text-sm font-semibold text-purple-900">Start from built-in repertoire</p>
                <p className="text-xs text-purple-700">A copy of the default catalog bundled with the app</p>
              </div>
              <Plus className="h-5 w-5 text-purple-700" aria-hidden="true" />
            </button>

            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-left transition hover:border-gray-300">
              <div>
                <p className="text-sm font-semibold text-gray-900">Upload catalog JSON</p>
                <p className="text-xs text-gray-600">Select an exported catalog.json file from your computer</p>
              </div>
              <FileUp className="h-5 w-5 text-gray-600" aria-hidden="true" />
              <input ref={fileInputRef} type="file" accept="application/json" className="hidden" onChange={handleUpload} />
            </label>
          </div>

          {remoteCatalogUrl && (
            <button
              onClick={onReload}
              className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
            >
              <RefreshCcw className="h-4 w-4" aria-hidden="true" />
              Fetch latest from {remoteCatalogUrl}
            </button>
          )}

          {error && <p className="text-sm text-red-600 text-center">{error.message}</p>}
        </div>
      </div>
    );
  }

  if (loadingInitial) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading admin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-4 py-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Catalog Studio</h1>
              <p className="text-gray-600 mt-1">
                Manage genres, composers, and works. Download the JSON export to publish updates.
              </p>
              {summary && (
                <p className="mt-3 text-sm text-gray-500">
                  {summary.totalGenres} genres • {summary.totalComposers} composers • {summary.totalWorks} works
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={downloadCatalog}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download JSON
              </button>

              {initialCatalog && (
                <button
                  onClick={handleResetToSource}
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-blue-800 transition hover:border-blue-300"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  Revert to source
                </button>
              )}

              <button
                onClick={handleUseDefault}
                className="inline-flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-purple-800 transition hover:border-purple-300"
              >
                <Undo2 className="h-4 w-4" aria-hidden="true" />
                Reset to default
              </button>

              <button
                onClick={onReload}
                className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-blue-800 transition hover:border-blue-300"
              >
                <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                Refresh source
              </button>
            </div>
          </div>

          {dirty && <p className="mt-4 text-sm font-medium text-orange-600">You have unpublished changes.</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </header>

        <section className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Genre</label>
              <select
                value={selectedGenreId ?? ''}
                onChange={(event) => setSelectedGenreId(event.target.value || null)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {draft.genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={handleAddGenre}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-gray-300"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add genre
                </button>
                {selectedGenre && (
                  <button
                    onClick={handleRemoveGenre}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 transition hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Composer</label>
              {selectedGenre && selectedGenre.composers.length > 0 ? (
                <select
                  value={selectedComposerId ?? ''}
                  onChange={(event) => setSelectedComposerId(event.target.value || null)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {selectedGenre.composers.map((composer) => (
                    <option key={composer.id} value={composer.id}>
                      {composer.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-500">No composers in this genre yet.</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={handleAddComposer}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-gray-300"
                  disabled={!selectedGenre}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add composer
                </button>
                {selectedComposer && (
                  <button
                    onClick={handleRemoveComposer}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 transition hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Remove
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Work</label>
              {selectedComposer && selectedComposer.works.length > 0 ? (
                <select
                  value={selectedWorkId ?? ''}
                  onChange={(event) => setSelectedWorkId(event.target.value || null)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {selectedComposer.works.map((work) => (
                    <option key={work.id} value={work.id}>
                      {work.title}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm text-gray-500">No works in this composer yet.</p>
              )}

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={handleAddWork}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 transition hover:border-gray-300"
                  disabled={!selectedComposer}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Add work
                </button>
                {selectedWork && (
                  <button
                    onClick={handleRemoveWork}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-700 transition hover:border-red-300"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {selectedGenre && (
          <section className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Genre details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                <input
                  value={selectedGenre.name}
                  onChange={(event) => handleGenreFieldChange('name', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Period</label>
                <input
                  value={selectedGenre.period ?? ''}
                  onChange={(event) => handleGenreFieldChange('period', event.target.value)}
                  placeholder="e.g. 1600-1750"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </section>
        )}

        {selectedComposer && (
          <section className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Composer details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Name</label>
                <input
                  value={selectedComposer.name}
                  onChange={(event) => handleComposerFieldChange('name', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Birth year</label>
                <input
                  value={selectedComposer.birthYear?.toString() ?? ''}
                  onChange={(event) => handleComposerFieldChange('birthYear', event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Death year</label>
                <input
                  value={selectedComposer.deathYear?.toString() ?? ''}
                  onChange={(event) => handleComposerFieldChange('deathYear', event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </section>
        )}

        {selectedWork && (
          <section className="bg-white rounded-xl shadow-lg p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Work details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                <input
                  value={selectedWork.title}
                  onChange={(event) => handleWorkFieldChange('title', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Year</label>
                <input
                  value={selectedWork.year?.toString() ?? ''}
                  onChange={(event) => handleWorkFieldChange('year', event.target.value)}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">YouTube ID</label>
                <input
                  value={selectedWork.youtubeId ?? ''}
                  onChange={(event) => handleWorkFieldChange('youtubeId', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Reference search term</label>
                <input
                  value={selectedWork.searchTerm ?? ''}
                  onChange={(event) => handleWorkFieldChange('searchTerm', event.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AdminStudio;
