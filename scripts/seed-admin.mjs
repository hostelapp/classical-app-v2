import { createClient } from '@supabase/supabase-js';

const requiredEnv = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
const missing = requiredEnv.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

const ensureAdminMetadata = (existing = {}) => ({
  ...existing,
  is_admin: true,
});

try {
  const { data: existingUser, error: lookupError } = await supabase.auth.admin.getUserByEmail(email);

  if (lookupError && lookupError.message !== 'User not found') {
    throw lookupError;
  }

  if (existingUser?.user) {
    const updatePayload = {
      app_metadata: ensureAdminMetadata(existingUser.user.app_metadata ?? {}),
    };

    if (password) {
      updatePayload.password = password;
    }

    const { error: updateError } = await supabase.auth.admin.updateUserById(existingUser.user.id, updatePayload);

    if (updateError) {
      throw updateError;
    }

    console.log(`Updated existing admin: ${email}`);
  } else {
    const { error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      app_metadata: ensureAdminMetadata(),
      email_confirm: true,
    });

    if (createError) {
      throw createError;
    }

    console.log(`Created new admin: ${email}`);
  }

  console.log('Admin seeding complete.');
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('Failed to seed admin user:', message);
  process.exit(1);
}
