'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, Flame, Target } from 'lucide-react'
import { AnimatedCard } from '../shared/AnimatedCard'

interface HeroTileProps {
  name: string
  streak: number
  activeCoursesCount: number
  delay?: number
}

function HeroTileComponent({ name, streak, activeCoursesCount, delay }: HeroTileProps) {
  // Get current date string e.g. "SATURDAY, JUN 20"
  const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()

  return (
    <AnimatedCard className="col-span-1 md:col-span-2 lg:col-span-2 p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[440px] relative overflow-hidden" delay={delay}>
      {/* Subtle emerald radial glow on the right */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-80" 
        style={{ 
          background: 'radial-gradient(circle at center right, rgba(16,185,129,0.12), transparent 70%)' 
        }} 
      />
      
      <div className="relative z-10 flex flex-col items-start gap-6 w-full">
        {/* Date Row */}
        <span className="text-xs font-bold text-zinc-500 tracking-wider">
          {dateStr}
        </span>

        {/* Streak Badge Row */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald/20 bg-emerald/10">
          <Flame className="w-3.5 h-3.5 text-emerald fill-emerald/20" />
          <span className="text-[10px] font-bold text-emerald tracking-wider uppercase">{streak} DAY STREAK</span>
        </div>

        {/* Large Welcome Heading */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay ? delay + 0.1 : 0.1, duration: 0.5 }}
          className="space-y-3"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            Welcome back, {name} 👋
          </h2>
          <p className="text-sm md:text-[15px] font-medium text-zinc-400 max-w-[600px]">
            Keep the momentum going — you&apos;re in the top 5% this week
          </p>
        </motion.div>
        
        {/* Active Courses Card */}
        <div className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.06] p-4 rounded-[18px] w-full max-w-[420px] hover:bg-white/[0.05] transition-colors mt-2">
          <div className="w-12 h-12 rounded-[14px] bg-emerald/10 border border-emerald/20 flex items-center justify-center flex-shrink-0">
            <Target className="w-5 h-5 text-emerald" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-0.5">Active Courses</span>
            <span className="text-[15px] font-bold text-white">{activeCoursesCount} Course{activeCoursesCount !== 1 ? 's' : ''} in Progress</span>
          </div>
        </div>
      </div>

      {/* Continue Learning Button */}
      <div className="relative z-10 mt-8">
        <button className="flex items-center gap-2 bg-transparent border border-emerald/30 text-emerald hover:bg-emerald/5 transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-sm active:scale-95 will-change-transform shadow-lg shadow-black/20">
          <Play className="w-4 h-4 text-emerald fill-emerald" />
          Continue Learning
        </button>
      </div>
    </AnimatedCard>
  )
}

export const HeroTile = React.memo(HeroTileComponent)
