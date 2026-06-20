'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { User } from '@/src/types'
import { User as UserIcon, Mail, Lock, Monitor, CheckCircle2, Loader2 } from 'lucide-react'
import { updateProfile } from '@/src/lib/auth/actions'

export function ProfileForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null)

  const handleUpdate = async (formData: FormData) => {
    setMessage(null)
    startTransition(async () => {
      const result = await updateProfile(formData)
      if (result.error) {
        setMessage({ type: 'error', text: result.error })
      } else {
        setMessage({ type: 'success', text: 'Profile updated successfully' })
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <form action={handleUpdate} className="bg-surface/50 border border-white/[0.04] rounded-3xl p-6 relative overflow-hidden group">
        <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-cyan-400" />
          Personal Information
        </h3>
        
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-zinc-400">Username</label>
            <input 
              type="text" 
              name="username"
              defaultValue={user.username || ''}
              className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
            />
          </div>
          {message && (
            <div className={`p-3 rounded-lg text-sm border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'}`}>
              {message.text}
            </div>
          )}
          
          <button 
            type="submit"
            disabled={isPending}
            className="mt-4 w-full md:w-auto px-6 py-3 bg-cyan-500/10 text-cyan-400 font-medium rounded-xl hover:bg-cyan-500/20 transition-colors border border-cyan-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Changes'}
          </button>
        </div>
      </form>

      {/* Security */}
      <div className="bg-surface/50 border border-white/[0.04] rounded-3xl p-6 relative overflow-hidden group">
        <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5 text-purple-400" />
          Security
        </h3>
        
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-zinc-400">New Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            />
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-purple-500/10 text-purple-400 font-medium rounded-xl hover:bg-purple-500/20 transition-colors border border-purple-500/20">
            Change Password
          </button>
        </div>
      </div>

    </div>
  )
}
