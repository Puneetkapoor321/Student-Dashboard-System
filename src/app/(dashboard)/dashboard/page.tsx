import React, { Suspense } from "react"
import { BentoGrid } from "@/src/components/dashboard/BentoGrid"
import { createClient } from "@/src/lib/supabase/server"
import { User } from "@/src/types"
import { redirect } from "next/navigation"
import { getSession } from "@/src/lib/auth/session"
import { getOrSeedUserProgress, getOrSeedUserActivity } from "@/src/lib/utils/db"
import DashboardLoading from "./loading"

export const unstable_instant = {
  prefetch: 'static',
  unstable_disableValidation: true
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardLoading />}>
      <DashboardContent />
    </Suspense>
  )
}

async function DashboardContent() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

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

  // Fetch or seed user progress
  const courses = await getOrSeedUserProgress(supabase, user.id)

  // Fetch or seed user activity
  const activity = await getOrSeedUserActivity(supabase, user.id)

  return (
    <BentoGrid courses={courses} activity={activity} user={user} />
  )
}
