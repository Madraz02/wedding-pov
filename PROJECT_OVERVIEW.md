# 📸 Wedding POV - Project Overview

A modern, interactive web application that allows wedding guests to share their point-of-view photos, videos, and messages from your special day. Built with Next.js, TypeScript, and Supabase.

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [User Flow](#user-flow)
- [Key Features Explained](#key-features-explained)
- [Design Philosophy](#design-philosophy)
- [Deployment](#deployment)
- [Customization](#customization)
- [Troubleshooting](#troubleshooting)

---

## 🎯 About

**Wedding POV** is a guest-friendly photo and video sharing platform designed specifically for weddings. Instead of collecting memories weeks after the event through various messaging apps, Wedding POV provides a centralized, beautifully designed space where guests can instantly upload and view photos/videos during and after the celebration.

### Why Wedding POV?

- **Instant sharing** - Guests upload in real-time during the wedding
- **No app required** - Works directly in any web browser
- **Beautiful gallery** - Scrapbook-style display of all memories
- **Easy to use** - Simple interface, camera integration
- **Persistent memories** - All uploads stored securely in Supabase

---

## ✨ Features

### Core Functionality
- 📷 **Camera Integration** - Direct camera access on mobile devices
- 🖼️ **Gallery Upload** - Choose existing photos/videos from device
- 💬 **Messages** - Add personalized messages to uploads
- 👤 **Guest Names** - Optional name attribution (defaults to "Anonymous")
- 🎨 **Live Preview** - See photo before uploading
- 📤 **Progress Tracking** - Real-time upload progress bar

### Gallery Features
- 🔄 **Auto-Refresh** - Gallery updates every 30 seconds automatically
- 📥 **Download** - Download any photo/video directly
- ⌨️ **Keyboard Navigation** - Navigate photos with arrow keys
- 🔍 **Lightbox View** - Full-screen photo viewer with details
- 🎴 **Scrapbook Style** - Fun, colorful polaroid-style cards
- 📊 **Memory Counter** - Track total uploads

### User Experience
- 🔔 **Toast Notifications** - Beautiful feedback for all actions
- ✅ **File Validation** - Size and type checking (50MB limit)
- 📝 **Character Counter** - Message length limit (500 chars)
- 💫 **Smooth Animations** - Floating hearts, sparkles, confetti
- 🎨 **Aesthetic Background** - Romantic gradient design
- 📱 **Mobile Optimized** - Touch-friendly, responsive design
- ♿ **Accessible** - Keyboard shortcuts, ARIA labels

### Technical Features
- 🚀 **Performance** - Optimized animations and loading
- 🛡️ **Validation** - Client-side checks prevent bad uploads
- 🔐 **Secure** - Row-level security with Supabase
- 📈 **SEO Ready** - Meta tags, Open Graph support
- 🎯 **Type Safe** - Full TypeScript implementation

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**: Custom React components
- **Icons**: SVG & Emoji

### Backend
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Storage**: Supabase Storage (AWS S3-compatible)
- **Authentication**: Public access (no auth required)
- **API**: Supabase JavaScript Client

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript Compiler
- **Build Tool**: Next.js built-in

### Dependencies
```json
{
  "@supabase/supabase-js": "^2.95.3",
  "next": "16.1.6",
  "react": "19.2.3",
  "react-dom": "19.2.3",
  "uuid": "^13.0.0"
}
```

---

## 📁 Project Structure

```
wedding-pov/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx             # Upload page (home)
│   │   ├── gallery/
│   │   │   └── page.tsx         # Gallery view page
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── globals.css          # Global styles & animations
│   ├── components/
│   │   └── Toast.tsx            # Toast notification component
│   ├── types/
│   │   └── database.ts          # TypeScript interfaces
│   └── utils/
│       └── supabase.ts          # Supabase client config
├── public/                       # Static assets
├── .env.local                    # Environment variables (not tracked)
├── .env.local.example           # Environment template
├── .gitignore                   # Git ignore rules
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── README.md                    # Setup & usage guide
├── PROJECT_OVERVIEW.md          # This file
├── IMPROVEMENTS.md              # Recent improvements log
└── SUPABASE_SETUP.md           # Supabase setup guide
```

### Key Files Explained

**`src/app/page.tsx`** (Upload Page)
- Main landing page for guests
- File upload interface with camera/gallery buttons
- Preview functionality
- Form inputs for name and message
- Upload progress tracking
- Success screen with confetti

**`src/app/gallery/page.tsx`** (Gallery Page)
- Displays all uploaded memories
- Auto-refresh functionality
- Scrapbook-style cards
- Lightbox modal for viewing
- Download functionality
- Keyboard navigation

**`src/components/Toast.tsx`**
- Reusable notification component
- Success, error, and info variants
- Auto-dismiss and manual close
- Animated slide-in effect

**`src/utils/supabase.ts`**
- Supabase client initialization
- Environment variable configuration
- Exported for use across app

**`src/app/globals.css`**
- Tailwind CSS imports
- Custom animations (float, sparkle, confetti, etc.)
- Utility classes
- Keyframe definitions

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager
- Supabase account (free tier works)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd wedding-pov
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Supabase**
   - Follow instructions in `SUPABASE_SETUP.md`
   - Create storage bucket: `pov-uploads` (public)
   - Create database table: `uploads`
   - Set up Row-Level Security policies

4. **Configure environment variables**
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. **Run development server**
```bash
npm run dev
```

6. **Open browser**
```
http://localhost:3000
```

### Build for Production
```bash
npm run build
npm run start
```

---

## 👥 User Flow

### For Guests (Upload Flow)

1. **Landing** - Guest arrives at homepage
2. **Choose Action**:
   - Click "Open Camera" → Takes photo/video directly
   - Click "Choose from Gallery" → Selects existing media
3. **Preview** - See selected file with polaroid-style card
4. **Add Details** (Optional):
   - Enter name (or stay anonymous)
   - Add message (up to 500 characters)
5. **Upload** - Click "Send Memory" button
6. **Progress** - Watch upload progress (0-100%)
7. **Success** - See confetti animation and success message
8. **Next Steps**:
   - Send another memory
   - View gallery

### For Guests (Gallery Flow)

1. **View Gallery** - Click "View Gallery" from any page
2. **Browse** - Scroll through scrapbook-style cards
3. **Click Photo** - Opens full-screen lightbox
4. **Navigate**:
   - Use arrow keys to browse
   - Press 'D' to download
   - Press ESC to close
5. **Auto-Refresh** - New photos appear automatically

### For Wedding Couple

1. **Setup** - Configure app before wedding
2. **Share Link** - Give guests the URL (or QR code)
3. **Monitor** - Watch gallery auto-refresh during event
4. **Download** - Save individual photos or all memories
5. **Treasure** - Keep memories forever!

---

## 🎨 Key Features Explained

### 1. Camera Integration
```typescript
// Uses HTML5 capture attribute
<input
  type="file"
  capture="environment"  // Opens rear camera
  accept="image/*,video/*"
/>
```
- On mobile: Opens native camera app
- On desktop: Opens webcam or file picker
- Seamless experience across devices

### 2. File Validation
- **Size Check**: Maximum 50MB per file
- **Type Check**: Images (JPEG, PNG, GIF, WebP) and videos (MP4, WebM, MOV)
- **User Feedback**: Toast notifications for errors
- **Early Prevention**: Validates before upload starts

### 3. Auto-Refresh Gallery
```typescript
// Polls every 30 seconds
setInterval(() => {
  fetchUploads(true)
}, 30000)
```
- Silent background updates
- Notifies when new photos added
- Shows count of new memories
- Manual refresh button available

### 4. Keyboard Shortcuts
- `←` Previous photo in lightbox
- `→` Next photo in lightbox
- `D` Download current photo
- `ESC` Close lightbox
- Displayed at bottom of lightbox for discovery

### 5. Toast Notifications
- Replaces browser alerts
- Better UX with animations
- Automatic dismissal
- Manual close option
- Color-coded by type

### 6. Aesthetic Background
- Multiple gradient layers
- Floating hearts and sparkles
- Smooth animations
- Low opacity (non-distracting)
- Romantic wedding theme

### 7. Scrapbook Cards
- 7 color schemes (rotates through)
- Slight rotation for authentic look
- Decorative tape effect
- Bouncing emoji stickers
- Shadow layers for depth

---

## 🎨 Design Philosophy

### Visual Theme
- **Romantic & Playful**: Soft pinks, purples, and violets
- **Scrapbook Aesthetic**: Polaroid cards, tape decorations
- **Whimsical Elements**: Floating hearts, sparkles, emoji
- **Modern Polish**: Smooth animations, gradients, shadows

### Color Palette
- **Primary**: Violet (#8b5cf6)
- **Secondary**: Pink (#ec4899)
- **Accent**: Rose (#fb7185)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Info**: Blue (#3b82f6)

### Animation Principles
- **Meaningful**: Every animation serves a purpose
- **Smooth**: 60fps with CSS transforms
- **Delightful**: Surprise and delight moments (confetti)
- **Non-blocking**: Doesn't interfere with content
- **Performant**: GPU-accelerated when possible

### Mobile-First Approach
- Touch-friendly button sizes (minimum 44x44px)
- Responsive grid layouts
- Swipe-friendly interactions
- Optimized for thumb reach
- Fast loading on mobile networks

---

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

2. **Add Environment Variables**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_SUPABASE_URL`
   - Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Deploy**
   - Push to main branch
   - Auto-deploys on every commit

### Other Platforms

**Netlify**
```bash
npm run build
# Upload .next folder
```

**AWS Amplify**
- Connect GitHub repository
- Set build command: `npm run build`
- Set environment variables

**Docker**
```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "start"]
```

---

## 🎨 Customization

### Change Colors
Edit `src/app/page.tsx` and `src/app/gallery/page.tsx`:
```typescript
// Change gradient colors
from-violet-600 to-pink-600  // Main gradients
bg-violet-100  // Backgrounds
border-pink-300  // Borders
```

### Change Branding
Edit `src/app/layout.tsx`:
```typescript
export const metadata: Metadata = {
  title: 'Your Wedding - Photo Sharing',
  description: 'Share memories from [Names] wedding!',
}
```

### Adjust Limits
Edit `src/app/page.tsx`:
```typescript
const MAX_FILE_SIZE = 50 * 1024 * 1024  // Change file size
const MAX_MESSAGE_LENGTH = 500  // Change message length
```

### Change Auto-Refresh Interval
Edit `src/app/gallery/page.tsx`:
```typescript
setInterval(() => {
  fetchUploads(true)
}, 30000)  // Change to 60000 for 1 minute, etc.
```

### Add Your Names/Date
Edit `src/app/page.tsx`:
```typescript
<h1 className="text-5xl font-bold...">
  [Your Names] Wedding POV 📸
</h1>
<p>Share your moment from our special day - [Date]</p>
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: "Storage Error: Bucket not found"**
- Solution: Create `pov-uploads` bucket in Supabase Storage
- Make sure it's set to **public**

**Issue: "Database Error: relation 'uploads' does not exist"**
- Solution: Run SQL script in Supabase SQL Editor (see SUPABASE_SETUP.md)

**Issue: File upload fails silently**
- Check browser console for errors
- Verify environment variables are set
- Check Supabase dashboard for errors
- Ensure RLS policies are enabled

**Issue: Gallery shows no images**
- Check if bucket URL is correct
- Verify images were uploaded successfully
- Check browser console for CORS errors
- Ensure bucket is set to public

**Issue: Camera doesn't open on mobile**
- Check browser permissions
- Try in different browser
- Ensure HTTPS (required for camera API)

**Issue: Slow performance**
- Reduce MAX_FILE_SIZE
- Optimize image compression
- Check network speed
- Clear browser cache

### Debug Mode

Add to `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

Check browser console for detailed logs.

---

## 📊 Database Schema

### `uploads` table
```sql
Column       | Type         | Description
-------------|--------------|----------------------------------
id           | bigserial    | Primary key, auto-increment
created_at   | timestamptz  | Upload timestamp (auto)
guest_name   | text         | Guest name (nullable)
message      | text         | Guest message (nullable)
file_url     | text         | Public URL to uploaded file
```

### Storage Bucket
- **Name**: `pov-uploads`
- **Public**: Yes
- **File size limit**: 50MB (enforced client-side)
- **Allowed types**: Images and videos

---

## 📈 Analytics Ideas

Want to track usage? Consider adding:

- Google Analytics
- Plausible Analytics (privacy-friendly)
- Supabase Analytics
- Custom event tracking

---

## 🤝 Contributing

Want to improve Wedding POV? Ideas:

1. Image compression before upload
2. Bulk download as ZIP
3. Admin dashboard
4. QR code generator
5. Photo filters
6. Social sharing
7. Slideshow mode
8. Print layouts

---

## 📄 License

This project is open source. Feel free to use it for your wedding or customize it for others!

---

## 💖 Credits

Built with love for capturing special moments.

**Technologies**: Next.js, React, TypeScript, Tailwind CSS, Supabase

**Inspiration**: Modern wedding photography, guest books, polaroid cameras

---

## 🎉 Enjoy Your Special Day!

May your wedding be filled with love, laughter, and beautiful memories captured through the eyes of your guests. 💕✨

---

**Questions?** Check:
- `README.md` - Setup instructions
- `SUPABASE_SETUP.md` - Backend configuration
- `IMPROVEMENTS.md` - Recent features

**Happy Wedding! 🎊**
