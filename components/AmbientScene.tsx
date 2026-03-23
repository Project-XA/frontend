"use client";

import { cn } from "@/lib/utils";

type AmbientVariant = "hero" | "page" | "dashboard";

interface AmbientSceneProps {
  variant?: AmbientVariant;
  className?: string;
}

/**
 * Theme-aligned monochrome ambient layer: CSS 3D-style planes and soft gradients.
 * Kept pointer-events-none for production-safe overlays.
 */
export function AmbientScene({ variant = "page", className }: AmbientSceneProps) {
  if (variant === "dashboard") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden",
          className
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_0%,rgba(9,9,11,0.05),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.4] [background-image:linear-gradient(rgba(9,9,11,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(9,9,11,0.06)_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_40%,black,transparent)]"
        />
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 overflow-hidden perspective-[1600px]",
          className
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(9,9,11,0.06),transparent_50%)]" />
        <div className="absolute left-1/2 top-[42%] h-[min(120vw,900px)] w-[min(120vw,900px)] -translate-x-1/2 -translate-y-1/2 preserve-3d">
          <div className="ambient-float-1 absolute inset-[12%] rounded-[2.5rem] border border-zinc-200/70 bg-gradient-to-br from-zinc-100/90 via-white/40 to-transparent shadow-[0_40px_80px_-20px_rgba(9,9,11,0.12)]" />
          <div className="ambient-float-2 absolute inset-[22%] rounded-3xl border border-zinc-300/50 bg-gradient-to-tr from-zinc-50/80 to-transparent opacity-80 shadow-lg" />
          <div className="ambient-float-3 absolute inset-[32%] rounded-2xl border border-zinc-200/60 bg-white/30 backdrop-blur-[2px]" />
        </div>
        <div className="ambient-orb absolute -right-[20%] top-[10%] h-[420px] w-[420px] rounded-full bg-gradient-to-br from-zinc-200/40 to-transparent blur-3xl" />
        <div className="ambient-orb-delay absolute -left-[15%] bottom-[5%] h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-zinc-100/50 to-transparent blur-3xl" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-30%,rgba(9,9,11,0.05),transparent_55%)]" />
      <div className="absolute -right-1/4 top-1/4 h-[min(70vw,480px)] w-[min(70vw,480px)] rounded-full bg-gradient-to-bl from-zinc-200/30 to-transparent blur-3xl ambient-orb" />
      <div className="absolute -left-1/4 bottom-0 h-[min(60vw,420px)] w-[min(60vw,420px)] rounded-full bg-gradient-to-tr from-zinc-100/40 to-transparent blur-3xl ambient-orb-delay" />
    </div>
  );
}
