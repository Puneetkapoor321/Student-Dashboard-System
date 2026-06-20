import React from 'react'

export default function ProfileLoading() {
  return (
    <div className="w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8 md:mb-12">
        <div className="h-9 w-64 bg-white/[0.04] rounded-lg mb-2" />
        <div className="h-5 w-80 bg-white/[0.04] rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Form Skeletons */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 md:p-8 space-y-6">
            <div className="h-6 w-32 bg-white/[0.04] rounded-md" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-20 bg-white/[0.04] rounded-md" />
                  <div className="h-12 w-full bg-white/[0.03] rounded-xl border border-white/[0.06]" />
                </div>
              ))}
            </div>
            <div className="h-12 w-32 bg-white/[0.04] rounded-xl mt-6" />
          </div>
        </div>

        {/* Right Stats Card Skeletons */}
        <div className="space-y-6">
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-3xl p-6 min-h-[300px] space-y-6">
            <div className="h-6 w-40 bg-white/[0.04] rounded-md mb-6" />
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-white/[0.04] rounded-md" />
                <div className="h-8 w-16 bg-white/[0.04] rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
