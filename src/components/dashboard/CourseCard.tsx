'use client'

import React from 'react'
import * as Icons from 'lucide-react'
import { Course } from '@/src/types'
import { AnimatedCard } from '../shared/AnimatedCard'
import { ProgressBar } from '../shared/ProgressBar'

interface CourseCardProps {
  course: Course
  delay?: number
}

function CourseCardComponent({ course, delay }: CourseCardProps) {
  // Dynamically resolve icon from Lucide, falling back to BookOpen
  const iconName = (course.icon_name || 'BookOpen') as keyof typeof Icons
  const IconComponent = (Icons[iconName] as React.ElementType) || Icons.BookOpen

  // Deterministic course themes
  const courseThemes: Record<string, { icon: string; bg: string; bar: string; glow: string }> = {
    supabase: { icon: 'text-emerald', bg: 'bg-emerald/10 border-emerald/20', bar: 'bg-emerald', glow: 'from-emerald/5 via-transparent to-transparent' },
    nextjs: { icon: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', bar: 'bg-purple-500', glow: 'from-purple-500/5 via-transparent to-transparent' },
    react: { icon: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20', bar: 'bg-amber-500', glow: 'from-amber-500/5 via-transparent to-transparent' },
    motion: { icon: 'text-teal', bg: 'bg-teal/10 border-teal/20', bar: 'bg-teal', glow: 'from-teal/5 via-transparent to-transparent' },
  }
  const theme = courseThemes[course.course_id] || { icon: 'text-emerald', bg: 'bg-emerald/10 border-emerald/20', bar: 'bg-emerald', glow: 'from-emerald/5 via-transparent to-transparent' }

  return (
    <AnimatedCard className="p-7 flex flex-col justify-between min-h-[220px]" delay={delay}>
      {/* Background Gradient Mesh */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} pointer-events-none z-0 opacity-50`} />
      
      <div className="flex items-start justify-between mb-4 relative z-10 w-full">
        <div className={`w-12 h-12 rounded-[14px] ${theme.bg} flex items-center justify-center border relative z-10`}>
          <IconComponent className={`w-5 h-5 ${theme.icon}`} />
        </div>
        <span className="text-xl font-bold text-white tracking-tight">{course.progress}%</span>
      </div>
      
      <div className="relative z-10 mt-auto w-full">
        <h3 className="text-[16px] font-semibold text-white mb-3 line-clamp-1">{course.title}</h3>
        <ProgressBar progress={course.progress} barClassName={theme.bar} />
      </div>
    </AnimatedCard>
  )
}

export const CourseCard = React.memo(CourseCardComponent)
