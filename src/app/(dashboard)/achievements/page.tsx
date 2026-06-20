import React, { Suspense } from "react"
import { Award, Flame, Zap, GraduationCap } from "lucide-react"
import { getSession } from "@/src/lib/auth/session"
import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
import { getOrSeedUserProgress, getOrSeedUserActivity } from "@/src/lib/utils/db"
import { AnimatedCard } from "@/src/components/shared/AnimatedCard"
import AchievementsLoading from "./loading"

export const unstable_instant = {
  prefetch: 'static',
  unstable_disableValidation: true
}

export default function AchievementsPage() {
  return (
    <Suspense fallback={<AchievementsLoading />}>
      <AchievementsContent />
    </Suspense>
  )
}

async function AchievementsContent() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Fetch metrics
  const courses = await getOrSeedUserProgress(supabase, session.user.id)
  const activity = await getOrSeedUserActivity(supabase, session.user.id)

  let streak = 0
  for (let i = activity.length - 1; i >= 0; i--) {
    if ((activity[i].minutes_learned || 0) > 0) streak++
    else break
  }

  // Calculate achievements
  const hasReactProgress = courses.some(c => c.course_id === 'react' && c.progress >= 50)
  const hasCompletedCourse = courses.some(c => c.progress === 100)
  const hasAnyProgress = courses.some(c => c.progress >= 25)

  const badges = [
    {
      title: "First Steps",
      desc: "Reached 25% progress in at least one course",
      unlocked: hasAnyProgress,
      icon: Award,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Daily Spark",
      desc: "Maintained a 3+ day learning streak",
      unlocked: streak >= 3,
      icon: Flame,
      color: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    },
    {
      title: "React Developer",
      desc: "Completed 50% or more of Advanced React Patterns",
      unlocked: hasReactProgress,
      icon: Zap,
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      title: "Course Graduate",
      desc: "Finished 100% of any subject in SkillUp",
      unlocked: hasCompletedCourse,
      icon: GraduationCap,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
  ]

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Milestones & Badges</h1>
        <p className="text-zinc-400">Unlock awards as you build consistent learning habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {badges.map((badge, i) => {
          const Icon = badge.icon
          return (
            <AnimatedCard key={badge.title} className="p-6 flex items-start gap-4" delay={i * 0.08}>
              <div className={`w-12 h-12 rounded-[14px] ${badge.color} border flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white truncate">{badge.title}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    badge.unlocked ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50'
                  }`}>
                    {badge.unlocked ? 'Unlocked' : 'Locked'}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-1">{badge.desc}</p>
              </div>
            </AnimatedCard>
          )
        })}
      </div>
    </div>
  )
}
