import React from "react";
import { Cpu, Sparkles, Activity } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full max-w-6xl mx-auto pt-8 pb-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 p-[1px] shadow-lg shadow-indigo-500/30">
          <div className="w-full h-full bg-slate-950/80 backdrop-blur-xl rounded-2xl flex items-center justify-center">
            <Cpu className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
              Chip Population Counter
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              v1.0
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Next-gen microchip density analyzer & visual detection platform
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 text-xs text-slate-300 backdrop-blur-md shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium">Ready</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30 text-xs text-indigo-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>Grounding DINO</span>
        </div>
      </div>
    </header>
  );
}
