'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import Toast from '@/components/Toast'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [name, setName] = useState('')
  const [msg, setMsg] = useState('')
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
  const MAX_MESSAGE_LENGTH = 500

  // Create floating hearts
  useEffect(() => {
    const hearts = ['💕', '💖', '💗', '💝', '💓', '💘', '✨', '🌸', '🎀']
    const container = document.getElementById('floating-elements')
    
    if (container) {
      const createFloatingElement = () => {
        const element = document.createElement('div')
        element.className = 'floating-heart'
        element.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        element.style.left = `${Math.random() * 100}%`
        element.style.fontSize = `${Math.random() * 20 + 15}px`
        element.style.animationDuration = `${Math.random() * 10 + 15}s`
        element.style.animationDelay = `${Math.random() * 5}s`
        container.appendChild(element)
        
        setTimeout(() => element.remove(), 25000)
      }
      
      // Create initial hearts
      for (let i = 0; i < 8; i++) {
        setTimeout(createFloatingElement, i * 2000)
      }
      
      // Add new hearts periodically
      const interval = setInterval(createFloatingElement, 4000)
      return () => clearInterval(interval)
    }
  }, [])

  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) {
      setFile(null)
      setPreview(null)
      return
    }

    // Validate file size
    if (selectedFile.size > MAX_FILE_SIZE) {
      setToast({ 
        message: 'File is too large! Please select a file under 50MB.', 
        type: 'error' 
      })
      return
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm', 'video/quicktime']
    if (!validTypes.includes(selectedFile.type)) {
      setToast({ 
        message: 'Invalid file type! Please select an image or video.', 
        type: 'error' 
      })
      return
    }

    setFile(selectedFile)
    setToast({ 
      message: `Selected: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`, 
      type: 'info' 
    })
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(selectedFile)
  }

  const openCamera = () => {
    document.getElementById('camera-input')?.click()
  }

  const openGallery = () => {
    document.getElementById('gallery-input')?.click()
  }

  const handleUpload = async () => {
    if (!file) {
      setToast({ message: 'Please select a photo or video!', type: 'error' })
      return
    }

    // Validate message length
    if (msg.length > MAX_MESSAGE_LENGTH) {
      setToast({ message: `Message is too long! Maximum ${MAX_MESSAGE_LENGTH} characters.`, type: 'error' })
      return
    }

    setUploading(true)
    setUploadProgress(0)

    try {
      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // 1. Upload File to Bucket
      setToast({ message: 'Uploading your memory...', type: 'info' })
      const filename = `${uuidv4()}-${file.name}`
      const { data: fileData, error: fileError } = await supabase.storage
        .from('pov-uploads')
        .upload(filename, file)

      if (fileError) {
        clearInterval(progressInterval)
        console.error('Storage Error:', fileError)
        setToast({ message: `Upload failed: ${fileError.message}`, type: 'error' })
        throw fileError
      }

      setUploadProgress(95)

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('pov-uploads')
        .getPublicUrl(filename)

      // 3. Save Entry to Database
      const { error: dbError } = await supabase
        .from('uploads')
        .insert([{ guest_name: name || 'Anonymous', message: msg, file_url: publicUrl }])

      if (dbError) {
        clearInterval(progressInterval)
        console.error('Database Error:', dbError)
        setToast({ message: `Database error: ${dbError.message}`, type: 'error' })
        throw dbError
      }

      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Show success notification
      setToast({ message: 'Memory uploaded successfully! 🎉', type: 'success' })
      
      // Show confetti and success screen
      setTimeout(() => {
        setShowConfetti(true)
        setDone(true)
      }, 500)
    } catch (error) {
      console.error('Upload failed:', error)
      setUploadProgress(0)
    } finally {
      setUploading(false)
    }
  }

  // Confetti effect
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  if (done) return (
    <div className="flex h-screen flex-col items-center justify-center p-4 text-center relative overflow-hidden bg-aesthetic">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-32 right-20 w-40 h-40 bg-violet-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-32 w-48 h-48 bg-rose-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-10 w-36 h-36 bg-purple-200 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'][Math.floor(Math.random() * 5)]
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Success Content */}
      <div className="animate-bounce-in z-10 text-center">
        <div className="flex justify-center gap-4 text-6xl mb-6">
          <span className="animate-bounce" style={{ animationDuration: '1s' }}>🎉</span>
          <span className="animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.1s' }}>💕</span>
          <span className="animate-bounce" style={{ animationDuration: '1s', animationDelay: '0.2s' }}>✨</span>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-4 border-green-200 max-w-md mx-auto">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 mb-4 animate-slide-up" style={{ fontFamily: 'cursive' }}>
            Thank You!
          </h1>
          <p className="text-xl text-gray-700 animate-slide-up font-semibold" style={{ animationDelay: '0.1s' }}>
            Your memory has been saved! 💝
          </p>
          <p className="text-sm text-gray-500 mt-2 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            The couple will treasure this moment forever
          </p>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-slide-up z-10" style={{ animationDelay: '0.2s' }}>
        <button 
          onClick={() => window.location.reload()}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-10 py-5 text-white font-bold text-lg transition-all hover:scale-110 hover:shadow-2xl hover:-rotate-2 active:scale-95 border-4 border-white shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-2xl group-hover:animate-bounce">📸</span>
            Send Another
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
        <Link
          href="/gallery"
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 px-10 py-5 text-white font-bold text-lg transition-all hover:scale-110 hover:shadow-2xl hover:rotate-2 active:scale-95 border-4 border-white shadow-xl"
        >
          <span className="relative z-10 flex items-center gap-2">
            <span className="text-2xl group-hover:animate-bounce">🖼️</span>
            View Gallery
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col items-center p-6 bg-aesthetic relative overflow-hidden">
      {/* Floating decorative elements */}
      <div id="floating-elements" className="absolute inset-0 overflow-hidden pointer-events-none"></div>
      
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-pink-200 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '4s' }}></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-violet-200 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '5s' }}></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-rose-200 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '6s' }}></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-200 to-transparent rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDuration: '5.5s' }}></div>
      
      {/* Sparkle effects */}
      <div className="absolute top-20 left-1/4 text-2xl sparkle" style={{ animationDelay: '0s' }}>✨</div>
      <div className="absolute top-40 right-1/3 text-xl sparkle" style={{ animationDelay: '1s' }}>💫</div>
      <div className="absolute bottom-32 left-1/3 text-2xl sparkle" style={{ animationDelay: '2s' }}>⭐</div>
      <div className="absolute top-1/2 right-1/4 text-xl sparkle" style={{ animationDelay: '1.5s' }}>✨</div>
      <div className="w-full max-w-md mb-4 animate-slide-down relative z-10">
        <Link 
          href="/gallery"
          className="group inline-flex items-center text-sm text-gray-600 hover:text-violet-600 transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="ml-1">View Gallery</span>
        </Link>
      </div>
      
      <div className="text-center mb-8 animate-slide-up relative z-10">
        <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-violet-600 via-pink-600 to-rose-600 bg-clip-text text-transparent drop-shadow-sm">
          Wedding POV 📸
        </h1>
        <p className="text-gray-700 font-medium text-lg">Share your special moment with us!</p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-pink-400">💕</span>
          <span className="text-gray-400 text-sm">Capture the love</span>
          <span className="text-violet-400">✨</span>
        </div>
      </div>
      
      <div className="w-full max-w-md space-y-4 relative z-10">
        {/* Hidden File Inputs */}
        <input
          id="camera-input"
          type="file"
          accept="image/*,video/*"
          capture="environment"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />
        <input
          id="gallery-input"
          type="file"
          accept="image/*,video/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="hidden"
        />

        {/* Camera and Gallery Buttons */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in">
          <button
            onClick={openCamera}
            className="group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-violet-100 to-purple-100 border-4 border-violet-300 rounded-2xl hover:border-violet-500 transition-all hover:scale-110 hover:shadow-2xl hover:-rotate-2 active:scale-95"
          >
            {/* Fun decorative corner */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-400 rounded-full animate-pulse shadow-lg"></div>
            <div className="absolute -top-1 -right-1 w-8 h-8 bg-violet-300 rounded-full"></div>
            
            {/* Emoji background */}
            <div className="absolute top-2 left-2 text-2xl opacity-20 group-hover:scale-125 transition-transform">📸</div>
            
            <div className="relative bg-white rounded-full p-4 shadow-lg group-hover:shadow-xl group-hover:rotate-12 transition-all mb-3">
              <svg className="w-10 h-10 text-violet-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <span className="text-base font-bold text-violet-700 group-hover:text-violet-900 transition-colors relative z-10">
              📷 Open Camera
            </span>
            <span className="text-xs text-violet-600 mt-1">Take a photo!</span>
          </button>

          <button
            onClick={openGallery}
            className="group relative flex flex-col items-center justify-center p-8 bg-gradient-to-br from-pink-100 to-rose-100 border-4 border-pink-300 rounded-2xl hover:border-pink-500 transition-all hover:scale-110 hover:shadow-2xl hover:rotate-2 active:scale-95"
          >
            {/* Fun decorative corner */}
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-pink-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -top-1 -left-1 w-8 h-8 bg-pink-300 rounded-full"></div>
            
            {/* Emoji background */}
            <div className="absolute bottom-2 right-2 text-2xl opacity-20 group-hover:scale-125 transition-transform">🖼️</div>
            
            <div className="relative bg-white rounded-full p-4 shadow-lg group-hover:shadow-xl group-hover:-rotate-12 transition-all mb-3">
              <svg className="w-10 h-10 text-pink-600 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <span className="text-base font-bold text-pink-700 group-hover:text-pink-900 transition-colors relative z-10">
              🎨 Choose Photo
            </span>
            <span className="text-xs text-pink-600 mt-1">From gallery</span>
          </button>
        </div>

        {/* Preview - Polaroid Style */}
        {preview && (
          <div className="relative animate-scale-in">
            {/* Polaroid Card */}
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-4 rounded-2xl shadow-2xl border-4 border-yellow-300 rotate-1 hover:rotate-0 transition-transform">
              {/* Decorative tape at top */}
              <div className="absolute -top-3 left-8 w-16 h-6 bg-white/70 backdrop-blur-sm border border-gray-300 shadow-md -rotate-12"></div>
              <div className="absolute -top-3 right-8 w-16 h-6 bg-white/70 backdrop-blur-sm border border-gray-300 shadow-md rotate-12"></div>
              
              {/* Photo */}
              <div className="bg-white p-2 rounded-lg shadow-inner">
                {file?.type.startsWith('video/') ? (
                  <video src={preview} controls className="w-full max-h-64 object-contain rounded" />
                ) : (
                  <img src={preview} alt="Preview" className="w-full max-h-64 object-contain rounded" />
                )}
              </div>
              
              {/* Caption area */}
              <div className="mt-3 p-3 bg-white/70 backdrop-blur-sm rounded-lg">
                <p className="text-sm text-gray-700 text-center truncate font-semibold">
                  ✨ {file?.name} ✨
                </p>
              </div>

              {/* Fun sticker decoration */}
              <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
                💖
              </div>
              <div className="absolute -bottom-2 -right-2 text-3xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
                ✨
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => {
                setFile(null)
                setPreview(null)
              }}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-600 hover:scale-125 hover:rotate-90 transition-all shadow-xl active:scale-95 border-4 border-white z-10"
            >
              <span className="text-xl font-bold">✕</span>
            </button>

            {/* Shadow effect */}
            <div className="absolute inset-0 -z-10 bg-black/10 rounded-2xl translate-y-2 translate-x-2"></div>
          </div>
        )}

        {/* Guest Name */}
        <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <input
            type="text"
            placeholder="Your Name (Optional)"
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Message */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="relative">
            <textarea
              placeholder="Leave a message for the couple... 💕"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all outline-none resize-none"
              rows={4}
              value={msg}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setMsg(e.target.value)}
            />
            <div className="absolute bottom-2 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-full">
              {msg.length}/{MAX_MESSAGE_LENGTH}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className="group relative w-full bg-gradient-to-r from-violet-600 to-pink-600 text-white py-5 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden ripple-effect"
          >
            {uploading ? (
              <div className="flex items-center justify-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Uploading... {uploadProgress}%</span>
              </div>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span className="group-hover:scale-110 transition-transform inline-block">💝</span>
                Send Memory
                <span className="group-hover:scale-110 transition-transform inline-block">✨</span>
              </span>
            )}
            
            {/* Progress Bar */}
            {uploading && (
              <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
                <div 
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-shine" />
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
