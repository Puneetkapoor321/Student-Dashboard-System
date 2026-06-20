import React from 'react'

export default function ProgressLoading() {
  return (
    <div className="w-full animate-pulse px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header Skeleton */}
      <div className="mb-8 md:mb-12">
        <div className="h-9 w-48 bg-white/[0.04] rounded-lg mb-2" />
        <div className="h-5 w-80 bg-white/[0.04] rounded-md" />
      </div>

      <div className="space-y-6">
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 min-h-[200px]" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 min-h-[150px]" />
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 min-h-[150px]" />
        </div>
      </div>
    </div>
  )
}
