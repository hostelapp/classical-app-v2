import AdminStudio from '../components/AdminStudio';
import { useCatalog } from '../catalog/useCatalog';

const ADMIN_ENABLED = typeof import.meta !== 'undefined' && import.meta.env.VITE_ENABLE_ADMIN === 'true';

const AdminApp = () => {
  const { status, result, error, reload } = useCatalog();

  if (!ADMIN_ENABLED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin tools disabled</h1>
          <p className="text-gray-600">
            This build was created without admin tooling. Set <code>VITE_ENABLE_ADMIN=true</code> and rebuild to access the catalog
            studio.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminStudio
      initialCatalog={result?.catalog ?? null}
      initialSource={result?.source ?? null}
      onReload={reload}
      loadingInitial={status === 'idle' || status === 'loading'}
      error={error}
    />
  );
};

export default AdminApp;
