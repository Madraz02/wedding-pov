'use client'
import { useEffect } from 'react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'from-green-500 to-emerald-600',
    error: 'from-red-500 to-rose-600',
    info: 'from-blue-500 to-indigo-600'
  }

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ'
  }

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-down">
      <div className={`bg-gradient-to-r ${colors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-md`}>
        <div className="text-2xl font-bold bg-white/20 rounded-full w-10 h-10 flex items-center justify-center">
          {icons[type]}
        </div>
        <p className="font-semibold">{message}</p>
        <button
          onClick={onClose}
          className="ml-auto hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
