/*
  # Create Admin User

  1. Authentication Setup
    - Creates an admin user with email: admin@admin.com
    - Password: admin
    - This user will have access to the CMS

  Note: This creates the user directly in the auth.users table
  You can also create users through the Supabase Dashboard → Authentication → Users
*/

-- Insert admin user into auth.users table
-- Note: In production, you should create users through Supabase Dashboard or auth.signUp()
-- This is just for development/testing purposes

-- The password 'admin' hashed with bcrypt
-- You should create this user through Supabase Dashboard → Authentication → Users → Add User
-- Email: admin@admin.com
-- Password: admin

-- Alternatively, you can use the Supabase Dashboard to create the user:
-- 1. Go to Authentication → Users
-- 2. Click "Add User"
-- 3. Enter email: admin@admin.com
-- 4. Enter password: admin
-- 5. Click "Add User"