import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface YouTubePlayerProps {
  searchTerm: string;
  autoplay: boolean;
  onToggleAutoplay: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ searchTerm, autoplay, onToggleAutoplay }) => {
  const [videoId, setVideoId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);


  const getVideoFromDatabase = async (query: string) => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('youtube_id')
        .eq('search_term', query)
        .single();

      if (error) {
        console.error('Database error:', error);
        // Fallback to a default classical piece if not found
        setVideoId('pdsyNwUoON0'); // Bach Brandenburg Concerto No. 3
      } else {
        setVideoId(data.youtube_id);
      }
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load video');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      getVideoFromDatabase(searchTerm);
    }
  }, [searchTerm]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <h3 className="text-xl font-bold text-white">Theater Zone</h3>
        </div>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
          <h3 className="text-xl font-bold text-white">Theater Zone</h3>
        </div>
        <div className="flex items-center justify-center h-96 text-red-600">
          <p>{error}</p>
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
      </div>
      
      <div className="relative pb-[56.25%] h-0 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?${autoplay ? 'autoplay=1&' : ''}modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3&origin=${window.location.origin}`}
          title="Classical Music Video"
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