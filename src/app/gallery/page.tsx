'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import Link from 'next/link'
import Toast from '@/components/Toast'

interface Upload {
  id: number
  created_at: string
  guest_name: string | null
  message: string | null
  file_url: string
}

export default function Gallery() {
  const [uploads, setUploads] = useState<Upload[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<Upload | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Fun color schemes for cards
  const colorSchemes = [
    { bg: 'from-pink-100 to-rose-100', border: 'border-pink-300', accent: 'text-pink-600' },
    { bg: 'from-violet-100 to-purple-100', border: 'border-violet-300', accent: 'text-violet-600' },
    { bg: 'from-blue-100 to-cyan-100', border: 'border-blue-300', accent: 'text-blue-600' },
    { bg: 'from-green-100 to-emerald-100', border: 'border-green-300', accent: 'text-green-600' },
    { bg: 'from-yellow-100 to-orange-100', border: 'border-yellow-300', accent: 'text-orange-600' },
    { bg: 'from-red-100 to-pink-100', border: 'border-red-300', accent: 'text-red-600' },
    { bg: 'from-indigo-100 to-blue-100', border: 'border-indigo-300', accent: 'text-indigo-600' },
  ]

  // Random rotation angles for fun tilted cards
  const getCardRotation = (index: number) => {
    const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0']
    return rotations[index % rotations.length]
  }

  const getCardColor = (index: number) => {
    return colorSchemes[index % colorSchemes.length]
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!selectedImage) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      } else if (e.key === 'ArrowRight') {
        // Next image
        const currentIndex = uploads.findIndex(u => u.id === selectedImage.id)
        if (currentIndex < uploads.length - 1) {
          setSelectedImage(uploads[currentIndex + 1])
        }
      } else if (e.key === 'ArrowLeft') {
        // Previous image
        const currentIndex = uploads.findIndex(u => u.id === selectedImage.id)
        if (currentIndex > 0) {
          setSelectedImage(uploads[currentIndex - 1])
        }
      } else if (e.key === 'd' || e.key === 'D') {
        // Download
        handleDownload(selectedImage)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, uploads])

  useEffect(() => {
    fetchUploads()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchUploads(true)
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchUploads = async (silent = false) => {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      const previousCount = uploads.length
      const newCount = data?.length || 0
      
      setUploads(data || [])
      setLastUpdate(new Date())
      
      // Show notification if new uploads detected (only during auto-refresh)
      if (silent && newCount > previousCount && previousCount > 0) {
        const diff = newCount - previousCount
        setToast({ 
          message: `${diff} new ${diff === 1 ? 'memory' : 'memories'} added! 🎉`, 
          type: 'success' 
        })
      }
    } catch (error) {
      console.error('Error fetching uploads:', error)
      if (!silent) {
        setToast({ message: 'Failed to load memories', type: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = async (upload: Upload) => {
    try {
      setToast({ message: 'Downloading...', type: 'info' })
      const response = await fetch(upload.file_url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `wedding-memory-${upload.id}.${isVideo(upload.file_url) ? 'mp4' : 'jpg'}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      setToast({ message: 'Downloaded successfully!', type: 'success' })
    } catch (error) {
      console.error('Download error:', error)
      setToast({ message: 'Download failed', type: 'error' })
    }
  }

  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg|mov)$/i)
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-aesthetic relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-violet-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-violet-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-600 animate-spin"></div>
          </div>
          <p className="text-lg text-gray-600 animate-pulse">Loading memories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-aesthetic p-4 md:p-8 relative overflow-hidden">
      {/* Aesthetic Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating gradient orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-violet-200 to-purple-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 right-1/3 w-64 h-64 bg-gradient-to-br from-purple-200 to-violet-200 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Sparkles scattered around */}
        <div className="absolute top-1/4 left-1/4 text-3xl sparkle opacity-30" style={{ animationDelay: '0s' }}>✨</div>
        <div className="absolute top-1/3 right-1/4 text-2xl sparkle opacity-30" style={{ animationDelay: '1s' }}>💫</div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl sparkle opacity-30" style={{ animationDelay: '2s' }}>⭐</div>
        <div className="absolute top-2/3 right-1/3 text-2xl sparkle opacity-30" style={{ animationDelay: '1.5s' }}>✨</div>
        <div className="absolute bottom-1/4 right-1/4 text-2xl sparkle opacity-30" style={{ animationDelay: '0.5s' }}>💫</div>
        
        {/* Hearts scattered */}
        <div className="absolute top-20 right-1/4 text-4xl opacity-10 animate-float">💕</div>
        <div className="absolute bottom-40 left-1/4 text-3xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>💖</div>
        <div className="absolute top-1/2 right-1/3 text-3xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>💗</div>
      </div>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="animate-slide-up">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Wedding Memories 📸
            </h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <p className="text-gray-600 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-600 font-semibold text-sm">
                  {uploads.length}
                </span>
                beautiful moments shared
              </p>
              <button
                onClick={() => fetchUploads()}
                className="text-xs bg-violet-100 text-violet-600 px-3 py-1 rounded-full hover:bg-violet-200 transition-colors flex items-center gap-1"
                title="Refresh gallery"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Auto-refreshing
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all animate-slide-down"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-xl">+</span>
              Add Yours
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>

      {/* Gallery Grid */}
      {uploads.length === 0 ? (
        <div className="max-w-7xl mx-auto text-center py-20 animate-fade-in relative z-10">
          <div className="text-6xl mb-4 opacity-50">📸</div>
          <p className="text-2xl text-gray-400 mb-6">No memories yet</p>
          <Link
            href="/"
            className="group relative inline-block overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all"
          >
            <span className="relative z-10">Be the first to share! 📸</span>
            <div className="absolute inset-0 bg-gradient-to-r from-violet-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {uploads.map((upload, index) => {
            const colors = getCardColor(index)
            const rotation = getCardRotation(index)
            return (
              <div
                key={upload.id}
                className={`group relative cursor-pointer animate-scale-in ${rotation} hover:rotate-0 transition-all duration-300 hover:scale-110 hover:z-10`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(upload)}
              >
                {/* Polaroid/Scrapbook Card */}
                <div className={`bg-gradient-to-br ${colors.bg} p-4 shadow-xl hover:shadow-2xl transition-all rounded-lg border-4 ${colors.border}`}>
                  {/* Fun Decorative Tape */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/60 backdrop-blur-sm border-2 border-gray-200 shadow-md rotate-0 rounded" style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}></div>
                  
                  {/* Media Container */}
                  <div className="aspect-square bg-white shadow-inner relative overflow-hidden rounded">
                    {isVideo(upload.file_url) ? (
                      <>
                        <video
                          src={upload.file_url}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                          <div className="bg-white rounded-full p-4 group-hover:scale-110 group-hover:rotate-12 transition-all shadow-lg">
                            <svg className={`w-8 h-8 ${colors.accent}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={upload.file_url}
                        alt={upload.guest_name || 'Guest photo'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Handwritten-style Info */}
                  <div className="mt-4 space-y-2">
                    {upload.guest_name && (
                      <p className={`font-bold text-lg ${colors.accent} flex items-center gap-2`} style={{ fontFamily: 'cursive' }}>
                        <span className="text-2xl">✨</span>
                        {upload.guest_name}
                      </p>
                    )}
                    {upload.message && (
                      <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                        <p className="text-sm text-gray-700 line-clamp-2 italic">
                          "{upload.message}"
                        </p>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        📅 {new Date(upload.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className={`px-2 py-1 rounded-full bg-white/80 ${colors.accent} font-semibold`}>
                        #{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Fun Stickers/Emoji Decorations */}
                  <div className="absolute -top-2 -right-2 text-3xl animate-bounce" style={{ animationDuration: '2s', animationDelay: `${index * 0.1}s` }}>
                    {['❤️', '💕', '✨', '🎉', '💝', '🌟', '💖'][index % 7]}
                  </div>
                </div>

                {/* Shadow effect */}
                <div className="absolute inset-0 -z-10 bg-black/5 rounded-lg translate-y-2 translate-x-2"></div>
              </div>
            )
          })}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              <button
                onClick={() => handleDownload(selectedImage)}
                className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-violet-500 hover:text-white transition-all shadow-lg group"
                title="Download"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
              <button
                onClick={() => setSelectedImage(null)}
                className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-red-500 hover:text-white hover:rotate-90 transition-all shadow-lg"
              >
                ✕
              </button>
            </div>

            {/* Media */}
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              {isVideo(selectedImage.file_url) ? (
                <video
                  src={selectedImage.file_url}
                  controls
                  autoPlay
                  className="max-w-full max-h-[70vh]"
                />
              ) : (
                <img
                  src={selectedImage.file_url}
                  alt={selectedImage.guest_name || 'Guest photo'}
                  className="max-w-full max-h-[70vh] object-contain"
                />
              )}
            </div>

            {/* Details */}
            <div className="p-6 bg-gradient-to-br from-white to-gray-50">
              {selectedImage.guest_name && (
                <h3 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <span className="text-violet-500">👤</span>
                  {selectedImage.guest_name}
                </h3>
              )}
              {selectedImage.message && (
                <div className="bg-violet-50 border-l-4 border-violet-500 p-4 rounded-r-lg mb-4">
                  <p className="text-gray-700 italic">"{selectedImage.message}"</p>
                </div>
              )}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  {new Date(selectedImage.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
                <div className="text-xs text-gray-400 flex gap-2">
                  <span>← → Navigate</span>
                  <span>D Download</span>
                  <span>ESC Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
