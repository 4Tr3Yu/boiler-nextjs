# Database Migration Instructions

## Step 1: Access Supabase Dashboard

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to the **SQL Editor** in the left sidebar

## Step 2: Run the Migration

1. Click **New Query** button
2. Copy the entire contents of `supabase-migration-profiles.sql` from your project root
3. Paste it into the SQL editor
4. Click **Run** or press `Ctrl+Enter` (Windows) / `Cmd+Enter` (Mac)

## Step 3: Verify the Migration

After running the migration, verify it was successful:

1. Go to **Table Editor** in the left sidebar
2. You should see a new table called `profiles`
3. Click on the `profiles` table
4. Verify the following columns exist:
   - `id` (uuid, primary key)
   - `nickname` (text)
   - `phone` (text)
   - `country` (text)
   - `updated_at` (timestamp with time zone)
   - `created_at` (timestamp with time zone)

## Step 4: Test the Trigger

The migration includes a trigger that automatically creates a profile when a new user signs up.

To test:
1. Sign up a new user through your app at `/login`
2. Go back to Supabase **Table Editor** > `profiles`
3. You should see a new row with the user's ID

## What the Migration Does

- ✅ Creates `profiles` table with user data fields
- ✅ Sets up Row Level Security (RLS) policies
- ✅ Creates policies so users can only view/edit their own data
- ✅ Creates a trigger to auto-create profiles on signup
- ✅ Adds database indexes for performance

## Troubleshooting

### Error: "relation already exists"
If you see this error, the table already exists. You can either:
- Drop the existing table first (⚠️ this will delete all data)
- Skip this migration if the table structure is correct

### Error: "permission denied"
Make sure you're running the query as a superuser in the SQL Editor.

### Profiles not auto-creating
1. Check that the trigger exists in **Database** > **Triggers**
2. Verify the function `handle_new_user` exists in **Database** > **Functions**

## Next Steps

Once the migration is complete:
1. Navigate to `/profile` in your app
2. You should see the profile page with editable fields
3. Try updating your profile information
4. Test email and password updates
