# 📸 Wedding POV

A modern, interactive web application for wedding guests to share photos, videos, and messages in real-time. Built with Next.js, TypeScript, and Supabase.

> 🚀 **Want to get started quickly?** Follow [`GETTING_STARTED.md`](./GETTING_STARTED.md) for a 15-minute setup!  
> 💡 **New to this project?** Check out [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) for a comprehensive guide!

## ✨ Features

### Core Features
- 📷 **Camera Integration** - Direct camera access on mobile
- 🖼️ **Gallery Upload** - Choose from device gallery
- 💬 **Messages** - Personalized notes with uploads
- 🎨 **Live Preview** - See photos before uploading
- 📤 **Progress Tracking** - Real-time upload progress

### Gallery Features
- 🔄 **Auto-Refresh** - Updates every 30 seconds
- 📥 **Download** - Save any photo/video
- ⌨️ **Keyboard Navigation** - Arrow keys, ESC, D for download
- 🔍 **Lightbox View** - Full-screen photo viewer
- 🎴 **Scrapbook Style** - Colorful polaroid cards

### User Experience
- 🔔 **Toast Notifications** - Beautiful feedback system
- ✅ **File Validation** - Size/type checking (50MB limit)
- 📝 **Character Counter** - Message length tracking
- 💫 **Smooth Animations** - Floating hearts, sparkles, confetti
- 🎨 **Aesthetic Design** - Romantic gradient backgrounds
- 📱 **Mobile Optimized** - Touch-friendly interface

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** Supabase (PostgreSQL + Storage)
- **Deployment:** Vercel-ready

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd wedding-pov
npm install
```

### 2. Setup Supabase
Follow the detailed guide in [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)

**Quick summary:**
- Create storage bucket: `pov-uploads` (public)
- Create `uploads` table with RLS policies
- Get your API keys from Supabase dashboard

### 3. Configure Environment
```bash
cp .env.local.example .env.local
```

Add your keys to `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## 📱 Usage

### For Guests
1. **Upload Page** (`/`) - Take or choose photo, add message, upload
2. **Gallery Page** (`/gallery`) - View all memories, download photos

### Keyboard Shortcuts (Gallery)
- `←` / `→` - Navigate photos
- `D` - Download current photo
- `ESC` - Close lightbox

## 🚀 Deployment

### Deploy to Vercel

**Quick Deploy:**
1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

📖 **Full deployment guide:** See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for detailed instructions

**Via CLI:**
```bash
npm i -g vercel
vercel
```

⚠️ **Important:** Add environment variables in Vercel settings before deploying!

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md) | 📖 Complete project guide with architecture, tech stack, and detailed explanations |
| [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) | 🔧 Step-by-step backend setup with SQL scripts |
| [`FEATURES.md`](./FEATURES.md) | ✨ Comprehensive list of all 150+ features |
| [`IMPROVEMENTS.md`](./IMPROVEMENTS.md) | 🎉 Recent enhancements and changelog |
| [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md) | ⚡ Quick answers for common tasks |
| [`DEPLOYMENT.md`](./DEPLOYMENT.md) | 🚀 Step-by-step deployment guide for Vercel |
| [`GETTING_STARTED.md`](./GETTING_STARTED.md) | 🎯 15-minute quick start guide |

**Quick Navigation:**
- 🚀 **Want to start fast?** → Follow [`GETTING_STARTED.md`](./GETTING_STARTED.md)
- 🆕 **First time?** → Read [`PROJECT_OVERVIEW.md`](./PROJECT_OVERVIEW.md)
- 🔧 **Setting up Supabase?** → Follow [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md)
- 🌐 **Deploying?** → Check [`DEPLOYMENT.md`](./DEPLOYMENT.md)
- 🎨 **Customizing?** → See [`QUICK_REFERENCE.md`](./QUICK_REFERENCE.md)
- ✨ **What's included?** → Browse [`FEATURES.md`](./FEATURES.md)

## 🎨 Customization

Want to personalize? Edit these files:
- **Colors:** `src/app/page.tsx` and `src/app/gallery/page.tsx`
- **Branding:** `src/app/layout.tsx` (metadata)
- **Limits:** `src/app/page.tsx` (file size, message length)
- **Auto-refresh:** `src/app/gallery/page.tsx` (interval timing)

## 🤝 Contributing

Ideas for improvements:
- [ ] Image compression before upload
- [ ] Bulk download as ZIP
- [ ] Admin dashboard
- [ ] QR code generator
- [ ] Photo filters
- [ ] Slideshow mode

## 📄 License

Open source - Feel free to use for your wedding!

## 💖 Made With Love

Built for capturing beautiful wedding memories through the eyes of your guests.

**Questions?** Open an issue or check the documentation files above.

**Happy Wedding! 🎊**
