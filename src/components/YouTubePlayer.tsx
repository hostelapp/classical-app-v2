import { useMemo } from 'react';
import { Play, Pause } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  autoplay: boolean;
  onToggleAutoplay: () => void;
  title: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, autoplay, onToggleAutoplay, title }) => {
  const embedUrl = useMemo(() => {
    const base = `https://www.youtube.com/embed/${videoId}`;
    const params = new URLSearchParams({
      modestbranding: '1',
      rel: '0',
      showinfo: '0',
      color: 'white',
      iv_load_policy: '3',
      origin: typeof window !== 'undefined' ? window.location.origin : 'https://localhost',
    });

    if (autoplay) {
      params.set('autoplay', '1');
    }

    return `${base}?${params.toString()}`;
  }, [autoplay, videoId]);

  if (!videoId) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <h3 className="text-xl font-bold text-white">Theater Zone</h3>
        </div>
        <div className="flex items-center justify-center h-96 text-red-600">
          <p>We can&apos;t play this selection right now. Please choose another work.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Theater Zone</h3>
          <button
            onClick={onToggleAutoplay}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              autoplay
                ? 'bg-white text-blue-600 hover:bg-gray-100'
                : 'bg-blue-500 text-white hover:bg-blue-400'
            }`}
          >
            {autoplay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {autoplay ? 'Autoplay ON' : 'Autoplay OFF'}
          </button>
        </div>
        <p className="text-sm text-blue-100 mt-2" aria-live="polite">{title}</p>
      </div>

      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
    </div>
  );
};

export default YouTubePlayer;
