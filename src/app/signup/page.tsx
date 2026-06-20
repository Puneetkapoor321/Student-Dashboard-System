'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Eye, EyeOff } from 'lucide-react'
import { signup } from '@/src/lib/auth/actions'
import AuthLayout from '@/src/components/auth/AuthLayout'

export default function SignupPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    
    startTransition(async () => {
      const result = await signup(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    })
  }

  return (
    <AuthLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full p-8 rounded-3xl bg-[#0D0E12]/50 border border-white/[0.06] hover:border-cyan-500/20 focus-within:border-emerald-500/20 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] shadow-black backdrop-blur-xl relative z-10 transition-all duration-500"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-500 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Create an account</h1>
          <p className="text-sm text-zinc-400 mt-2 text-center">Join SkillUp today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Username</label>
            <input 
              type="text" 
              name="username"
              required
              className="w-full bg-[#0A0B0D]/50 border border-white/[0.06] rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 hover:border-white/[0.12] transition-all duration-300"
              placeholder="e.g. Alex1234"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'} 
                name="password"
                required
                className="w-full bg-[#0A0B0D]/50 border border-white/[0.06] rounded-xl px-4 py-3 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 hover:border-white/[0.12] transition-all duration-300"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">Confirm Password</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? 'text' : 'password'} 
                name="confirmPassword"
                required
                className="w-full bg-[#0A0B0D]/50 border border-white/[0.06] rounded-xl px-4 py-3 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/40 hover:border-white/[0.12] transition-all duration-300"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-emerald-500 hover:from-cyan-300 hover:to-emerald-400 text-zinc-950 font-semibold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] active:scale-[0.98] mt-6 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin text-zinc-950" /> : 'Create Account'}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
            Log in
          </a>
        </p>
      </motion.div>
    </AuthLayout>
  )
}
