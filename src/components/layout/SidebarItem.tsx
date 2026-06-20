'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/src/lib/utils/cn'

interface SidebarItemProps {
  href: string
  icon: LucideIcon
  label: string
  active: boolean
  isHovered: boolean
  iconColor: string
}

function SidebarItemComponent({ href, icon: Icon, label, active, isHovered, iconColor }: SidebarItemProps) {
  return (
    <Link
      href={href}
      prefetch={true}
      aria-label={label}
      title={!isHovered ? label : undefined}
      className={cn(
        "relative flex h-11 items-center rounded-xl transition-all duration-300 group",
        active ? "text-emerald font-semibold" : "text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]"
      )}
    >
      {active && (
        <motion.div
          layoutId="active-nav-desktop"
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.18), rgba(20,184,166,0.18))',
            border: '1px solid rgba(16,185,129,0.15)',
            boxShadow: '0 4px 12px rgba(16,185,129,0.08)'
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      )}
      <div className="flex w-11 shrink-0 items-center justify-center relative z-10">
        <Icon className={cn("h-5 w-5", active ? iconColor : cn(iconColor, "opacity-60 group-hover:opacity-100 transition-opacity"))} />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2, delay: isHovered ? 0.05 : 0 }}
        className="ml-1 font-medium whitespace-nowrap relative z-10"
      >
        {label}
      </motion.span>
    </Link>
  )
}

export const SidebarItem = React.memo(SidebarItemComponent)
