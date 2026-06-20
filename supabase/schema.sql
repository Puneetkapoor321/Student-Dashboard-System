-- Production Database Schema for SkillUp Learning Platform

-- 1. Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    avatar_url TEXT,
    theme TEXT DEFAULT 'dark',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create courses table
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY, -- course slug (e.g. 'react', 'nextjs', 'supabase', 'motion')
    title TEXT NOT NULL,
    description TEXT,
    thumbnail TEXT,
    category TEXT,
    difficulty TEXT,
    total_lessons INTEGER DEFAULT 0,
    estimated_hours INTEGER DEFAULT 0,
    instructor TEXT,
    status TEXT DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create lessons table
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    lesson_number INTEGER NOT NULL,
    duration INTEGER DEFAULT 0, -- in minutes
    video_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, lesson_number)
);

-- 4. Create user_course_progress table
CREATE TABLE IF NOT EXISTS public.user_course_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    course_id TEXT REFERENCES public.courses(id) ON DELETE CASCADE,
    completed_lessons INTEGER DEFAULT 0,
    progress INTEGER DEFAULT 0, -- completed_lessons * 100 / total_lessons
    hours_learned DECIMAL DEFAULT 0,
    last_lesson_id UUID REFERENCES public.lessons(id) ON DELETE SET NULL,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- 5. Create user_lesson_progress table
CREATE TABLE IF NOT EXISTS public.user_lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- 6. Create streaks table
CREATE TABLE IF NOT EXISTS public.streaks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    current_streak INTEGER DEFAULT 0,
    best_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create achievements table
CREATE TABLE IF NOT EXISTS public.achievements (
    id TEXT PRIMARY KEY, -- slug (e.g. 'first_lesson', 'streak_3', 'streak_7', 'streak_30', 'course_master', 'hours_100')
    title TEXT NOT NULL,
    description TEXT,
    icon_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Create user_achievements table
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    achievement_id TEXT REFERENCES public.achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- 9. Create learning_activity table
CREATE TABLE IF NOT EXISTS public.learning_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    activity_date DATE NOT NULL,
    minutes_learned INTEGER DEFAULT 0,
    UNIQUE(user_id, activity_date)
);

-- Disable Row Level Security (RLS) for serverless access ease
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_course_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_lesson_progress DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.streaks DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_activity DISABLE ROW LEVEL SECURITY;

-- -------------------------------------------------------------
-- Seed Global Data (Courses, Lessons, Achievements)
-- -------------------------------------------------------------

-- Seed Courses
INSERT INTO public.courses (id, title, description, category, difficulty, total_lessons, estimated_hours, instructor, status) VALUES
('react', 'Advanced React Patterns', 'Master advanced patterns like Compound Components, Control Props, Render Props, and Custom Hooks to write reusable React code.', 'Frontend', 'Advanced', 16, 8, 'Sarah Jenkins', 'active'),
('nextjs', 'Next.js App Router', 'Deep dive into Server Components, Layouts, Streaming, Server Actions, route prefetching and optimization.', 'Fullstack', 'Intermediate', 12, 6, 'David Miller', 'active'),
('supabase', 'Supabase Backend', 'Build secure backends using Postgres, Row Level Security (RLS) policies, Realtime triggers, and Auth.', 'Backend', 'Intermediate', 10, 5, 'Alex River', 'active'),
('motion', 'UI/UX Motion Design', 'Create premium 60fps micro-interactions and transitions using Framer Motion layoutId and physics.', 'Design', 'Beginner', 8, 4, 'Emma Stone', 'active')
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  total_lessons = EXCLUDED.total_lessons,
  estimated_hours = EXCLUDED.estimated_hours,
  instructor = EXCLUDED.instructor;

-- Seed Achievements
INSERT INTO public.achievements (id, title, description, icon_name) VALUES
('first_lesson', 'First Steps', 'Completed your first lesson in SkillUp', 'Award'),
('streak_3', 'Daily Spark', 'Maintained a 3+ day learning streak', 'Flame'),
('streak_7', 'Weekly Warrior', 'Maintained a 7+ day learning streak', 'Zap'),
('streak_30', 'Learning Titan', 'Maintained a 30+ day learning streak', 'Star'),
('course_master', 'Course Graduate', 'Finished 100% of any subject in SkillUp', 'GraduationCap'),
('hours_100', 'Century Club', 'Logged 100+ hours of learning time', 'Trophy')
ON CONFLICT (id) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  icon_name = EXCLUDED.icon_name;

-- Seed Lessons for React
INSERT INTO public.lessons (course_id, title, lesson_number, duration, video_url, notes) VALUES
('react', 'Course Introduction', 1, 10, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Welcome to Advanced React Patterns\n\nIn this course, we will explore patterns used by top frontend teams to build highly customizable component libraries.'),
('react', 'The Compound Components Pattern', 2, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Compound Components\n\nCompound components allow you to write components that share state implicitly and cooperate together.\n\n### Example:\n\n```tsx\n<Select>\n  <Select.Option>Option 1</Select.Option>\n</Select>\n```'),
('react', 'Compound Components Context API', 3, 15, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Compound Components with Context\n\nUsing React Context to share state between the parent and child options without drilling props.'),
('react', 'The Control Props Pattern', 4, 22, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Control Props\n\nAllows users of your components to override internal state control, similar to how standard `<input value={val} onChange={fn} />` works.'),
('react', 'Custom Hooks for State Management', 5, 20, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Custom Hooks\n\nExtracting stateful logic from components into isolated, testable React Hooks.'),
('react', 'The Props Collection Pattern', 6, 12, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Props Collection\n\nGrouping common attributes/props together into a single object to simplify spread calls on elements.'),
('react', 'The Prop Getters Pattern', 7, 16, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Prop Getters\n\nEnhancing props collections by passing getters (functions) to support custom callbacks on spread props.'),
('react', 'The State Reducer Pattern', 8, 25, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# State Reducers\n\nInversion of control pattern that lets users pass a reducer function to alter how state changes inside a component.'),
('react', 'Higher Order Components (HOC) Legacy', 9, 14, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# HOCs\n\nUnderstanding higher-order components, their composition benefits, and why hooks replaced most of them.'),
('react', 'Render Props Pattern', 10, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Render Props\n\nPassing a function as a children prop to share state dynamically at render time.'),
('react', 'React.memo & Performance Tuning', 11, 20, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Performance Tuning\n\nUsing `React.memo`, `useMemo`, and `useCallback` to avoid wasted rendering cycles.'),
('react', 'Concurrent Rendering Deep Dive', 12, 19, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Concurrent React\n\nDeep dive into `useTransition`, `useDeferredValue`, and non-blocking rendering.'),
('react', 'Custom Hooks Deep Dive', 13, 24, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Advanced Custom Hooks\n\nDesigning custom hooks with complex ref, event listeners, and cancellation tokens.'),
('react', 'React Context Optimization', 14, 15, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Context Performance\n\nSplitting state context and dispatch context to avoid re-rendering consumers needlessly.'),
('react', 'Portals & Overlay Architecture', 15, 17, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# React Portals\n\nRendering elements outside the DOM hierarchy, ideal for Modals, Tooltips, and Dropdowns.'),
('react', 'Final Capstone Project', 16, 30, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Capstone Project\n\nBuild a production-ready accordion library using all the patterns learned.')
ON CONFLICT (course_id, lesson_number) DO NOTHING;

-- Seed Lessons for NextJS
INSERT INTO public.lessons (course_id, title, lesson_number, duration, video_url, notes) VALUES
('nextjs', 'Introduction to nextjs app router', 1, 12, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Next.js App Router\n\nWelcome to Next.js App Router course!'),
('nextjs', 'Server Components vs Client Components', 2, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Server vs Client\n\nUnderstanding data fetching and hydration differences.'),
('nextjs', 'File-System Routing & Special Files', 3, 14, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Layouts & Routing\n\nLearning `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`.'),
('nextjs', 'Data Fetching with Server Components', 4, 20, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Server Fetching\n\nFetching data directly in server components using async/await.'),
('nextjs', 'Static and Dynamic Rendering', 5, 15, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Rendering Modes\n\nForce static (`force-static`) or dynamic (`force-dynamic`) routes.'),
('nextjs', 'Streaming and Suspense', 6, 22, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Streaming\n\nIncremental streaming of page content using React Suspense boundaries.'),
('nextjs', 'Server Actions and Mutations', 7, 25, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Server Actions\n\nExecuting secure database writes directly from client triggers without separate API endpoints.'),
('nextjs', 'Optimistic Updates & Forms', 8, 16, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Optimistic UI\n\nUsing `useOptimistic` to show immediate visual updates during form submission.'),
('nextjs', 'Caching and Revalidation', 9, 21, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Caching\n\nConfiguring `revalidateTag` and `revalidatePath` to refresh data dynamically.'),
('nextjs', 'unstable_instant Route Prefetch', 10, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Instant Navigation\n\nPrefetching page components using `unstable_instant` layouts for 60fps route switching.'),
('nextjs', 'Middleware and Edge runtime', 11, 15, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Middleware\n\nHandling redirects, headers, and authentication at the Edge.'),
('nextjs', 'Optimizing Fonts, Images and Scripts', 12, 14, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Production Tuning\n\nConfiguring Next.js Image component, font preloading, and third-party scripts.')
ON CONFLICT (course_id, lesson_number) DO NOTHING;

-- Seed Lessons for Supabase
INSERT INTO public.lessons (course_id, title, lesson_number, duration, video_url, notes) VALUES
('supabase', 'Getting Started with Supabase', 1, 10, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Intro to Supabase\n\nLearn how to create a new project and connect Postgres.'),
('supabase', 'Postgres Schema Design & Relationships', 2, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# DB Design\n\nDesigning foreign keys, indexes, and cascades.'),
('supabase', 'Row Level Security Policies', 3, 22, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# RLS Policies\n\nCreating policies to restrict user access: `CREATE POLICY ON SELECT USING...`'),
('supabase', 'Supabase Auth Integration', 4, 15, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Auth\n\nIntegrating OAuth providers and email authentication.'),
('supabase', 'Database Triggers & Functions', 5, 25, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Triggers\n\nCreating PL/pgSQL functions that automatically trigger on new user signups.'),
('supabase', 'Realtime Subscriptions', 6, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Realtime\n\nListening to database modifications on the client in real-time.'),
('supabase', 'Supabase Storage Buckets', 7, 12, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Storage\n\nSetting up public/private buckets, file uploads, and policy security.'),
('supabase', 'Supabase Edge Functions', 8, 20, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Edge Functions\n\nWriting Serverless Deno functions for Stripe payments or email alerts.'),
('supabase', 'Row Level Security Deep Dive', 9, 16, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Advanced RLS\n\nWriting complex helper functions for cross-table checking in RLS.'),
('supabase', 'Supabase Cache & Performance Tuning', 10, 14, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Performance\n\nAnalyzing query performance, adding composite indexes, and managing pooler connections.')
ON CONFLICT (course_id, lesson_number) DO NOTHING;

-- Seed Lessons for Motion
INSERT INTO public.lessons (course_id, title, lesson_number, duration, video_url, notes) VALUES
('motion', 'Framer Motion Installation & Setup', 1, 8, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Motion Design\n\nLearn how to configure framer-motion in React.'),
('motion', 'Animate Presence & Exit Animations', 2, 15, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Exit Animations\n\nAnimating items out of the DOM using `<AnimatePresence>`.'),
('motion', 'Framer Motion LayoutId', 3, 20, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Shared Layouts\n\nCreating smooth transitions between sibling elements using `layoutId`.'),
('motion', 'Spring Physical Parameters', 4, 18, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Spring Physics\n\nTuning stiffness, damping, mass, and velocity for natural movement.'),
('motion', 'Gestures & Hover Micro-Interactions', 5, 12, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Gestures\n\nConfiguring `whileHover`, `whileTap`, `whileDrag` inputs.'),
('motion', 'Scroll Animations & Scroll Progress', 6, 22, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Scroll Animations\n\nCreating parallax effects and progress bars using `useScroll`.'),
('motion', 'Staggered Lists & Layout Animations', 7, 16, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# Staggering\n\nAnimating lists sequentially using variants staggerChildren.'),
('motion', 'Advanced SVG Animations', 8, 25, 'https://www.youtube.com/embed/dQw4w9WgXcQ', '# SVG Animations\n\nAnimating strokeDasharray, pathLength, and morphing curves.')
ON CONFLICT (course_id, lesson_number) DO NOTHING;
