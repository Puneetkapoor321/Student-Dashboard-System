"use client";

import * as React from "react";
import {
  type HTMLMotionProps,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { cn } from "@/src/lib/utils/cn";

type StarLayerProps = HTMLMotionProps<"div"> & {
  count: number;
  size: number;
  transition: Transition;
  starColors?: string[];
};

const DEFAULT_STAR_COLORS = ["rgba(255, 255, 255, 0.75)", "#22D3EE", "#10B981"];

function generateStars(count: number, starColors: string[]) {
  const shadows: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000;
    const y = Math.floor(Math.random() * 4000) - 2000;
    
    const rand = Math.random();
    let color = starColors[0] || "rgba(255, 255, 255, 0.75)";
    if (rand < 0.12) {
      color = starColors[1] || "#22D3EE"; // Cyan accent
    } else if (rand < 0.24) {
      color = starColors[2] || "#10B981"; // Emerald accent
    }
    
    shadows.push(`${x}px ${y}px ${color}`);
  }
  return shadows.join(", ");
}

function StarLayer({
  count = 200,
  size = 1,
  transition = { repeat: Infinity, duration: 50, ease: "linear" },
  starColors = DEFAULT_STAR_COLORS,
  className,
  ...props
}: StarLayerProps) {
  const [boxShadow, setBoxShadow] = React.useState<string>("");

  React.useEffect(() => {
    setBoxShadow(generateStars(count, starColors));
  }, [count, starColors]);

  return (
    <motion.div
      data-slot="star-layer"
      animate={{ y: [0, -2000] }}
      transition={transition}
      className={cn(
        "absolute top-0 left-0 w-full h-[2000px] will-change-transform pointer-events-none",
        className
      )}
      style={{
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: "translate3d(0,0,0)",
      }}
      {...props}
    >
      <div
        className="absolute bg-transparent rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
      <div
        className="absolute bg-transparent rounded-full top-[2000px]"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          boxShadow: boxShadow,
        }}
      />
    </motion.div>
  );
}

type StarsBackgroundProps = React.ComponentProps<"div"> & {
  factor?: number;
  speed?: number;
  transition?: SpringOptions;
  starColors?: string[];
};

export function StarsBackground({
  children,
  className,
  factor = 0.03,
  speed = 40,
  transition = { stiffness: 40, damping: 20 },
  starColors = DEFAULT_STAR_COLORS,
  ...props
}: StarsBackgroundProps) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);

  const springX = useSpring(offsetX, transition);
  const springY = useSpring(offsetY, transition);

  const rafId = React.useRef<number | null>(null);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (typeof window === "undefined") return;
      if (rafId.current !== null) return; // Throttled to match display refresh rate

      const clientX = e.clientX;
      const clientY = e.clientY;

      rafId.current = requestAnimationFrame(() => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const newOffsetX = -(clientX - centerX) * factor;
        const newOffsetY = -(clientY - centerY) * factor;
        offsetX.set(newOffsetX);
        offsetY.set(newOffsetY);
        rafId.current = null;
      });
    },
    [offsetX, offsetY, factor],
  );

  React.useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      data-slot="stars-background"
      className={cn(
        "relative size-full overflow-hidden bg-[#08090A]",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div 
        className="absolute inset-0 size-full pointer-events-none" 
        style={{ 
          x: springX, 
          y: springY,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "translate3d(0,0,0)",
        }}
      >
        <StarLayer
          count={200}
          size={1}
          transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
          starColors={starColors}
        />
        <StarLayer
          count={80}
          size={1.5}
          transition={{
            repeat: Infinity,
            duration: speed * 1.5,
            ease: "linear",
          }}
          starColors={starColors}
        />
        <StarLayer
          count={30}
          size={2}
          transition={{
            repeat: Infinity,
            duration: speed * 2,
            ease: "linear",
          }}
          starColors={starColors}
        />
      </motion.div>
      {children}
    </div>
  );
}
