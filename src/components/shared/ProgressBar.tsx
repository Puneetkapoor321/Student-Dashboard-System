'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  className?: string
  barClassName?: string
  delay?: number
}

function ProgressBarComponent({ progress, className = '', barClassName = 'bg-emerald', delay = 0 }: ProgressBarProps) {
  return (
    <div className={`w-full bg-white/[0.04] rounded-full h-[4px] overflow-hidden ${className}`}>
      <motion.div
        className={`${barClassName} h-full rounded-full w-full`}
        style={{ transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      />
    </div>
  )
}

export const ProgressBar = React.memo(ProgressBarComponent)
