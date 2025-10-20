import { useEffect, useMemo, useState } from 'react';
import { Music } from 'lucide-react';
import Slider from '../components/Slider';
import YouTubePlayer from '../components/YouTubePlayer';
import { supabase, Video } from '../lib/supabase';

type GroupedVideos = Array<{
  genre: string;
  composers: Array<{
    name: string;
    symphonies: Video[];
  }>;
}>;

const groupVideos = (videos: Video[]): GroupedVideos => {
  const byGenre = new Map<string, Map<string, Video[]>>();

  videos.forEach((video) => {
    if (!byGenre.has(video.genre)) {
      byGenre.set(video.genre, new Map());
    }

    const composers = byGenre.get(video.genre)!;
    if (!composers.has(video.composer)) {
      composers.set(video.composer, []);
    }

    composers.get(video.composer)!.push(video);
  });

  return Array.from(byGenre.entries())
    .sort(([genreA], [genreB]) => genreA.localeCompare(genreB))
    .map(([genre, composers]) => ({
      genre,
      composers: Array.from(composers.entries())
        .sort(([composerA], [composerB]) => composerA.localeCompare(composerB))
        .map(([composer, works]) => ({
          name: composer,
          symphonies: works.sort((a, b) => a.symphony.localeCompare(b.symphony)),
        })),
    }));
};

const PublicExperience = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [autoplay, setAutoplay] = useState(false);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [selectedComposerIndex, setSelectedComposerIndex] = useState(0);
  const [selectedSymphonyIndex, setSelectedSymphonyIndex] = useState(0);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('videos')
        .select('*')
        .order('genre', { ascending: true })
        .order('composer', { ascending: true })
        .order('symphony', { ascending: true });

      if (supabaseError) {
        console.error('Failed to load repertoire', supabaseError);
        setError('We were unable to load the repertoire. Please try again later.');
      } else {
        setVideos(data ?? []);
      }

      setIsLoading(false);
    };

    fetchVideos();
  }, []);

  const groupedVideos = useMemo(() => groupVideos(videos), [videos]);

  useEffect(() => {
    setSelectedComposerIndex(0);
    setSelectedSymphonyIndex(0);
  }, [selectedGenreIndex]);

  useEffect(() => {
    setSelectedSymphonyIndex(0);
  }, [selectedComposerIndex]);

  useEffect(() => {
    if (selectedGenreIndex >= groupedVideos.length) {
      setSelectedGenreIndex(0);
    }
  }, [groupedVideos.length, selectedGenreIndex]);

  const currentGenre = groupedVideos[selectedGenreIndex];
  const currentComposer = currentGenre?.composers[selectedComposerIndex];
  const currentSymphony = currentComposer?.symphonies[selectedSymphonyIndex];

  const genreItems = groupedVideos.map((group) => `${group.genre} • ${group.composers.length} composers`);
  const composerItems = currentGenre?.composers.map((composer) => `${composer.name} • ${composer.symphonies.length} works`) ?? [];
  const symphonyItems = currentComposer?.symphonies.map((symphony) =>
    symphony.year ? `${symphony.symphony} (${symphony.year})` : symphony.symphony
  ) ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading repertoire" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!currentGenre || !currentComposer || !currentSymphony) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Repertoire unavailable</h1>
          <p className="text-gray-600">
            We could not find any repertoire to display. Please ensure the database is seeded with videos.
          </p>
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
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Slider
            title="Genre"
            items={genreItems}
            selectedIndex={selectedGenreIndex}
            onSelect={setSelectedGenreIndex}
          />

          <Slider
            title="Composer"
            items={composerItems}
            selectedIndex={selectedComposerIndex}
            onSelect={setSelectedComposerIndex}
          />

          <Slider
            title="Work"
            items={symphonyItems}
            selectedIndex={selectedSymphonyIndex}
            onSelect={setSelectedSymphonyIndex}
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Genre</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-medium">{currentGenre.genre}</p>
                <p className="text-blue-600 text-sm">{currentGenre.composers.length} composers</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Composer</h3>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-medium">{currentComposer.name}</p>
                <p className="text-purple-600 text-sm">{currentComposer.symphonies.length} featured works</p>
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Work</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 font-medium">{currentSymphony.symphony}</p>
                <p className="text-green-600 text-sm">
                  {currentSymphony.year ? `Composed in ${currentSymphony.year}` : 'Composition year unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <YouTubePlayer
          videoId={currentSymphony.youtube_id}
          autoplay={autoplay}
          onToggleAutoplay={() => setAutoplay((prev) => !prev)}
          title={`${currentComposer.name} — ${currentSymphony.symphony}`}
        />
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} Classical Music Discovery. Explore the timeless beauty of classical music.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicExperience;
