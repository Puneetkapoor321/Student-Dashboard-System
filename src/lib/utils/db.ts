import { SupabaseClient } from '@supabase/supabase-js'
import { Course, ActivityData } from '@/src/types'

export const COURSE_DETAILS: Record<string, { title: string; icon_name: string }> = {
  react: { title: 'Advanced React Patterns', icon_name: 'Code' },
  motion: { title: 'UI/UX Motion Design', icon_name: 'Rocket' },
  nextjs: { title: 'Next.js App Router', icon_name: 'BookOpen' },
  supabase: { title: 'Supabase Backend', icon_name: 'Database' },
}

export async function getOrSeedUserProgress(
  supabase: SupabaseClient,
  userId: string
): Promise<Course[]> {
  // Try to fetch progress from database
  const { data: progressData, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching user progress:', error)
    return []
  }

  // If progress already exists, map and return it
  if (progressData && progressData.length > 0) {
    return progressData.map((item) => ({
      ...item,
      title: COURSE_DETAILS[item.course_id]?.title || item.course_id,
      icon_name: COURSE_DETAILS[item.course_id]?.icon_name || 'BookOpen',
    }))
  }

  // Otherwise, insert seed progress
  const defaultCourses = [
    { user_id: userId, course_id: 'react', progress: 75, hours_learned: 18, last_lesson: 'Custom Hooks Deep Dive' },
    { user_id: userId, course_id: 'motion', progress: 40, hours_learned: 10, last_lesson: 'Framer Motion LayoutId' },
    { user_id: userId, course_id: 'nextjs', progress: 90, hours_learned: 24, last_lesson: 'unstable_instant Route Prefetch' },
    { user_id: userId, course_id: 'supabase', progress: 25, hours_learned: 6, last_lesson: 'Row Level Security Policies' },
  ]

  const { data: insertedData, error: insertError } = await supabase
    .from('user_progress')
    .insert(defaultCourses)
    .select('*')

  if (insertError) {
    console.error('Error seeding user progress:', insertError)
    // Fallback mapping if database insert fails
    return defaultCourses.map((c, i) => ({
      id: `fallback-id-${i}`,
      user_id: userId,
      course_id: c.course_id,
      progress: c.progress,
      hours_learned: c.hours_learned,
      last_lesson: c.last_lesson,
      updated_at: new Date().toISOString(),
      title: COURSE_DETAILS[c.course_id].title,
      icon_name: COURSE_DETAILS[c.course_id].icon_name,
    }))
  }

  return (insertedData || []).map((item) => ({
    ...item,
    title: COURSE_DETAILS[item.course_id]?.title || item.course_id,
    icon_name: COURSE_DETAILS[item.course_id]?.icon_name || 'BookOpen',
  }))
}

export async function getOrSeedUserActivity(
  supabase: SupabaseClient,
  userId: string
): Promise<ActivityData[]> {
  // Fetch activity
  const { data: activityData, error } = await supabase
    .from('user_activity')
    .select('*')
    .eq('user_id', userId)
    .order('activity_date', { ascending: true })
    .limit(84)

  if (error) {
    console.error('Error fetching user activity:', error)
    return []
  }

  if (activityData && activityData.length > 0) {
    return activityData
  }

  // Seed activity data for the last 84 days
  const activityInserts = []
  for (let i = 83; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateString = date.toISOString().split('T')[0]

    // Generate deterministic minutes learned to create a nice gradient heatmap
    let minutes = 0
    if (i % 7 === 0) {
      minutes = 0 // rest day
    } else if (i % 3 === 0) {
      minutes = 90 // medium active (1.5h)
    } else if (i % 4 === 0) {
      minutes = 240 // highly active (4h)
    } else if (i % 5 === 0) {
      minutes = 310 // extremely active (5.1h)
    } else {
      minutes = 50 // active (0.8h)
    }

    activityInserts.push({
      user_id: userId,
      activity_date: dateString,
      minutes_learned: minutes,
    })
  }

  const { data: insertedActivity, error: insertError } = await supabase
    .from('user_activity')
    .insert(activityInserts)
    .select('*')

  if (insertError) {
    console.error('Error seeding user activity:', insertError)
    // Return local fallback list if DB insert fails
    return activityInserts.map((act, i) => ({
      id: `fallback-act-id-${i}`,
      user_id: userId,
      activity_date: act.activity_date,
      minutes_learned: act.minutes_learned,
    }))
  }

  return insertedActivity || []
}
