"use client";

import { cn } from "@/libs/utils";
import { type ReactNode } from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div className="relative">
      {/* Left gradient fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 z-2 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0, 0, 0, 1), transparent)",
        }}
      />

      {/* Right gradient fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-32 z-2 pointer-events-none"
        style={{
          background: "linear-gradient(to left, rgba(0, 0, 0, 1), transparent)",
        }}
      />

      <div className="overflow-hidden">
        <div
          {...props}
          className={cn(
            "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-(--gap)",
            {
              "flex-row": !vertical,
              "flex-col": vertical,
            },
            className
          )}
        >
          {Array(repeat)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={cn("flex shrink-0 justify-around gap-(--gap)", {
                  "animate-marquee flex-row": !vertical,
                  "animate-marquee-vertical flex-col": vertical,
                  "group-hover:paused": pauseOnHover,
                })}
                style={{
                  animationDirection: reverse ? "reverse" : "normal",
                }}
              >
                {children}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
