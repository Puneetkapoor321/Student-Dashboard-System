'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, TrendingUp, Trophy, User } from 'lucide-react'
import { cn } from '@/src/lib/utils/cn'

const NAV = [
  { href: '/dashboard',      icon: Home,       label: 'Home' },
  { href: '/courses',        icon: BookOpen,   label: 'Courses'   },
  { href: '/progress',       icon: TrendingUp, label: 'Progress'  },
  { href: '/achievements',   icon: Trophy,     label: 'Awards'  },
  { href: '/profile',        icon: User,       label: 'Profile'  },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/90 backdrop-blur-md border-t border-white/[0.04] z-50 px-4 flex items-center justify-between pb-safe">
      {NAV.map(({ href, icon: Icon, label }) => {
        const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={href}
            href={href}
            prefetch={true}
            className="relative flex flex-col items-center justify-center w-full h-full gap-1"
          >
            {active && (
              <motion.div
                layoutId="active-nav-mobile"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-b-md bg-teal"
                style={{ boxShadow: '0 2px 8px rgba(20,184,166,0.6)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
            )}
            <Icon className={cn("h-5 w-5 transition-colors", active ? "text-emerald" : "text-zinc-500")} />
            <span className={cn("text-[10px] font-medium transition-colors", active ? "text-emerald" : "text-zinc-500")}>
              {label}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
