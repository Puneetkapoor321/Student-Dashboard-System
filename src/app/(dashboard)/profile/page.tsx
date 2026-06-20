import React, { Suspense } from "react"
import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
import { ProfileForm } from "./ProfileForm"
import { User } from "@/src/types"
import { getSession } from "@/src/lib/auth/session"
import { getOrSeedUserActivity } from "@/src/lib/utils/db"
import ProfileLoading from "./loading"

export const metadata = {
  title: 'Profile - SkillUp',
  description: 'Manage your account and profile settings',
}

export const unstable_instant = {
  prefetch: 'static',
  unstable_disableValidation: true
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  )
}

async function ProfileContent() {
  const session = await getSession()
  if (!session?.user) redirect('/login')

  const supabase = await createClient()

  // Fetch complete user profile
  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (!userProfile) {
    redirect('/login')
  }

  const user = userProfile as unknown as User

  // Fetch learning stats
  const { count: activeCourses } = await supabase
    .from('user_progress')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const activityData = await getOrSeedUserActivity(supabase, user.id)

  // Calculate stats
  const hoursLearned = activityData?.reduce((sum, day) => sum + ((day.minutes_learned || 0) / 60), 0) || 0
  const totalHours = Math.round(hoursLearned * 10) / 10
  
  let streak = 0
  for (let i = activityData.length - 1; i >= 0; i--) {
    if ((activityData[i].minutes_learned || 0) > 0) streak++
    else break
  }

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Profile & Settings</h1>
        <p className="text-zinc-400">Manage your account information and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileForm user={user} />
        </div>
        
        <div className="space-y-6">
          {/* Learning Statistics Card */}
          <div className="bg-surface/50 border border-white/[0.04] rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <h3 className="text-lg font-medium text-white mb-6">Learning Statistics</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm text-zinc-500 mb-1">Active Courses</p>
                <div className="text-3xl font-semibold text-white">{activeCourses || 0}</div>
              </div>
              
              <div>
                <p className="text-sm text-zinc-500 mb-1">Hours Learned</p>
                <div className="text-3xl font-semibold text-white">{totalHours}h</div>
              </div>
              
              <div>
                <p className="text-sm text-zinc-500 mb-1">Current Streak</p>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-semibold text-cyan-400">{streak}</div>
                  <span className="text-cyan-400/70 text-sm font-medium">Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
