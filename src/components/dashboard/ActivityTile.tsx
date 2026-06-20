'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ActivityData } from '@/src/types'
import { AnimatedCard } from '../shared/AnimatedCard'
import { Flame } from 'lucide-react'

interface ActivityTileProps {
  data: ActivityData[]
  streak: number
  delay?: number
}

function ActivityTileComponent({ data, streak, delay }: ActivityTileProps) {
  const totalHours = React.useMemo(() => {
    return Math.round(data.reduce((acc, curr) => acc + (curr.minutes_learned || 0) / 60, 0) * 10) / 10
  }, [data])

  const totalSessions = React.useMemo(() => {
    return data.filter(d => (d.minutes_learned || 0) > 0).length
  }, [data])

  // Create an 84-day grid (12 weeks x 7 days)
  const daysInGrid = 84;
  
  // Create a map of existing data by index from the end
  const gridData = React.useMemo(() => {
    return Array.from({ length: daysInGrid }).map((_, i) => {
      const dataIndex = data.length - (daysInGrid - i);
      if (dataIndex >= 0 && dataIndex < data.length) {
        return data[dataIndex];
      }
      return { minutes_learned: 0, activity_date: '' } as ActivityData;
    });
  }, [data]);

  const dayLabels = React.useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);

  const heatmapVariants = React.useMemo(() => ({
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 20, delay: delay || 0.1 } }
  }), [delay])

  return (
    <AnimatedCard className="p-6 flex flex-col col-span-1 lg:row-span-2 min-h-[320px]" delay={delay}>
      {/* Day Streak Flame Badge */}
      <div className="flex flex-col items-center justify-center text-center mt-2 mb-8 relative">
        <div className="relative group">
          {/* SVG Definitions for Linear Gradient */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="flame-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#14B8A6" />
              </linearGradient>
            </defs>
          </svg>
          {/* Flame glowing background */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald/35 to-teal/35 blur-xl rounded-full opacity-70 pointer-events-none" />
          <Flame className="w-20 h-20 relative z-10 animate-pulse" style={{ stroke: 'url(#flame-gradient)', fill: 'url(#flame-gradient)', fillOpacity: 0.1 }} />
        </div>
        <div className="text-4xl font-extrabold text-white mt-4 tracking-tight">{streak}</div>
        <div className="text-sm font-semibold text-white mt-1">Day Streak</div>
        <div className="text-xs text-emerald font-medium mt-1">Personal best: {streak} days</div>
      </div>
      
      {/* Heatmap Grid */}
      <motion.div 
        className="grid grid-cols-[28px_repeat(12,_1fr)] gap-1.5 mb-6 items-center"
        variants={heatmapVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {dayLabels.map((label, d) => (
          <React.Fragment key={label}>
            {/* Day Label */}
            <div className="text-[10px] text-zinc-500 font-semibold select-none">{label}</div>
            
            {/* 12 Weeks of blocks */}
            {Array.from({ length: 12 }).map((_, w) => {
              const dayIndex = w * 7 + d;
              const day = gridData[dayIndex];
              
              let bgClass = "bg-white/[0.02] border-white/[0.04]"
              
              if (day && day.minutes_learned > 0) {
                const hours = day.minutes_learned / 60;
                if (hours > 0 && hours <= 1) {
                  bgClass = "bg-teal/20 border-teal/30"
                } else if (hours > 1 && hours <= 2.5) {
                  bgClass = "bg-teal/45 border-teal/50"
                } else if (hours > 2.5 && hours <= 4.5) {
                  bgClass = "bg-teal/70 border-teal/80"
                } else {
                  bgClass = "bg-teal border-teal shadow-[0_0_8px_rgba(20,184,166,0.3)]"
                }
              }

              return (
                <div 
                  key={w} 
                  className="relative aspect-square transition-transform duration-150 hover:scale-115 hover:z-10 will-change-transform"
                >
                  <div className={`w-full h-full rounded-[4px] border ${bgClass} transition-colors duration-300`} />
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Metrics Section */}
      <div className="grid grid-cols-2 gap-4 border-t border-white/[0.05] pt-4 mb-4 mt-2">
        <div>
          <div className="text-xl font-bold text-white tracking-tight">{totalHours}h</div>
          <div className="text-xs text-zinc-500 font-medium">Total Learned</div>
        </div>
        <div>
          <div className="text-xl font-bold text-white tracking-tight">{totalSessions}</div>
          <div className="text-xs text-zinc-500 font-medium">Learning Sessions</div>
        </div>
      </div>

      {/* Legend Capsule */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-xs text-zinc-500 mr-1 select-none">Less</span>
        <div className="w-3 h-3 rounded-[3px] border bg-white/[0.02] border-white/[0.04]" />
        <div className="w-3 h-3 rounded-[3px] border bg-teal/20 border-teal/30" />
        <div className="w-3 h-3 rounded-[3px] border bg-teal/45 border-teal/50" />
        <div className="w-3 h-3 rounded-[3px] border bg-teal/70 border-teal/80" />
        <div className="w-3 h-3 rounded-[3px] border bg-teal border-teal shadow-[0_0_8px_rgba(20,184,166,0.3)]" />
        <span className="text-xs text-zinc-500 ml-1 select-none">More</span>
      </div>
    </AnimatedCard>
  )
}

export const ActivityTile = React.memo(ActivityTileComponent)
