'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import * as Icons from 'lucide-react'
import { Course } from '@/src/types'
import { AnimatedCard } from '../shared/AnimatedCard'
import { ProgressBar } from '../shared/ProgressBar'
import { ArrowDown } from 'lucide-react'

interface ActiveCoursesCardProps {
  courses: Course[]
  delay?: number
}

function ActiveCoursesCardComponent({ courses, delay }: ActiveCoursesCardProps) {
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay ? delay + 0.1 : 0.1
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  }

  return (
    <AnimatedCard className="p-6 md:p-8 flex flex-col col-span-1 lg:col-span-2 relative pb-10" delay={delay}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-[11px] font-bold text-zinc-500 tracking-wider uppercase">ACTIVE COURSES</h3>
        <a href="/courses" className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
          View all {'>'}
        </a>
      </div>

      <motion.div 
        className="flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {courses.length === 0 ? (
          <div className="py-12 flex items-center justify-center border border-dashed border-white/[0.08] rounded-xl text-zinc-500">
            No active courses. Time to start learning!
          </div>
        ) : (
          courses.map((course, i) => {
            const iconName = course.icon_name as keyof typeof Icons
            const IconComponent = (Icons[iconName] as React.ElementType) || Icons.BookOpen
            
            // Map color systems deterministically to course_id to match the visual theme in the design spec
            const courseThemes: Record<string, { icon: string; bg: string; bar: string }> = {
              supabase: { icon: 'text-emerald', bg: 'bg-emerald/10 border-emerald/20', bar: 'bg-emerald' },
              nextjs: { icon: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20', bar: 'bg-purple-500' },
              react: { icon: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20', bar: 'bg-amber-500' },
              motion: { icon: 'text-teal', bg: 'bg-teal/10 border-teal/20', bar: 'bg-teal' },
            }
            const color = courseThemes[course.course_id] || { icon: 'text-emerald', bg: 'bg-emerald/10 border-emerald/20', bar: 'bg-emerald' }

            return (
              <motion.div 
                key={course.id}
                variants={itemVariants}
                className="relative overflow-hidden flex items-center gap-4 bg-white/[0.02] border border-white/[0.04] p-4 rounded-2xl hover:bg-white/[0.04] transition-all group hover:scale-[1.01] will-change-transform"
              >
                {/* Subtle gradient mesh background */}
                <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full ${color.bg.split(' ')[0]} blur-2xl opacity-10 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none`} />
                
                <div className={`w-12 h-12 rounded-[14px] ${color.bg} border flex items-center justify-center flex-shrink-0 relative z-10`}>
                  <IconComponent className={`w-5 h-5 ${color.icon}`} />
                </div>
                
                <div className="flex-1 min-w-0 relative z-10">
                  <h4 className="text-white font-medium text-[15px] truncate mb-2">{course.title}</h4>
                  <ProgressBar 
                    progress={course.progress} 
                    barClassName={color.bar}
                    delay={delay ? delay + 0.3 + (i * 0.1) : 0.5}
                    className="h-1.5"
                  />
                </div>
                
                <div className="text-sm font-semibold text-zinc-500 w-10 text-right">
                  {course.progress}%
                </div>
              </motion.div>
            )
          })
        )}
      </motion.div>

      {/* Down arrow indicator button at the bottom center */}
      {courses.length > 0 && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/[0.08] flex items-center justify-center shadow-lg cursor-pointer hover:bg-white/[0.05] transition-colors">
          <ArrowDown className="w-4 h-4 text-zinc-500" />
        </div>
      )}
    </AnimatedCard>
  )
}

export const ActiveCoursesCard = React.memo(ActiveCoursesCardComponent)
