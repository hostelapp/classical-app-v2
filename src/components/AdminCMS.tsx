import React, { useEffect, useMemo, useState } from 'react';
import { Plus, Pencil, Trash2, Save, X, LogOut, Search, Filter, Play, AlertTriangle } from 'lucide-react';
import { supabase, Video } from '../lib/supabase';

type VideoPayload = Pick<Video, 'search_term' | 'youtube_id' | 'genre' | 'composer' | 'symphony' | 'year'>;

interface AdminCMSProps {
  onLogout: () => void;
}

const AdminCMS: React.FC<AdminCMSProps> = ({ onLogout }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [genreFilter, setGenreFilter] = useState('');
  const [testingVideoId, setTestingVideoId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<Video | null>(null);

  const [formData, setFormData] = useState({
    search_term: '',
    youtube_id: '',
    genre: '',
    composer: '',
    symphony: '',
    year: ''
  });

  const resetForm = () => {
    setFormData({
      search_term: '',
      youtube_id: '',
      genre: '',
      composer: '',
      symphony: '',
      year: '',
    });
  };

  const buildPayload = (): { payload: VideoPayload; yearError: string | null } => {
    const base = {
      search_term: formData.search_term.trim(),
      youtube_id: formData.youtube_id.trim(),
      genre: formData.genre.trim(),
      composer: formData.composer.trim(),
      symphony: formData.symphony.trim(),
    } satisfies Omit<VideoPayload, 'year'>;

    const yearInput = formData.year.trim();
    let year: number | null = null;
    let yearError: string | null = null;

    if (yearInput) {
      if (!/^[0-9]{3,4}$/u.test(yearInput)) {
        yearError = 'Year must be a 3 or 4 digit number.';
      } else {
        year = Number.parseInt(yearInput, 10);
      }
    }

    return { payload: { ...base, year }, yearError };
  };

  const validateVideoPayload = (payload: VideoPayload): string | null => {
    if (!payload.search_term) {
      return 'Search term is required.';
    }

    if (!payload.youtube_id) {
      return 'YouTube ID is required.';
    }

    if (!/^[a-zA-Z0-9_-]{11}$/u.test(payload.youtube_id)) {
      return 'YouTube ID must be exactly 11 characters and contain only letters, numbers, hyphens, or underscores.';
    }

    if (!payload.genre) {
      return 'Genre is required.';
    }

    if (!payload.composer) {
      return 'Composer is required.';
    }

    if (!payload.symphony) {
      return 'Symphony/Piece name is required.';
    }

    if (payload.year !== null) {
      const currentYear = new Date().getFullYear();
      if (payload.year < 1600 || payload.year > currentYear) {
        return `Year must be between 1600 and ${currentYear}.`;
      }
    }

    return null;
  };

  const defaultGenres = useMemo(() => ['Baroque', 'Classical', 'Romantic', 'Modern', 'Contemporary'], []);

  const genres = useMemo(() => {
    const unique = new Set(defaultGenres);
    videos.forEach((video) => unique.add(video.genre));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [defaultGenres, videos]);

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false);
      return;
    }

    void fetchVideos(true);
    // The Supabase client is configured at build time; rerunning this effect when it changes is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleTestVideo = (videoId: string) => {
    setTestingVideoId(testingVideoId === videoId ? null : videoId);
  };

  const fetchVideos = async (showSpinner = false) => {
    if (showSpinner) {
      setIsLoading(true);
    }

    try {
      if (!supabase) {
        setError('Supabase is not configured for this deployment.');
        return;
      }

      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('genre', { ascending: true })
        .order('composer', { ascending: true })
        .order('symphony', { ascending: true });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch videos');
    } finally {
      if (showSpinner) {
        setIsLoading(false);
      }
    }
  };

  const filteredVideos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return videos.filter((video) => {
      const matchesSearch = query
        ? video.composer.toLowerCase().includes(query) ||
          video.symphony.toLowerCase().includes(query) ||
          video.search_term.toLowerCase().includes(query) ||
          video.youtube_id.toLowerCase().includes(query)
        : true;

      const matchesGenre = genreFilter ? video.genre === genreFilter : true;

      return matchesSearch && matchesGenre;
    });
  }, [genreFilter, searchTerm, videos]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { payload, yearError } = buildPayload();
    if (yearError) {
      setError(yearError);
      return;
    }

    const validationError = validateVideoPayload(payload);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (!supabase) {
        setError('Supabase is not configured for this deployment.');
        return;
      }

      const { error: supabaseError } = await supabase.from('videos').insert([payload]);

      if (supabaseError) throw supabaseError;

      setSuccess('Video added successfully!');
      setShowAddForm(false);
      resetForm();
      await fetchVideos();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to add video');
    }
  };

  const handleEdit = (video: Video) => {
    setError('');
    setSuccess('');
    setEditingId(video.id);
    setShowAddForm(false);
    setFormData({
      search_term: video.search_term,
      youtube_id: video.youtube_id,
      genre: video.genre,
      composer: video.composer,
      symphony: video.symphony,
      year: video.year?.toString() || '',
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setError('');
    setSuccess('');

    const { payload, yearError } = buildPayload();
    if (yearError) {
      setError(yearError);
      return;
    }

    const validationError = validateVideoPayload(payload);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      if (!supabase) {
        setError('Supabase is not configured for this deployment.');
        return;
      }

      const { error: supabaseError } = await supabase
        .from('videos')
        .update({
          ...payload,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingId);

      if (supabaseError) throw supabaseError;

      setSuccess('Video updated successfully!');
      setEditingId(null);
      resetForm();
      await fetchVideos();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to update video');
    }
  };

  const confirmDelete = async () => {
    if (!deleteCandidate) return;

    setError('');
    setSuccess('');

    try {
      if (!supabase) {
        setError('Supabase is not configured for this deployment.');
        return;
      }

      const { error: supabaseError } = await supabase
        .from('videos')
        .delete()
        .eq('id', deleteCandidate.id);

      if (supabaseError) throw supabaseError;

      setSuccess('Video deleted successfully!');
      await fetchVideos();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to delete video');
    } finally {
      setDeleteCandidate(null);
    }
  };

  const cancelDelete = () => setDeleteCandidate(null);

  const handleLogout = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    onLogout();
  };

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin unavailable</h1>
          <p className="text-gray-600">
            Supabase is not configured for this deployment, so catalogue management actions cannot be performed.
            Provide the required environment variables and redeploy to enable admin tools.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Video Management System</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Genre Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={genreFilter}
                  onChange={(e) => setGenreFilter(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">All Genres</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={() => {
                setError('');
                setSuccess('');
                resetForm();
                setEditingId(null);
                setShowAddForm(true);
              }}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Video
            </button>
          </div>
        </div>

        {/* Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Add New Video</h2>
                <button
                  onClick={() => {
                    resetForm();
                    setShowAddForm(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Search Term *
                    </label>
                    <input
                      type="text"
                      value={formData.search_term}
                      onChange={(e) => setFormData({ ...formData, search_term: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube ID *
                    </label>
                    <input
                      type="text"
                      value={formData.youtube_id}
                      onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Genre *
                    </label>
                    <select
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Genre</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Composer *
                    </label>
                    <input
                      type="text"
                      value={formData.composer}
                      onChange={(e) => setFormData({ ...formData, composer: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Symphony/Piece *
                    </label>
                    <input
                      type="text"
                      value={formData.symphony}
                      onChange={(e) => setFormData({ ...formData, symphony: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Year
                    </label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Add Video
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setShowAddForm(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Videos Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Composer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Symphony/Piece
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    YouTube ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredVideos.map((video) => (
                  <>
                    <tr key={video.id} className="hover:bg-gray-50">
                    {editingId === video.id ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={formData.genre}
                            onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          >
                            {genres.map(genre => (
                              <option key={genre} value={genre}>{genre}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={formData.composer}
                            onChange={(e) => setFormData({ ...formData, composer: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={formData.symphony}
                            onChange={(e) => setFormData({ ...formData, symphony: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            value={formData.youtube_id}
                            onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdate}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                resetForm();
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                            {video.genre}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {video.composer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {video.symphony}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {video.year || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">
                          {video.youtube_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleTestVideo(video.youtube_id)}
                              className="text-green-600 hover:text-green-900"
                              title="Test video"
                            >
                              <Play className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEdit(video)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteCandidate(video)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                    </tr>
                    {testingVideoId === video.youtube_id && (
                      <tr key={`${video.id}-test`}>
                        <td colSpan={6} className="px-6 py-4 bg-gray-50">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium text-gray-900">
                                Testing: {video.composer} - {video.symphony}
                              </h4>
                              <button
                                onClick={() => setTestingVideoId(null)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg bg-black max-w-2xl">
                              <iframe
                                src={`https://www.youtube.com/embed/${video.youtube_id}?modestbranding=1&rel=0&showinfo=0&color=white&iv_load_policy=3`}
                                title={`Test: ${video.symphony}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              YouTube ID: <code className="bg-gray-200 px-1 rounded">{video.youtube_id}</code>
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No videos found matching your criteria.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-sm text-gray-500 text-center">
          Total videos: {filteredVideos.length} of {videos.length}
        </div>
      </div>

      {deleteCandidate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3 text-amber-700">
              <AlertTriangle className="w-6 h-6" aria-hidden="true" />
              <h2 className="text-lg font-semibold">Delete this video?</h2>
            </div>
            <p className="text-gray-600 text-sm">
              Removing <span className="font-medium">{deleteCandidate.composer} — {deleteCandidate.symphony}</span> will make it
              unavailable in the public catalogue. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Keep video
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete video
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCMS;
