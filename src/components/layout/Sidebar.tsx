'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Home, BookOpen, TrendingUp, Trophy, User, Rocket } from 'lucide-react'
import { SidebarItem } from './SidebarItem'

const NAV = [
  { href: '/dashboard',      icon: Home,       label: 'Dashboard',    iconColor: 'text-emerald' },
  { href: '/courses',        icon: BookOpen,   label: 'Courses',      iconColor: 'text-indigo-400' },
  { href: '/progress',       icon: TrendingUp, label: 'Progress',     iconColor: 'text-teal' },
  { href: '/achievements',   icon: Trophy,     label: 'Achievements', iconColor: 'text-amber-500' },
  { href: '/profile',        icon: User,       label: 'Profile',      iconColor: 'text-purple-400' },
]

export function Sidebar({ username }: { username?: string }) {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  // Use matchMedia to determine desktop size efficiently instead of heavy resize listeners
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsDesktop(e.matches);
    };
    handleChange(mediaQuery);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const expanded = isDesktop && isHovered

  return (
    <nav className="hidden md:flex w-[68px] shrink-0 z-50 relative">
      <motion.div
        className="absolute left-0 top-0 h-full bg-surface border-r border-white/[0.04] flex flex-col py-5 shadow-[4px_0_24px_rgba(0,0,0,0.5)] overflow-hidden"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial={{ width: 68 }}
        animate={{ width: expanded ? 240 : 68 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <div className="flex flex-col h-full w-[240px]">
          {/* Logo */}
          <div className="flex items-center px-[16px] mb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-emerald/10 border border-emerald/20 text-emerald">
              <Rocket className="h-5 w-5 text-emerald fill-emerald/10" />
            </div>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.2, delay: expanded ? 0.05 : 0 }}
              className="ml-3 font-semibold text-foreground whitespace-nowrap"
            >
              SkillUp
            </motion.span>
          </div>

          {/* Navigation Items */}
          <div className="flex-1 flex flex-col gap-2 px-[12px]">
            {NAV.map(({ href, icon, label, iconColor }) => {
              const active = href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)
              return (
                <SidebarItem
                  key={href}
                  href={href}
                  icon={icon}
                  label={label}
                  active={active}
                  isHovered={expanded}
                  iconColor={iconColor}
                />
              )
            })}
          </div>
          
          {/* Logout Button */}
          <div className="mt-auto pb-2 px-[12px]">
            <form action="/login" method="POST" onSubmit={async (e) => {
              e.preventDefault();
              const { logout } = await import('@/src/lib/auth/actions');
              await logout();
            }}>
              <button
                type="submit"
                aria-label="Logout"
                title={!expanded ? 'Logout' : undefined}
                className="w-full flex h-11 items-center rounded-xl transition-all duration-300 text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
              >
                <div className="flex w-11 shrink-0 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.2, delay: expanded ? 0.05 : 0 }}
                  className="ml-1 font-medium whitespace-nowrap"
                >
                  Logout
                </motion.span>
              </button>
            </form>
          </div>

          {/* User Profile Avatar */}
          <div className="border-t border-white/[0.04] pt-4 pb-2 px-[16px] flex items-center w-[240px]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald/10 border border-emerald/20 text-emerald font-semibold text-sm">
              {username?.[0]?.toUpperCase() || 'P'}
            </div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: expanded ? 1 : 0 }}
              transition={{ duration: 0.2, delay: expanded ? 0.05 : 0 }}
              className="ml-3 text-sm font-semibold text-zinc-300 truncate"
            >
              {username || 'Guest'}
            </motion.span>
          </div>

        </div>
      </motion.div>
    </nav>
  )
}
