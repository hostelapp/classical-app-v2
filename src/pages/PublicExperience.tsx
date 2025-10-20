import { useEffect, useMemo, useState } from 'react';
import { Info, Music, RefreshCcw } from 'lucide-react';
import Slider from '../components/Slider';
import YouTubePlayer from '../components/YouTubePlayer';
import { useCatalog } from '../catalog/useCatalog';
import { getConfiguredCatalogUrl } from '../catalog/catalogService';
import type { CatalogComposer, CatalogDocument, CatalogWork } from '../catalog/types';

interface ComposerViewModel {
  id: string;
  name: string;
  works: CatalogWork[];
}

interface GenreViewModel {
  id: string;
  name: string;
  period: string | null;
  composers: ComposerViewModel[];
}

const buildViewModel = (catalog: CatalogDocument | undefined): GenreViewModel[] => {
  if (!catalog) {
    return [];
  }

  return catalog.genres
    .map((genre) => ({
      id: genre.id,
      name: genre.name,
      period: genre.period ?? null,
      composers: genre.composers
        .map((composer: CatalogComposer) => ({
          id: composer.id,
          name: composer.name,
          works: composer.works.filter((work) => Boolean(work.title)),
        }))
        .filter((composer) => composer.works.length > 0),
    }))
    .filter((genre) => genre.composers.length > 0);
};

const formatYear = (work: CatalogWork) => {
  if (typeof work.year === 'number' && Number.isFinite(work.year)) {
    return `Composed in ${work.year}`;
  }

  return 'Composition year unknown';
};

const remoteCatalogUrl = getConfiguredCatalogUrl();

const PublicExperience = () => {
  const { status, result, error, reload } = useCatalog();
  const [autoplay, setAutoplay] = useState(false);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [selectedComposerIndex, setSelectedComposerIndex] = useState(0);
  const [selectedWorkIndex, setSelectedWorkIndex] = useState(0);

  const genres = useMemo(() => buildViewModel(result?.catalog), [result?.catalog]);

  useEffect(() => {
    if (selectedGenreIndex >= genres.length) {
      setSelectedGenreIndex(0);
      return;
    }

    const genre = genres[selectedGenreIndex];
    if (!genre) {
      setSelectedComposerIndex(0);
      setSelectedWorkIndex(0);
      return;
    }

    if (selectedComposerIndex >= genre.composers.length) {
      setSelectedComposerIndex(0);
      return;
    }

    const composer = genre.composers[selectedComposerIndex];
    if (!composer) {
      setSelectedWorkIndex(0);
      return;
    }

    if (selectedWorkIndex >= composer.works.length) {
      setSelectedWorkIndex(0);
    }
  }, [genres, selectedGenreIndex, selectedComposerIndex, selectedWorkIndex]);

  useEffect(() => {
    setSelectedComposerIndex(0);
    setSelectedWorkIndex(0);
  }, [selectedGenreIndex]);

  useEffect(() => {
    setSelectedWorkIndex(0);
  }, [selectedComposerIndex]);

  const currentGenre = genres[selectedGenreIndex];
  const currentComposer = currentGenre?.composers[selectedComposerIndex];
  const currentWork = currentComposer?.works[selectedWorkIndex];

  const genreItems = genres.map((genre) =>
    genre.period ? `${genre.name} • ${genre.period}` : `${genre.name}`
  );
  const composerItems = currentGenre?.composers.map((composer) => `${composer.name}`) ?? [];
  const workItems = currentComposer?.works.map((work) =>
    work.year && Number.isFinite(work.year) ? `${work.title} (${work.year})` : work.title
  ) ?? [];

  const statusMessage = useMemo(() => {
    if (status === 'error') {
      return error?.message ?? 'We could not load the live repertoire. Showing the built-in catalog instead.';
    }

    if (result?.source === 'static' && remoteCatalogUrl) {
      return 'The live catalog is unreachable right now, so we are serving the built-in repertoire.';
    }

    if (result?.source === 'static' && !remoteCatalogUrl) {
      return 'Showing the built-in repertoire. Configure VITE_CATALOG_URL to serve a remote catalog.';
    }

    return null;
  }, [status, error, result]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading repertoire" />
      </div>
    );
  }

  if (!genres.length || !currentGenre || !currentComposer || !currentWork) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Repertoire unavailable</h1>
          <p className="text-gray-600">
            We couldn&apos;t find any works to display. Check that your catalog has at least one genre, composer, and work.
          </p>
          <button
            onClick={reload}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500"
          >
            <RefreshCcw className="h-4 w-4" aria-hidden="true" />
            Retry loading catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <Music className="w-10 h-10 text-blue-600 mr-4" aria-hidden="true" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Classical Music Discovery</h1>
              <p className="text-gray-600 mt-2">
                Explore the greatest symphonies from history&apos;s most celebrated composers
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {statusMessage && (
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            <div className="space-y-2">
              <p className="text-sm" role="status">
                {statusMessage}
              </p>
              {(status === 'error' || result?.source === 'static') && (
                <button
                  onClick={reload}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-900"
                >
                  <RefreshCcw className="h-4 w-4" aria-hidden="true" />
                  Try loading again
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Slider title="Genre" items={genreItems} selectedIndex={selectedGenreIndex} onSelect={setSelectedGenreIndex} />

          <Slider
            title="Composer"
            items={composerItems}
            selectedIndex={selectedComposerIndex}
            onSelect={setSelectedComposerIndex}
          />

          <Slider title="Work" items={workItems} selectedIndex={selectedWorkIndex} onSelect={setSelectedWorkIndex} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Genre</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-medium">{currentGenre.name}</p>
                <p className="text-blue-600 text-sm">
                  {currentGenre.period ? currentGenre.period : `${currentGenre.composers.length} composers`}
                </p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Composer</h3>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-medium">{currentComposer.name}</p>
                <p className="text-purple-600 text-sm">{currentComposer.works.length} featured works</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Work</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 font-medium">{currentWork.title}</p>
                <p className="text-green-600 text-sm">{formatYear(currentWork)}</p>
              </div>
            </div>
          </div>
        </div>

        <YouTubePlayer
          videoId={currentWork.youtubeId ?? ''}
          autoplay={autoplay}
          onToggleAutoplay={() => setAutoplay((prev) => !prev)}
          title={`${currentComposer.name} — ${currentWork.title}`}
        />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>
              &copy; {new Date().getFullYear()} Classical Music Discovery. Explore the timeless beauty of classical music.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicExperience;
