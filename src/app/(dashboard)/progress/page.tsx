import React, { Suspense } from "react"
import { BarChart2, Clock, Calendar, CheckCircle2 } from "lucide-react"
import { getSession } from "@/src/lib/auth/session"
import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
import { getOrSeedUserProgress, getOrSeedUserActivity } from "@/src/lib/utils/db"
import { AnimatedCard } from "@/src/components/shared/AnimatedCard"
import ProgressLoading from "./loading"

export const unstable_instant = {
  prefetch: 'static',
  unstable_disableValidation: true
}

export default function ProgressPage() {
  return (
    <Suspense fallback={<ProgressLoading />}>
      <ProgressContent />
    </Suspense>
  )
}

async function ProgressContent() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Fetch data
  const courses = await getOrSeedUserProgress(supabase, session.user.id)
  const activity = await getOrSeedUserActivity(supabase, session.user.id)

  const totalHours = Math.round(activity.reduce((acc, curr) => acc + (curr.minutes_learned || 0) / 60, 0) * 10) / 10
  const activeDays = activity.filter(d => (d.minutes_learned || 0) > 0).length
  const averageMinutes = activeDays > 0 ? Math.round(activity.reduce((acc, curr) => acc + (curr.minutes_learned || 0), 0) / activeDays) : 0

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Learning Analytics</h1>
        <p className="text-zinc-400">Detailed overview of your progress and learning patterns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <AnimatedCard className="p-6 flex items-center gap-4" delay={0.0}>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
            <Clock className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">Total Learning Time</p>
            <p className="text-2xl font-bold text-white mt-1">{totalHours} Hours</p>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6 flex items-center gap-4" delay={0.08}>
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/20 flex items-center justify-center flex-shrink-0">
            <Calendar className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">Active Learning Days</p>
            <p className="text-2xl font-bold text-white mt-1">{activeDays} Days</p>
          </div>
        </AnimatedCard>

        <AnimatedCard className="p-6 flex items-center gap-4" delay={0.16}>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-zinc-500 font-medium">Daily Learning Average</p>
            <p className="text-2xl font-bold text-white mt-1">{averageMinutes} Mins</p>
          </div>
        </AnimatedCard>
      </div>

      {/* Detailed Course Progress */}
      <AnimatedCard className="p-6 md:p-8" delay={0.24}>
        <h3 className="text-lg font-medium text-white mb-6">Subject Breakdown</h3>
        <div className="divide-y divide-white/[0.04]">
          {courses.map((course) => (
            <div key={course.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 ${course.progress === 100 ? 'text-cyan-400' : 'text-zinc-500'}`} />
                <div>
                  <h4 className="text-white font-medium">{course.title}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Last Lesson: {course.last_lesson || 'None'}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-sm text-right">
                  <p className="font-semibold text-white">{course.hours_learned}h logged</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{course.progress}% completed</p>
                </div>
                <div className="w-24 h-[4px] bg-white/[0.05] rounded-full overflow-hidden hidden sm:block">
                  <div className={`h-full rounded-full ${
                    course.course_id === 'supabase' ? 'bg-emerald-500' :
                    course.course_id === 'nextjs' ? 'bg-purple-500' :
                    course.course_id === 'react' ? 'bg-amber-500' :
                    'bg-teal-500'
                  }`} style={{ width: `${course.progress}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedCard>
    </div>
  )
}
