# 🚀 Deployment Guide - Wedding POV

Step-by-step guide to deploy your Wedding POV app to Vercel.

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] App works locally (`npm run dev`)
- [ ] Build succeeds (`npm run build`)
- [ ] `.env.local` file configured with Supabase keys
- [ ] Supabase bucket `pov-uploads` is **public**
- [ ] Supabase table `uploads` exists with RLS policies
- [ ] Test upload and gallery work locally

---

## 🌐 Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - Wedding POV app"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

4. **Add Environment Variables** ⚠️ CRITICAL
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |

   **Important:** 
   - Click "Add" after entering each variable
   - Apply to all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `your-project.vercel.app`

6. **Test Deployment**
   - Visit your Vercel URL
   - Test camera/gallery buttons
   - Upload a test photo
   - Check gallery page
   - Verify auto-refresh works

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (first time)
   - Project name? Press Enter (uses folder name)
   - Directory? Press Enter (current directory)
   - Override settings? **N**

4. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   # Paste your Supabase URL, press Enter
   # Select: Production, Preview, Development (all)
   
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   # Paste your Supabase anon key, press Enter
   # Select: Production, Preview, Development (all)
   ```

5. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

6. **Your app is live!** 🎉
   - URL will be shown in terminal
   - Visit and test all features

---

## 🔧 Troubleshooting Deployment

### Error: "supabaseUrl is required"
**Solution:** Add environment variables in Vercel dashboard
1. Go to Project Settings
2. Click "Environment Variables"
3. Add both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Redeploy from Deployments tab

### Error: "Bucket not found"
**Solution:** Check Supabase bucket name
1. Verify bucket is named `pov-uploads` (or update code)
2. Ensure bucket is set to **Public**
3. Check bucket exists in Supabase Storage

### Error: "Table 'uploads' does not exist"
**Solution:** Create database table
1. Go to Supabase SQL Editor
2. Run the SQL from `SUPABASE_SETUP.md`
3. Verify table exists in Table Editor

### Error: "CORS error" or "Failed to fetch"
**Solution:** Check Supabase configuration
1. Ensure bucket is **public**
2. Check Supabase project is active
3. Verify API keys are correct

### Error: Build fails with TypeScript errors
**Solution:** Check TypeScript configuration
```bash
# Test locally first
npm run build

# Fix any errors shown
# Then commit and push
```

### Error: Images not loading in gallery
**Solution:** Check bucket public access
1. Go to Supabase Storage → `pov-uploads`
2. Click Settings
3. Enable "Public bucket"
4. Save changes

---

## 🔐 Environment Variables Setup

### Required Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Where to Find These Values

**Supabase URL:**
- Supabase Dashboard → Settings → API
- Section: "Project URL"
- Format: `https://[project-id].supabase.co`

**Anon Key:**
- Supabase Dashboard → Settings → API
- Section: "Project API keys"
- Look for: `anon` `public` key
- Long string starting with `eyJ...`

### Adding to Vercel

**Via Dashboard:**
1. Project Settings → Environment Variables
2. Add variable name and value
3. Select all environments
4. Click "Add"

**Via CLI:**
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
```

---

## 🌍 Custom Domain (Optional)

### Add Custom Domain to Vercel

1. **Go to Project Settings**
   - Domains tab

2. **Add Domain**
   - Enter your domain: `weddingpov.yourdomain.com`
   - Click "Add"

3. **Configure DNS**
   - Add CNAME record:
     - Name: `weddingpov` (or `@` for root)
     - Value: `cname.vercel-dns.com`
   - Wait for DNS propagation (5-30 minutes)

4. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Usually ready in minutes

---

## 📱 Post-Deployment Testing

### Test These Features

1. **Upload Page**
   - [ ] Page loads correctly
   - [ ] Camera button works on mobile
   - [ ] Gallery button works
   - [ ] File preview displays
   - [ ] Upload succeeds
   - [ ] Success screen shows
   - [ ] Toast notifications appear

2. **Gallery Page**
   - [ ] All photos load
   - [ ] Cards display properly
   - [ ] Click opens lightbox
   - [ ] Download works
   - [ ] Auto-refresh active
   - [ ] Keyboard shortcuts work

3. **Mobile Testing**
   - [ ] Test on actual phone
   - [ ] Camera opens correctly
   - [ ] Touch interactions smooth
   - [ ] Responsive layout works
   - [ ] Upload on mobile data

4. **Performance**
   - [ ] Page loads fast
   - [ ] Images load quickly
   - [ ] Animations smooth
   - [ ] No console errors

---

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected to GitHub, Vercel automatically deploys:
- **Production:** Every push to `main` branch
- **Preview:** Every push to other branches
- **Pull Requests:** Preview deployments for PRs

### Manual Redeploy

**Via Dashboard:**
1. Go to Deployments tab
2. Click three dots (•••) on latest deployment
3. Click "Redeploy"

**Via CLI:**
```bash
vercel --prod
```

---

## 🎯 Vercel Configuration

### Recommended Settings

**General:**
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`
- **Development Command:** `npm run dev`

**Environment Variables:**
- Set for: Production, Preview, Development
- Never commit `.env.local` to git

**Performance:**
- **Edge Network:** Enabled (default)
- **Image Optimization:** Enabled (default)
- **Analytics:** Optional, enable if desired

---

## 📊 Monitoring

### Vercel Analytics (Optional)

Enable in Project Settings:
- **Web Analytics** - Page views, performance
- **Speed Insights** - Core Web Vitals
- **Logs** - Runtime logs

### Check Logs

**Via Dashboard:**
- Functions tab → View logs
- Check for runtime errors

**Via CLI:**
```bash
vercel logs [deployment-url]
```

---

## 🎨 Custom Configuration

### next.config.ts

Current configuration:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```

**Optional additions:**
```typescript
const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Image optimization
  images: {
    domains: ['[your-project].supabase.co'],
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
        ],
      },
    ]
  },
};
```

---

## 🔒 Security Best Practices

### Before Going Live

1. **Review Supabase Policies**
   - Ensure RLS is enabled
   - Test policies work correctly
   - Limit abuse vectors

2. **Rate Limiting** (Optional)
   - Add to prevent spam
   - Use Vercel rate limiting
   - Or Supabase edge functions

3. **Content Moderation**
   - Manual review recommended
   - Add admin dashboard (future)
   - Monitor for inappropriate content

4. **Backup Plan**
   - Export Supabase data regularly
   - Keep local backups
   - Document recovery process

---

## 💰 Cost Considerations

### Vercel Free Tier
- ✅ 100 GB bandwidth/month
- ✅ Unlimited deployments
- ✅ SSL certificates included
- ✅ Edge network included
- ⚠️ Check limits for high-traffic events

### Supabase Free Tier
- ✅ 500 MB database storage
- ✅ 1 GB file storage
- ✅ 50,000 monthly active users
- ✅ 2 GB bandwidth
- ⚠️ Upgrade if expecting many guests

### Scaling Tips
- Compress images before upload (reduce storage)
- Set file size limits appropriately
- Monitor usage during event
- Upgrade if approaching limits

---

## 🎉 Go Live Checklist

### 1 Day Before Wedding
- [ ] Deploy to production
- [ ] Test all features on live URL
- [ ] Test on multiple devices/browsers
- [ ] Create QR code with live URL
- [ ] Print QR codes for venue
- [ ] Share link with wedding party

### Wedding Day
- [ ] Verify app is accessible
- [ ] Place QR codes on tables
- [ ] Announce to guests during reception
- [ ] Monitor uploads (optional)
- [ ] Keep device charged for monitoring

### After Wedding
- [ ] Download all photos from gallery
- [ ] Backup Supabase data
- [ ] Export database
- [ ] Thank guests
- [ ] Share favorite moments

---

## 🔗 Quick Links

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs

**Supabase:**
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs

**Next.js:**
- Docs: https://nextjs.org/docs
- Deployment: https://nextjs.org/docs/deployment

---

## 🆘 Get Help

### Error: Build Failed
1. Check error message in Vercel logs
2. Test build locally: `npm run build`
3. Fix errors and push again
4. Redeploy

### Error: Environment Variables Not Working
1. Verify variables are added correctly
2. Check variable names (case-sensitive)
3. Redeploy after adding variables
4. Check Vercel logs for specific errors

### Error: Can't Access on Mobile
1. Check if URL is accessible
2. Try different browser
3. Check if HTTPS is working
4. Clear browser cache

### Still Having Issues?
- Check Vercel status page
- Check Supabase status page
- Review error logs
- Test locally first

---

**Deployment should take 2-5 minutes total!**

**Good luck with your deployment and wedding! 💕**
