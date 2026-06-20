'use client'

import React from 'react'
import { LucideIcon } from 'lucide-react'
import { AnimatedCard } from '../shared/AnimatedCard'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  subtitle?: string
  delay?: number
}

function StatCardComponent({ title, value, icon: Icon, subtitle, delay }: StatCardProps) {
  return (
    <AnimatedCard className="p-6 flex flex-col justify-between min-h-[160px] col-span-1" delay={delay}>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.08]">
          <Icon className="w-5 h-5 text-cyan-500" />
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-4xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-[15px] font-medium text-zinc-400 mt-1">{title}</p>
        {subtitle && (
          <p className="text-sm font-medium text-zinc-600 mt-1">{subtitle}</p>
        )}
      </div>
    </AnimatedCard>
  )
}

export const StatCard = React.memo(StatCardComponent)
