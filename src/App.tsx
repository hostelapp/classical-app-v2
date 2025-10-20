import React, { useState, useEffect } from 'react';
import { Music, Settings } from 'lucide-react';
import Slider from './components/Slider';
import YouTubePlayer from './components/YouTubePlayer';
import AdminLogin from './components/AdminLogin';
import AdminCMS from './components/AdminCMS';
import { musicData } from './data/musicData';
import { supabase } from './lib/supabase';

function App() {
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(0);
  const [selectedComposerIndex, setSelectedComposerIndex] = useState(0);
  const [selectedSymphonyIndex, setSelectedSymphonyIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Reset composer and symphony when genre changes
  useEffect(() => {
    setSelectedComposerIndex(0);
    setSelectedSymphonyIndex(0);
  }, [selectedGenreIndex]);

  // Reset symphony when composer changes
  useEffect(() => {
    setSelectedSymphonyIndex(0);
  }, [selectedComposerIndex]);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsCheckingAuth(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAdminLogin = () => {
    setIsAuthenticated(true);
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setShowAdmin(false);
  };

  // Show loading while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show admin interface if requested and authenticated
  if (showAdmin) {
    if (!isAuthenticated) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminCMS onLogout={handleAdminLogout} />;
  }

  const currentGenre = musicData[selectedGenreIndex];
  const currentComposer = currentGenre.composers[selectedComposerIndex];
  const currentSymphony = currentComposer.symphonies[selectedSymphonyIndex];

  const genreItems = musicData.map(genre => `${genre.name} (${genre.period})`);
  const composerItems = currentGenre.composers.map(composer => 
    `${composer.name} (${composer.birthYear}-${composer.deathYear})`
  );
  const symphonyItems = currentComposer.symphonies.map(symphony => 
    `${symphony.name} (${symphony.year})`
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center flex-1">
            <Music className="w-10 h-10 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Classical Music Discovery</h1>
            </div>
            <button
              onClick={() => setShowAdmin(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              Admin
            </button>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Explore the greatest symphonies from history's most celebrated composers
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Sliders */}
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
            title="Symphony"
            items={symphonyItems}
            selectedIndex={selectedSymphonyIndex}
            onSelect={setSelectedSymphonyIndex}
          />
        </div>

        {/* Currently Selected Display */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Genre</h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-blue-800 font-medium">{currentGenre.name}</p>
                <p className="text-blue-600 text-sm">{currentGenre.period}</p>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Composer</h3>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-purple-800 font-medium">{currentComposer.name}</p>
                <p className="text-purple-600 text-sm">
                  {currentComposer.birthYear} - {currentComposer.deathYear}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Symphony</h3>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-green-800 font-medium">{currentSymphony.name}</p>
                <p className="text-green-600 text-sm">Composed in {currentSymphony.year}</p>
              </div>
            </div>
          </div>
        </div>

        {/* YouTube Player */}
        <YouTubePlayer
          searchTerm={currentSymphony.searchTerm}
          autoplay={autoplay}
          onToggleAutoplay={() => setAutoplay(!autoplay)}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Classical Music Discovery. Explore the timeless beauty of classical music.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;