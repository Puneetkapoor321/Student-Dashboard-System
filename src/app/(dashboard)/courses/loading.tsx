import React from 'react'

export default function CoursesLoading() {
  return (
    <div className="w-full animate-pulse px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8 md:mb-12">
        <div className="h-9 w-48 bg-white/[0.04] rounded-lg mb-2" />
        <div className="h-5 w-80 bg-white/[0.04] rounded-md" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="p-6 flex flex-col justify-between min-h-[200px] rounded-[24px] bg-white/[0.02] border border-white/[0.06]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-[14px] bg-white/[0.04]" />
              <div className="h-8 w-12 bg-white/[0.04] rounded-md" />
            </div>
            <div className="mt-auto">
              <div className="h-5 w-32 bg-white/[0.04] rounded-md mb-4" />
              <div className="h-1.5 w-full bg-white/[0.04] rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
