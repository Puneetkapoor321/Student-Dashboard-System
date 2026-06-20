'use server'

import { createClient } from '@/src/lib/supabase/server'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { createSession, deleteSession, getSession } from './session'
import { type SupabaseClient } from '@supabase/supabase-js'

export async function login(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'Username and password are required' }
  }

  const supabase = (await createClient()) as unknown as SupabaseClient

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single()

  if (error || !data) {
    return { error: 'Invalid username or password' }
  }

  const user = data as unknown as { id: string, username: string, password_hash: string }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash)

  if (!isPasswordValid) {
    return { error: 'Invalid username or password' }
  }

  await createSession(user.id, user.username)

  return { success: true }
}

export async function signup(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!username || !password || !confirmPassword) {
    return { error: 'All fields are required' }
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' }
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters' }
  }

  const supabase = (await createClient()) as unknown as SupabaseClient

  // Check if username exists
  const { data: existingUser } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .single()

  if (existingUser) {
    return { error: 'Username already exists' }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const { data, error } = await supabase
    .from('users')
    .insert([
      { username, password_hash: passwordHash }
    ])
    .select('id, username')
    .single()

  if (error || !data) {
    return { error: 'Could not create account: ' + (error?.message || 'Unknown error') }
  }

  const newUser = data as unknown as { id: string, username: string }

  await createSession(newUser.id, newUser.username)

  return { success: true }
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}

export async function updateProfile(formData: FormData) {
  const username = formData.get('username') as string

  const session = await getSession()
  if (!session?.user) return { error: 'Not authenticated' }

  const supabase = (await createClient()) as unknown as SupabaseClient

  // Check if new username is already taken
  if (username && username !== session.user.username) {
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .single()

    if (existingUser) {
      return { error: 'Username already taken' }
    }
  }

  const updateData: { username?: string } = {}
  if (username) updateData.username = username

  if (Object.keys(updateData).length === 0) {
    return { success: true }
  }

  const { error: profileError } = await supabase
    .from('users')
    .update(updateData)
    .eq('id', session.user.id)

  if (profileError) {
    return { error: profileError.message }
  }

  // Update session cookie with new username if it changed
  if (username && username !== session.user.username) {
    await createSession(session.user.id, username)
  }

  return { success: true }
}
