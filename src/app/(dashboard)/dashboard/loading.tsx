import React from "react"

export default function DashboardLoading() {
  return (
    <div className="w-full">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-pulse px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Row 1: Hero Tile */}
        <article className="col-span-1 md:col-span-2 lg:col-span-2 p-8 md:p-10 flex flex-col justify-between min-h-[360px] rounded-[24px] bg-white/[0.02] border border-white/[0.06]">
          <div className="flex flex-col gap-4">
            <div className="h-4 w-24 bg-white/[0.04] rounded-md" />
            <div className="h-10 w-64 bg-white/[0.04] rounded-lg mt-4" />
            <div className="h-5 w-48 bg-white/[0.04] rounded-md" />
            <div className="h-20 w-full max-w-[420px] bg-white/[0.03] rounded-2xl mt-4" />
          </div>
          <div className="mt-8 h-10 w-40 bg-white/[0.04] rounded-xl" />
        </article>

        {/* Row 1: Active Courses */}
        <article className="p-6 flex flex-col justify-between rounded-[24px] bg-white/[0.02] border border-white/[0.06] min-h-[160px]">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-white/[0.04] rounded-md" />
            <div className="h-8 w-8 bg-white/[0.04] rounded-lg" />
          </div>
          <div className="h-10 w-16 bg-white/[0.04] rounded-lg mt-4" />
          <div className="h-4 w-32 bg-white/[0.04] rounded-md mt-2" />
        </article>

        {/* Row 2: Hours Learned */}
        <article className="p-6 flex flex-col justify-between rounded-[24px] bg-white/[0.02] border border-white/[0.06] min-h-[160px]">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-white/[0.04] rounded-md" />
            <div className="h-8 w-8 bg-white/[0.04] rounded-lg" />
          </div>
          <div className="h-10 w-16 bg-white/[0.04] rounded-lg mt-4" />
        </article>

        {/* Row 2: Day Streak */}
        <article className="p-6 flex flex-col justify-between rounded-[24px] bg-white/[0.02] border border-white/[0.06] min-h-[160px]">
          <div className="flex justify-between">
            <div className="h-4 w-24 bg-white/[0.04] rounded-md" />
            <div className="h-8 w-8 bg-white/[0.04] rounded-lg" />
          </div>
          <div className="h-10 w-16 bg-white/[0.04] rounded-lg mt-4" />
        </article>

        {/* Row 2: Activity Tile */}
        <article className="col-span-1 lg:row-span-2 p-6 flex flex-col rounded-[24px] bg-white/[0.02] border border-white/[0.06] min-h-[320px]">
          <div className="h-4 w-24 bg-white/[0.04] rounded-md mb-6" />
          <div className="grid grid-cols-12 gap-1.5 mb-6">
            {Array.from({ length: 84 }).map((_, i) => (
              <div key={i} className="aspect-square w-full h-full rounded-[3px] bg-white/[0.03]" />
            ))}
          </div>
          <div className="mt-auto h-4 w-full bg-white/[0.04] rounded-md" />
        </article>

        {/* Row 3: Active Courses Card List */}
        <article className="col-span-1 lg:col-span-2 p-6 md:p-8 flex flex-col rounded-[24px] bg-white/[0.02] border border-white/[0.06] min-h-[200px]">
          <div className="h-4 w-32 bg-white/[0.04] rounded-md mb-6" />
          <div className="flex flex-col gap-3">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.02]">
                <div className="w-12 h-12 rounded-[14px] bg-white/[0.04]" />
                <div className="flex-1">
                  <div className="h-4 w-48 bg-white/[0.04] rounded-md mb-2" />
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
