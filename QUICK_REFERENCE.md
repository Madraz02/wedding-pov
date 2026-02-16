# 🚀 Quick Reference Guide

Fast answers to common questions and tasks for Wedding POV.

---

## 🔧 Common Tasks

### Change File Size Limit
**File:** `src/app/page.tsx`  
**Line:** ~17
```typescript
const MAX_FILE_SIZE = 50 * 1024 * 1024  // Change to desired size in bytes
```

### Change Message Character Limit  
**File:** `src/app/page.tsx`  
**Line:** ~18
```typescript
const MAX_MESSAGE_LENGTH = 500  // Change to desired length
```

### Change Auto-Refresh Interval
**File:** `src/app/gallery/page.tsx`  
**Line:** ~34
```typescript
const interval = setInterval(() => {
  fetchUploads(true)
}, 30000)  // Change 30000 to desired milliseconds (60000 = 1 minute)
```

### Change Storage Bucket Name
**File:** `src/app/page.tsx`  
**Lines:** ~73, 85
```typescript
.from('pov-uploads')  // Change 'pov-uploads' to your bucket name
```
**Note:** Also update in Supabase dashboard!

### Change Table Name
**File:** `src/app/page.tsx`  
**Line:** ~91
```typescript
.from('uploads')  // Change 'uploads' to your table name
```
**Note:** Also update in Supabase dashboard!

### Customize Page Title & Description
**File:** `src/app/layout.tsx`  
**Lines:** ~6-9
```typescript
export const metadata: Metadata = {
  title: 'Your Wedding Name - Photo Sharing',
  description: 'Share memories from [Names] special day!',
}
```

### Change Primary Colors
**Files:** `src/app/page.tsx`, `src/app/gallery/page.tsx`

Find and replace:
- `from-violet-600 to-pink-600` → Your gradient colors
- `bg-violet-100` → Your background color
- `border-pink-300` → Your border color
- `text-violet-600` → Your text color

### Add Wedding Date/Names
**File:** `src/app/page.tsx`  
**Line:** ~228
```typescript
<h1 className="text-5xl font-bold...">
  John & Jane's Wedding POV 📸
</h1>
<p className="text-gray-700 font-medium text-lg">
  Share memories from our special day - June 15, 2024
</p>
```

---

## 📋 File Structure Quick Reference

```
src/
├── app/
│   ├── page.tsx           ← Upload page (home)
│   ├── gallery/
│   │   └── page.tsx      ← Gallery view
│   ├── layout.tsx        ← Site metadata, SEO
│   └── globals.css       ← Styles & animations
├── components/
│   └── Toast.tsx         ← Notifications
├── types/
│   └── database.ts       ← TypeScript types
└── utils/
    └── supabase.ts       ← Supabase config
```

---

## 🎨 Color Schemes

### Default Palette
```css
Violet:  #8b5cf6
Pink:    #ec4899
Rose:    #fb7185
Purple:  #a855f7
Green:   #10b981 (success)
Red:     #ef4444 (error)
Blue:    #3b82f6 (info)
```

### Scrapbook Card Colors (Gallery)
```typescript
1. Pink/Rose:     from-pink-100 to-rose-100
2. Violet/Purple: from-violet-100 to-purple-100
3. Blue/Cyan:     from-blue-100 to-cyan-100
4. Green/Emerald: from-green-100 to-emerald-100
5. Yellow/Orange: from-yellow-100 to-orange-100
6. Red/Pink:      from-red-100 to-pink-100
7. Indigo/Blue:   from-indigo-100 to-blue-100
```

---

## ⌨️ Keyboard Shortcuts

### Gallery Lightbox
- `←` Left Arrow - Previous photo
- `→` Right Arrow - Next photo
- `D` - Download current photo
- `ESC` - Close lightbox

---

## 🔔 Toast Notification Types

```typescript
// Success (green)
setToast({ message: 'Upload successful!', type: 'success' })

// Error (red)
setToast({ message: 'Upload failed!', type: 'error' })

// Info (blue)
setToast({ message: 'Processing...', type: 'info' })
```

---

## 🗄️ Database Quick Reference

### Table: `uploads`
```sql
Column       Type         Nullable  Default
-----------  -----------  --------  -------
id           bigserial    NO        auto
created_at   timestamptz  NO        now()
guest_name   text         YES       null
message      text         YES       null
file_url     text         NO        -
```

### Storage: `pov-uploads`
- **Public:** Yes
- **Max size:** 50MB (client-side)
- **Allowed:** Images & Videos

---

## 📐 Layout Breakpoints

```css
Mobile:  < 640px   (sm)  - 1 column
Tablet:  640px+    (sm)  - 2 columns
Desktop: 1024px+   (lg)  - 3 columns
Large:   1280px+   (xl)  - 4 columns
```

---

## 🐛 Quick Debugging

### Check Supabase Connection
```typescript
// Add to page.tsx
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Check Upload Details
```typescript
// Already in code (src/app/page.tsx)
// Open browser console (F12) and look for:
// - "Starting upload..."
// - "File uploaded successfully:"
// - "Public URL:"
// - "Upload complete!"
```

### Check Gallery Data
```typescript
// Already in code (src/app/gallery/page.tsx)
// Open browser console and look for:
// - "Error fetching uploads:" (if any issues)
```

### Common Console Checks
1. Press `F12` to open browser console
2. Go to Console tab
3. Look for red errors
4. Check Network tab for failed requests

---

## 📱 Testing Checklist

### Upload Page
- [ ] Camera button opens camera on mobile
- [ ] Gallery button opens file picker
- [ ] Preview shows after file selection
- [ ] File validation works (try 100MB file)
- [ ] Message counter shows correctly
- [ ] Upload progress bar works
- [ ] Success screen shows confetti
- [ ] Toast notifications appear

### Gallery Page
- [ ] All photos load correctly
- [ ] Cards display with proper styling
- [ ] Click opens lightbox
- [ ] Keyboard navigation works
- [ ] Download button works
- [ ] Auto-refresh indicator shows
- [ ] Manual refresh works
- [ ] New upload notification shows

### Mobile Specific
- [ ] Responsive layout works
- [ ] Touch gestures smooth
- [ ] Camera opens correctly
- [ ] Images upload on mobile data
- [ ] No horizontal scrolling

---

## 🚀 Deployment Checklist

### Before Deploy
- [ ] Test all features locally
- [ ] Check environment variables
- [ ] Verify Supabase bucket is public
- [ ] Test on mobile device
- [ ] Run `npm run build` successfully

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Set environment variables in dashboard
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### After Deploy
- [ ] Visit production URL
- [ ] Test upload
- [ ] Check gallery
- [ ] Verify auto-refresh
- [ ] Test on mobile
- [ ] Check all links work

---

## 📊 Performance Tips

1. **Optimize Images:**
   - Compress before upload (future feature)
   - Use WebP format when possible

2. **Reduce Auto-Refresh:**
   - Change interval to 60s instead of 30s
   - Only for very slow networks

3. **Lazy Load Gallery:**
   - Implement pagination (future feature)
   - Load 20 images at a time

4. **CDN:**
   - Vercel includes CDN by default
   - Images served from edge

---

## 🔐 Security Notes

### What's Secure
✅ Row-level security enabled  
✅ Public access controlled  
✅ File size limits enforced  
✅ File type validation  
✅ Input sanitization  

### What's Not Included
❌ User authentication (by design)  
❌ Rate limiting (add if needed)  
❌ CAPTCHA (add if spam occurs)  
❌ Content moderation (manual for now)

---

## 📞 Support Resources

### Documentation
- [`README.md`](./README.md) - Setup guide
- [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) - Complete guide
- [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) - Backend setup
- [`IMPROVEMENTS.md`](./IMPROVEMENTS.md) - Feature list

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Troubleshooting
See "Troubleshooting" section in `PROJECT_OVERVIEW.md`

---

## 💡 Quick Tips

1. **Test with real phone** before wedding day
2. **Share via QR code** at venue for easy access
3. **Monitor gallery** during event on tablet/laptop
4. **Download favorites** periodically during event
5. **Clear test uploads** before wedding starts
6. **Have backup plan** (traditional guest book)
7. **Announce it** at reception for max participation

---

## 🎊 Day-Of Checklist

### 1 Week Before
- [ ] Test entire flow
- [ ] Verify deployment stable
- [ ] Create QR code with URL
- [ ] Print QR codes for tables
- [ ] Test on multiple devices

### 1 Day Before
- [ ] Clear any test uploads
- [ ] Verify auto-refresh working
- [ ] Check Supabase limits/quota
- [ ] Prepare monitoring device
- [ ] Share link with wedding party

### Day Of
- [ ] Check app is live
- [ ] Place QR codes on tables
- [ ] Announce during reception
- [ ] Monitor uploads periodically
- [ ] Thank guests for sharing!

### After Wedding
- [ ] Download all photos
- [ ] Backup to cloud storage
- [ ] Create album/slideshow
- [ ] Share favorites with guests
- [ ] Send thank you messages

---

**Need more help?** Check the full documentation in `PROJECT_OVERVIEW.md`

**Happy Wedding! 💕**
