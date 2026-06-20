'use client'

import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
}

function AnimatedCardComponent({ children, className = '', delay = 0 }: AnimatedCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: 'easeOut',
        delay,
      }}
      whileHover={{
        scale: 1.02,
        y: -2,
        transition: {
          type: 'spring',
          stiffness: 300,
          damping: 20
        }
      }}
      className={`relative overflow-hidden rounded-[24px] bg-[#0c0d0f] border border-white/[0.06] premium-shadow group will-change-transform ${className}`}
    >
      {/* Subtle border glow on hover */}
      <div className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-transparent to-teal/5" />
      </div>
      
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.article>
  )
}

export const AnimatedCard = React.memo(AnimatedCardComponent)
