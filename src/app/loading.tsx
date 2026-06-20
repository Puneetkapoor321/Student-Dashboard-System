import React from "react"

export default function Loading() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col gap-6">
      <div className="h-12 w-48 bg-white/[0.04] rounded-lg animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[320px] bg-white/[0.04] rounded-[24px] animate-pulse" />
        <div className="h-[160px] bg-white/[0.04] rounded-[24px] animate-pulse" />
        <div className="h-[160px] bg-white/[0.04] rounded-[24px] animate-pulse" />
        <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[200px] bg-white/[0.04] rounded-[24px] animate-pulse" />
        <div className="h-[160px] bg-white/[0.04] rounded-[24px] animate-pulse" />
      </div>
    </div>
  )
}
