import React from 'react'
import { Sidebar } from "@/src/components/layout/Sidebar"
import { BottomNav } from "@/src/components/layout/BottomNav"
import { TopNav } from "@/src/components/layout/TopNav"
import { getSession } from "@/src/lib/auth/session"
import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
import { User } from "@/src/types"
import { getOrSeedUserActivity } from "@/src/lib/utils/db"

export const unstable_instant = false

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Fetch user profile
  const { data: userProfile } = await supabase
    .from('users')
    .select('*')
    .eq('id', session.user.id)
    .single()

  if (!userProfile) {
    redirect('/login')
  }

  const user = userProfile as unknown as User

  // Fetch or seed user activity
  const activityData = await getOrSeedUserActivity(supabase, user.id)

  // Calculate day streak
  let streak = 0
  for (let i = activityData.length - 1; i >= 0; i--) {
    if ((activityData[i].minutes_learned || 0) > 0) streak++
    else break
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <Sidebar username={user.username} />
      
      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 pb-24 md:pb-6 md:p-8 lg:p-12 noise-bg relative z-10 scroll-smooth">
        <div className="max-w-[1400px] mx-auto w-full">
          <TopNav user={user} streak={streak} />
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
