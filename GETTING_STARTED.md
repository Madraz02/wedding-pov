# 🚀 Getting Started with Wedding POV

Welcome! This guide will get your Wedding POV app up and running in **under 15 minutes**.

---

## 🎯 What You'll Accomplish

By the end of this guide, you'll have:
- ✅ A working local development environment
- ✅ Supabase backend configured
- ✅ App deployed to the internet
- ✅ Ready to share with wedding guests

---

## ⏱️ Quick Setup (5 Steps)

### Step 1: Install Dependencies (2 min)
```bash
cd wedding-pov
npm install
```

**What this does:** Installs Next.js, React, Supabase, and all required packages.

---

### Step 2: Setup Supabase (5 min)

**2a. Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name it: "wedding-pov"
4. Set password (save it!)
5. Choose region (closest to you)
6. Click "Create project"
7. Wait 2 minutes for setup

**2b. Create Storage Bucket**
1. Click **Storage** (left sidebar)
2. Click "New bucket"
3. Name: `pov-uploads`
4. **Toggle "Public bucket" ON** ✅ ← IMPORTANT!
5. Click "Create bucket"

**2c. Create Database Table**
1. Click **SQL Editor** (left sidebar)
2. Click "New query"
3. Paste this:

```sql
create table public.uploads (
  id bigserial primary key,
  created_at timestamptz default now(),
  guest_name text,
  message text,
  file_url text not null
);

alter table public.uploads enable row level security;

create policy "Anyone can insert uploads"
  on public.uploads for insert to public with check (true);

create policy "Anyone can view uploads"
  on public.uploads for select to public using (true);
```

4. Click "Run" (or F5)
5. Should see: "Success. No rows returned"

**2d. Get API Keys**
1. Click **Settings** → **API**
2. Copy "Project URL"
3. Copy "anon public" key

---

### Step 3: Configure Environment (1 min)

**3a. Create `.env.local` file**
```bash
cp .env.local.example .env.local
```

**3b. Add your keys** (paste values from Step 2d)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**3c. Save the file**

---

### Step 4: Test Locally (2 min)

```bash
npm run dev
```

1. Open: `http://localhost:3000`
2. Click "Open Camera" or "Choose Photo"
3. Select an image
4. Add name and message
5. Click "Send Memory"
6. Should see confetti! 🎉
7. Click "View Gallery"
8. Should see your upload

**✅ If this works, your setup is complete!**

---

### Step 5: Deploy to Vercel (5 min)

**5a. Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/wedding-pov.git
git push -u origin main
```

**5b. Deploy on Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo
4. **Add Environment Variables:**
   - `NEXT_PUBLIC_SUPABASE_URL` = [your URL]
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = [your key]
5. Click "Deploy"
6. Wait 2-3 minutes
7. **Your app is live!** 🎉

**5c. Test Production**
- Visit your Vercel URL
- Test upload
- Test gallery
- Test on mobile

---

## ✅ Success Checklist

You're ready if:
- [ ] Local dev server runs (`npm run dev`)
- [ ] Can upload images locally
- [ ] Gallery shows uploads locally
- [ ] App deployed to Vercel
- [ ] Can upload on production URL
- [ ] Gallery works on production
- [ ] Works on mobile phone

---

## 🎊 You're Done!

Your Wedding POV app is ready! Here's what to do next:

### Before the Wedding
1. **Create QR Code**
   - Use [qr-code-generator.com](https://www.qr-code-generator.com/)
   - Enter your Vercel URL
   - Download PNG
   - Print for table cards

2. **Test with Friends**
   - Share link with wedding party
   - Ask them to test upload
   - Verify everything works

3. **Clear Test Data**
   - Delete test uploads from Supabase
   - Clear gallery before wedding day

### During the Wedding
1. **Place QR codes** on tables
2. **Announce** during reception
3. **Monitor** gallery (optional)
4. **Enjoy** the memories!

### After the Wedding
1. **Download** all photos from gallery
2. **Backup** Supabase data
3. **Share** favorites with guests
4. **Treasure** memories forever! 💕

---

## 📚 Need More Help?

| Question | Document |
|----------|----------|
| How does everything work? | [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) |
| What features are included? | [`FEATURES.md`](./FEATURES.md) |
| How do I customize? | [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md) |
| Deployment troubleshooting? | [`DEPLOYMENT.md`](./DEPLOYMENT.md) |
| Supabase issues? | [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) |

---

## 🐛 Common Issues

**App shows default Next.js page**
- Delete root `app/` directory if exists
- Only keep `src/app/`

**Upload fails**
- Check browser console (F12)
- Verify bucket is public
- Check environment variables

**Gallery empty**
- Verify uploads in Supabase dashboard
- Check RLS policies enabled
- Test upload first

**Build fails on Vercel**
- Add environment variables in Vercel
- Test build locally: `npm run build`
- Check error in deployment logs

---

## 🎨 Quick Customization

Want to personalize for your wedding?

**Change title:**
```typescript
// src/app/page.tsx, line ~228
<h1>John & Jane's Wedding POV 📸</h1>
```

**Change colors:**
```typescript
// Search and replace in src/app/
from-violet-600 → from-blue-600    (your color)
from-pink-600 → from-rose-600      (your color)
```

**Change bucket name:**
```typescript
// src/app/page.tsx, lines ~73, 85
.from('pov-uploads') → .from('your-bucket-name')
```

---

## 💡 Pro Tips

1. **Test on real phone** before wedding
2. **Create backup** of test uploads
3. **Have WiFi ready** at venue
4. **Print multiple QR codes** (one per table)
5. **Announce early** in reception
6. **Monitor occasionally** during event
7. **Download favorites** same night

---

## 🎉 That's It!

You now have a beautiful, working Wedding POV app!

**Total time:** ~15 minutes  
**Difficulty:** Easy  
**Cost:** Free (with free tiers)  

---

**Questions?** Check the other documentation files or open an issue.

**Congratulations and Happy Wedding! 💒💕✨**
