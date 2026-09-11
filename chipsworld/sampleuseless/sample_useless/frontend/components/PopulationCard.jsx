"use client";

import React, { useState, useEffect } from "react";
import { Users, Sparkles, Cpu, Award } from "lucide-react";

export default function PopulationCard({ count = 0 }) {
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = count;
    if (start === end) {
      setDisplayCount(end);
      return;
    }

    const duration = 1200; // 1.2 seconds smooth count-up animation
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      // Ease out exponential curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * (end - start) + start);

      setDisplayCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        setDisplayCount(end);
      }
    };

    requestAnimationFrame(updateCount);
  }, [count]);

  return (
    <div className="w-full glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/40 relative overflow-hidden bg-gradient-to-br from-amber-950/80 via-slate-900/90 to-orange-950/80 shadow-2xl shadow-amber-500/20 group transition-all duration-300 hover:border-amber-400/60 hover:shadow-amber-500/30">
      {/* Background ambient lighting orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-56 h-56 rounded-full bg-amber-500/25 blur-3xl pointer-events-none group-hover:bg-amber-500/35 transition-all duration-500" />
      <div className="absolute bottom-[-20%] left-[-10%] w-56 h-56 rounded-full bg-orange-500/25 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-5">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-slate-900/90 border border-amber-500/30 flex items-center justify-center text-3xl shadow-inner flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              🥔
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] uppercase font-bold tracking-widest text-amber-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  AI Object Detection Census
                </span>
                
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Total <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-red-300">Potato Chips Detected</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Big Number Count Row */}
        <div className="flex items-baseline gap-3 py-1">
          <span className="text-6xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200 drop-shadow-md tracking-tight font-mono">
            {displayCount.toLocaleString()}
          </span>
          <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide uppercase leading-none">
              Chips
            </span>
            <span className="text-[10px] text-amber-200/70 font-medium mt-1">
              (Automated Chip Population Count)
            </span>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-3 border-t border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs text-amber-200/80">
         
          <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 border border-amber-500/30 font-mono text-amber-300 font-semibold flex items-center gap-1 shadow-sm">
            <Cpu className="w-3 h-3 text-amber-400" /> {count} Bounding Boxes Annotated
          </span>
        </div>
      </div>
    </div>
  );
}
