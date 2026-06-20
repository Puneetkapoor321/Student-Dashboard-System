import React, { Suspense } from "react"
import { CourseCard } from "@/src/components/dashboard/CourseCard"
import { getSession } from "@/src/lib/auth/session"
import { createClient } from "@/src/lib/supabase/server"
import { redirect } from "next/navigation"
import { getOrSeedUserProgress } from "@/src/lib/utils/db"
import CoursesLoading from "./loading"

export const unstable_instant = {
  prefetch: 'static',
  unstable_disableValidation: true
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesLoading />}>
      <CoursesContent />
    </Suspense>
  )
}

async function CoursesContent() {
  const session = await getSession()
  if (!session?.user) {
    redirect('/login')
  }

  const supabase = await createClient()

  // Fetch or seed user progress
  const courses = await getOrSeedUserProgress(supabase, session.user.id)

  return (
    <div className="w-full">
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl font-semibold text-white tracking-tight mb-2">Course Catalog</h1>
        <p className="text-zinc-400">
          Explore your active courses and track your learning progress.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="py-16 flex items-center justify-center border border-dashed border-white/[0.08] rounded-3xl text-zinc-500">
          No courses found. Please contact support or check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              delay={i * 0.08} 
            />
          ))}
        </div>
      )}
    </div>
  )
}
