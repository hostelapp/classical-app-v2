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
  }, []);

  const handleLogin = async () => {
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
    await supabase.auth.signOut();
    setSession(null);
  };

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
