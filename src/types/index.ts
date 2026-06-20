export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          password_hash: string
          avatar_url: string | null
          theme: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          password_hash: string
          avatar_url?: string | null
          theme?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          password_hash?: string
          avatar_url?: string | null
          theme?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string | null
          thumbnail: string | null
          category: string | null
          difficulty: string | null
          total_lessons: number
          estimated_hours: number
          instructor: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          thumbnail?: string | null
          category?: string | null
          difficulty?: string | null
          total_lessons?: number
          estimated_hours?: number
          instructor?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          thumbnail?: string | null
          category?: string | null
          difficulty?: string | null
          total_lessons?: number
          estimated_hours?: number
          instructor?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      lessons: {
        Row: {
          id: string
          course_id: string
          title: string
          lesson_number: number
          duration: number
          video_url: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          title: string
          lesson_number: number
          duration?: number
          video_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          title?: string
          lesson_number?: number
          duration?: number
          video_url?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_course_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          completed_lessons: number
          progress: number
          hours_learned: number
          last_lesson_id: string | null
          completed: boolean
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          completed_lessons?: number
          progress?: number
          hours_learned?: number
          last_lesson_id?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          completed_lessons?: number
          progress?: number
          hours_learned?: number
          last_lesson_id?: string | null
          completed?: boolean
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_lesson_progress: {
        Row: {
          id: string
          user_id: string
          lesson_id: string
          completed: boolean
          completed_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lesson_id: string
          completed?: boolean
          completed_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lesson_id?: string
          completed?: boolean
          completed_at?: string
        }
      }
      streaks: {
        Row: {
          id: string
          user_id: string
          current_streak: number
          best_streak: number
          last_activity_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          current_streak?: number
          best_streak?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          current_streak?: number
          best_streak?: number
          last_activity_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string | null
          icon_name: string | null
          created_at: string
        }
        Insert: {
          id: string
          title: string
          description?: string | null
          icon_name?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon_name?: string | null
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_id?: string
          unlocked_at?: string
        }
      }
      learning_activity: {
        Row: {
          id: string
          user_id: string
          activity_date: string
          minutes_learned: number
        }
        Insert: {
          id?: string
          user_id: string
          activity_date: string
          minutes_learned?: number
        }
        Update: {
          id?: string
          user_id?: string
          activity_date?: string
          minutes_learned?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type User = Database['public']['Tables']['users']['Row'];
export type DBCourse = Database['public']['Tables']['courses']['Row'];
export type Course = {
  id: string;
  user_id: string;
  course_id: string;
  progress: number;
  hours_learned: number;
  last_lesson?: string | null;
  updated_at: string;
  title: string;
  icon_name?: string;
  completed_lessons?: number;
  completed?: boolean;
  last_lesson_title?: string | null;
};
export type Lesson = Database['public']['Tables']['lessons']['Row'];
export type UserCourseProgress = Database['public']['Tables']['user_course_progress']['Row'];
export type UserLessonProgress = Database['public']['Tables']['user_lesson_progress']['Row'];
export type Streak = Database['public']['Tables']['streaks']['Row'];
export type Achievement = Database['public']['Tables']['achievements']['Row'];
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row'];
export type ActivityData = Database['public']['Tables']['learning_activity']['Row'];
