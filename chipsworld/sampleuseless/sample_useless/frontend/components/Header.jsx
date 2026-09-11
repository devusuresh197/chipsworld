import React from "react";
import { Cpu, Sparkles } from "lucide-react";

export default function Header({ onBack }) {
  return (
    <header className="w-full max-w-6xl mx-auto pt-8 pb-4 px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 p-[2px] shadow-lg shadow-amber-500/30 hover:scale-105 transition-transform cursor-pointer"
            title="Return to Odi Da Chips Landing"
          >
            <div className="w-full h-full bg-slate-950/80 backdrop-blur-xl rounded-[14px] flex items-center justify-center text-xl">
              🥔
            </div>
          </button>
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 p-[1px] shadow-lg shadow-amber-500/30">
            <div className="w-full h-full bg-slate-950/80 backdrop-blur-xl rounded-2xl flex items-center justify-center">
              <Cpu className="w-6 h-6 text-amber-400 animate-pulse" />
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-orange-300 to-red-400">
              Chip Population Counter
            </h1>
           
          </div>
          
        </div>
      </div>

      <div className="flex items-center gap-3">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-200 border border-amber-400/30 text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <span>🥔 Odikkooo</span>
          </button>
        )}

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-amber-400/20 text-xs text-slate-300 backdrop-blur-md shadow-inner">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-medium text-amber-200">Ready</span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 text-xs text-amber-300 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        
        </div>
      </div>
    </header>
  );
}
