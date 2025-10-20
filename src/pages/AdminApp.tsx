import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import AdminLogin from '../components/AdminLogin';
import AdminCMS from '../components/AdminCMS';
import { supabase } from '../lib/supabase';

const hasAdminPrivileges = (session: Session | null) =>
  Boolean(session?.user?.app_metadata && session.user.app_metadata.is_admin === true);

const AdminApp = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessError, setAccessError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setAccessError('Supabase environment variables are not configured. Admin tools are unavailable.');
      setIsLoading(false);
      return;
    }

    const init = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Failed to determine auth session', error);
        setAccessError('Unable to determine your authentication status. Please try again.');
      }

      if (data?.session && !hasAdminPrivileges(data.session)) {
        setAccessError('Your account does not have permission to manage the catalogue.');
        await supabase.auth.signOut();
        setSession(null);
      } else {
        setSession(data?.session ?? null);
      }

      setIsLoading(false);
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession && !hasAdminPrivileges(nextSession)) {
        setAccessError('Your account does not have permission to manage the catalogue.');
        supabase.auth.signOut();
        setSession(null);
        return;
      }

      setAccessError(null);
      setSession(nextSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
    // The Supabase client is a static singleton; rerunning this effect when it changes is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase]);

  const handleLogin = async () => {
    if (!supabase) {
      setAccessError('Supabase environment variables are not configured.');
      return;
    }

    const { data } = await supabase.auth.getSession();

    if (data?.session && hasAdminPrivileges(data.session)) {
      setAccessError(null);
      setSession(data.session);
    } else {
      setAccessError('Your account does not have permission to manage the catalogue.');
      await supabase.auth.signOut();
      setSession(null);
    }
  };

  const handleLogout = async () => {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setSession(null);
  };

  if (!supabase) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin unavailable</h1>
          <p className="text-gray-600">
            Supabase is not configured for this deployment, so the admin dashboard cannot connect to the database.
            Provide <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> at build time to enable admin
            features.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" aria-label="Loading" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLogin={handleLogin} accessError={accessError ?? undefined} />;
  }

  return <AdminCMS onLogout={handleLogout} />;
};

export default AdminApp;
