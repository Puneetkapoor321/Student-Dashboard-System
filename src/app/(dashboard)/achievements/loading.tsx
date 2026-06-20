import React from 'react'

export default function AchievementsLoading() {
  return (
    <div className="w-full animate-pulse px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8 md:mb-12">
        <div className="h-9 w-48 bg-white/[0.04] rounded-lg mb-2" />
        <div className="h-5 w-80 bg-white/[0.04] rounded-md" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 flex items-start gap-4 rounded-[24px] bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="w-12 h-12 rounded-[14px] bg-white/[0.04] flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-32 bg-white/[0.04] rounded-md" />
              <div className="h-4 w-48 bg-white/[0.04] rounded-md" />
              <div className="h-6 w-20 bg-white/[0.04] rounded-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
