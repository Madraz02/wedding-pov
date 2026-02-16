# 🔧 Supabase Setup Guide for Wedding POV

Follow these steps **exactly** to set up your Supabase backend.

## Step 1: Create Storage Bucket

1. Go to your Supabase Dashboard
2. Click **Storage** in the left sidebar
3. Click **"New bucket"** button
4. Configure the bucket:
   - **Name:** `wedding-uploads` (must be exactly this)
   - **Public bucket:** ✅ **TURN THIS ON** (very important!)
   - Click **"Create bucket"**

### Verify Storage Bucket
- You should see `wedding-uploads` in your buckets list
- It should have a 🌐 globe icon (indicating it's public)

---

## Step 2: Create Database Table

1. Click **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Copy and paste this SQL:

```sql
-- Create the uploads table
create table public.uploads (
  id bigserial primary key,
  created_at timestamptz default now(),
  guest_name text,
  message text,
  file_url text not null
);

-- Enable Row Level Security (RLS)
alter table public.uploads enable row level security;

-- Create policy to allow anyone to insert
create policy "Anyone can insert uploads"
  on public.uploads
  for insert
  to public
  with check (true);

-- Create policy to allow anyone to read uploads
create policy "Anyone can view uploads"
  on public.uploads
  for select
  to public
  using (true);
```

4. Click **"Run"** button (or press F5)
5. You should see "Success. No rows returned"

### Verify Database Table
1. Click **Table Editor** in the left sidebar
2. You should see the `uploads` table
3. Click on it - it should have these columns:
   - `id` (int8)
   - `created_at` (timestamptz)
   - `guest_name` (text)
   - `message` (text)
   - `file_url` (text)

---

## Step 3: Get Your API Keys

1. Click **Settings** (⚙️ icon) in the left sidebar
2. Click **API** in the settings menu
3. Copy these two values:

   **Project URL:**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```

   **anon/public key:**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
   ```

---

## Step 4: Add Keys to Your Project

1. Create `.env.local` file in your project root (if it doesn't exist)
2. Add your keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Save the file**
4. **Restart your dev server** (stop with Ctrl+C, then run `npm run dev` again)

---

## 🧪 Test Your Setup

1. Open your browser console (F12)
2. Go to http://localhost:3000
3. Try uploading an image
4. Check the console for detailed error messages

If you see:
- ✅ `"Starting upload..."` → Connection working
- ✅ `"File uploaded successfully"` → Storage working
- ✅ `"Upload complete!"` → Everything working!

If you see errors:
- ❌ `"Storage Error: Bucket not found"` → Create the bucket (Step 1)
- ❌ `"Storage Error: new row violates row-level security"` → Bucket is not public
- ❌ `"Database Error: relation 'uploads' does not exist"` → Create table (Step 2)
- ❌ `"Database Error: new row violates row-level security"` → Run the RLS policies (Step 2)

---

## 📋 Common Issues Checklist

- [ ] Storage bucket is named **exactly** `wedding-uploads`
- [ ] Storage bucket is marked as **Public**
- [ ] Database table `uploads` exists with correct columns
- [ ] RLS policies are enabled on the table
- [ ] Environment variables in `.env.local` are correct
- [ ] Dev server was restarted after adding .env.local

---

## 🆘 Still Having Issues?

Open your browser console (F12) and share the error message you see!
