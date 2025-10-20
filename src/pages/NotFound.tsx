import { buildHref } from '../lib/basePath';

const homeHref = buildHref('/');

interface NotFoundProps {
  currentPath?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ currentPath }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">Page not found</h1>
      <p className="text-gray-600">
        {currentPath ? `The path “${currentPath}” does not exist.` : 'The page you requested does not exist.'} If you believe
        this is an error, double-check the URL or return to the public experience.
      </p>
      <a
        href={homeHref}
        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        Go back home
      </a>
    </div>
  </div>
);

export default NotFound;
