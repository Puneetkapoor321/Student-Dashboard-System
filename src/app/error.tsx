'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] relative">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <AlertCircle className="w-8 h-8 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Application Error</h2>
        <p className="text-zinc-400 text-center max-w-md mb-8 leading-relaxed">
          We encountered an unexpected error while loading your dashboard. Please try again or contact support if the issue persists.
        </p>
        <button
          onClick={() => reset()}
          className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors active:scale-95 will-change-transform shadow-lg shadow-white/10"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
