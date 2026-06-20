'use client'

import { Search, Bell, Flame } from 'lucide-react'
import { User } from '@/src/types'
import Image from 'next/image'

interface TopNavProps {
  user: User | null
  streak: number
}

export function TopNav({ user, streak }: TopNavProps) {
  return (
    <div className="flex items-center justify-between w-full mb-8 pt-2">
      <div className="w-1" />

      {/* Right: Search, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-4 w-full justify-end">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-zinc-500" />
          </div>
          <input
            type="text"
            className="block w-80 lg:w-96 pl-11 pr-4 py-2.5 border border-white/[0.06] rounded-full leading-5 bg-white/[0.02] text-zinc-300 placeholder-zinc-500 focus:outline-none focus:bg-white/[0.03] focus:ring-2 focus:ring-emerald/20 transition-all sm:text-sm"
            placeholder="Search courses..."
          />
        </div>

        {/* Notifications */}
        <button className="p-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald" />
        </button>

        {/* Streak Pill */}
        <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-white/[0.06] bg-white/[0.02]">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold text-zinc-400">{streak} day streak</span>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] cursor-pointer transition-colors">
          {user?.avatar_url ? (
            <Image src={user.avatar_url} alt={user.username} width={20} height={20} className="w-5 h-5 rounded-full object-cover" unoptimized />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          )}
          <span className="text-sm font-medium text-zinc-300">{user?.username || 'Guest'}</span>
        </div>
      </div>
    </div>
  )
}
