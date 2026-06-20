'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, Flame } from 'lucide-react'
import { HeroTile } from './HeroTile'
import { StatCard } from './StatCard'
import { ActivityTile } from './ActivityTile'
import { ActiveCoursesCard } from './ActiveCoursesCard'
import { Course, ActivityData, User } from '@/src/types'

interface BentoGridProps {
  courses: Course[]
  activity: ActivityData[]
  user: User
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
}

export function BentoGrid({ courses, activity, user }: BentoGridProps) {
  const totalHours = React.useMemo(() => {
    return Math.round(activity.reduce((acc, curr) => acc + (curr.minutes_learned || 0) / 60, 0) * 10) / 10
  }, [activity])

  const streak = React.useMemo(() => {
    let streakCount = 0
    for (let i = activity.length - 1; i >= 0; i--) {
      if ((activity[i].minutes_learned || 0) > 0) streakCount++
      else break
    }
    return streakCount
  }, [activity])

  return (
    <motion.section 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* 
        Sequential entry delays (0.08s step):
        1. Hero Tile: 0.00s
        2. Activity Tile: 0.08s
        3. Course Cards (ActiveCoursesCard): 0.16s
        4. Stats Cards: 0.24s, 0.32s, 0.40s
      */}
      <HeroTile name={user.username} streak={streak} activeCoursesCount={courses.length} delay={0.0} />
      <ActivityTile data={activity} streak={streak} delay={0.08} />
      <ActiveCoursesCard courses={courses} delay={0.16} />
      
      <StatCard title="Active Courses" value={courses.length} icon={BookOpen} subtitle="+1 this month" delay={0.24} />
      <StatCard title="Hours Learned" value={totalHours} icon={Clock} subtitle="↑ 18h this week" delay={0.32} />
      <StatCard title="Day Streak" value={streak} icon={Flame} subtitle="Personal best!" delay={0.40} />
    </motion.section>
  )
}
