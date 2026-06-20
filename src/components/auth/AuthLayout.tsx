"use client";

import * as React from "react";
import { StarsBackground } from "@/src/components/ui/stars";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#08090A] overflow-hidden p-4">
      {/* StarsBackground covers the viewport */}
      <StarsBackground className="absolute inset-0 z-0 bg-[#08090A]" />

      {/* Grid mesh texture (similar to Vercel/Linear) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Ambient glows behind the authentication card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-emerald-500/5 to-cyan-500/10 opacity-80 blur-[120px] pointer-events-none z-0" />
      
      {/* Subtle corner glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[160px] pointer-events-none z-0" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[160px] pointer-events-none z-0" />

      {/* Centered layout container */}
      <div className="relative z-10 w-full max-w-[400px] flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
