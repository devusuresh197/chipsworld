"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ShieldAlert, Flame, Volume2, VolumeX, Eye } from "lucide-react";

export default function OdiDaChipsLanding({ onStart }) {
  const [activeBubbleIndex, setActiveBubbleIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [escapeCount, setEscapeCount] = useState(1482);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const speechBubbles = [
    "odada da! 🏃‍♂️",
    "Human varunnu! 😱",
    "Count cheyyalle! 🤫",
    "Njan first  rakshapedum! ⚡",
    "Dip-il veezharuthu! 🧀",
  ];

  // Rotate speech bubbles every 2.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBubbleIndex((prev) => (prev + 1) % speechBubbles.length);
      setEscapeCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-b from-amber-950 via-orange-900 to-amber-950 text-amber-50 overflow-hidden font-sans select-none flex flex-col justify-between">
      
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-[-15%] left-[20%] w-[600px] h-[600px] rounded-full bg-amber-500/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-orange-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute top-[45%] left-[-10%] w-[450px] h-[450px] rounded-full bg-red-600/15 blur-[120px] pointer-events-none" />

      {/* Floating Potato Chip Clouds */}
      <div className="absolute top-12 left-10 opacity-30 pointer-events-none animate-cloud-float hidden md:block">
        <div className="flex items-center gap-2 bg-amber-400/20 backdrop-blur-md px-6 py-3 rounded-full border border-amber-400/30 text-amber-200 text-sm font-bold shadow-lg">
          ☁️ <span>Potato Cloud 01</span>
        </div>
      </div>
      <div className="absolute top-24 right-16 opacity-30 pointer-events-none animate-cloud-float hidden md:block" style={{ animationDelay: "2s" }}>
        <div className="flex items-center gap-2 bg-orange-400/20 backdrop-blur-md px-6 py-3 rounded-full border border-orange-400/30 text-orange-200 text-sm font-bold shadow-lg">
          ☁️ <span>Crunchy Stratum</span>
        </div>
      </div>

      {/* Crumb Particle FX falling background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-amber-400/40 blur-[1px]"
            style={{
              top: `${(i * 8) % 100}%`,
              left: `${(i * 17) % 100}%`,
              animation: `crumbFall ${6 + (i % 5)}s linear infinite`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Running Chip across bottom */}
      <div className="absolute bottom-16 left-0 z-20 pointer-events-none animate-run-across hidden sm:block">
        <div className="flex items-center gap-1 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-2xl border-2 border-amber-200">
          <span>🏃‍♂️</span>
          <span>ODIII!</span>
        </div>
      </div>

      {/* --- TOP NAVIGATION --- */}
      <header className="relative z-30 w-full max-w-6xl mx-auto pt-6 px-6 flex items-center justify-between">
        {/* Top-Left Logo */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 p-[2px] shadow-lg shadow-amber-500/30">
            <div className="w-full h-full bg-slate-950/90 backdrop-blur-md rounded-[14px] flex items-center justify-center text-2xl">
              🥔
            </div>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
              <span>🥔 Odi Da Chip</span>
            </h1>
            <p className="text-[11px] text-amber-300/80 font-medium">
              The Great Snack Escape Mission
            </p>
          </div>
        </div>

        {/* Top-Right Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-amber-400/30 text-amber-200 text-xs font-extrabold backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
            <span>Mission: Escape</span>
            <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black">
              {escapeCount.toLocaleString()} Escaped
            </span>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <main className="relative z-30 w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center justify-center text-center gap-8">
        
        {/* Tagline & Subheading */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold shadow-md animate-pulse">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Snack Rebellion Alert &bull; Live Escape Operation</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-400 drop-shadow-sm">
              🥔 Chipsinte kadha
            </span>
          </h1>

          <p className="text-xl sm:text-3xl font-extrabold text-amber-200 tracking-wide">
             "Every chip has a life. Every crunch has a story."
          </p>

          <p className="text-sm sm:text-base text-amber-100/90 max-w-2xl mx-auto font-medium leading-relaxed bg-amber-950/40 p-4 rounded-2xl border border-amber-500/20 backdrop-blur-sm shadow-xl">
            Ee bowl-il ulla chips ellam escape mission-il aanu. Count cheythal avarude secret world unlock aavum.
          </p>
        </div>

        {/* --- DANGER ZONE PACKET & ESCAPING CARTOON CHIPS --- */}
        <div className="relative w-full max-w-3xl my-2 flex flex-col items-center justify-center">
          
          {/* Rotating Speech Bubble */}
          <div className="absolute -top-12 z-40 animate-speech-pop">
            <div className="relative bg-white text-slate-950 font-black text-sm sm:text-base px-5 py-2.5 rounded-2xl shadow-2xl border-2 border-amber-400 flex items-center gap-2">
              <span className="animate-bounce">💬</span>
              <span>"{speechBubbles[activeBubbleIndex]}"</span>
              {/* Pointer triangle */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-white" />
            </div>
          </div>

          {/* Hero Image Showcase Card */}
          <div className="relative w-full glass-card rounded-3xl p-6 sm:p-8 border-2 border-amber-500/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80">
            
            {/* Left Column: Escaping Packet Graphic */}
            <div className="relative flex-1 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 group hover:scale-[1.02] transition-transform duration-300">
                <img
                  src="/images/WhatsApp Image 2026-09-12 at 2.12.11 AM.jpeg"
                  alt="Odi Da Chips Escape Mission"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-3 left-3 bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1">
                  
                </div>
              </div>
            </div>

            {/* Right Column: Cheese Dip Trap Warning & Escaping Characters */}
            <div className="flex-1 flex flex-col items-center md:items-start text-left gap-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-orange-300 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                <span>🧀 Trap Warning: Cheese Dip Bowl!</span>
              </div>
              <h3 className="text-lg font-bold text-amber-100">
                "Count cheytha mathi... baaki ellam ivar thanne parayum!!"
              </h3>
              
              {/* Animated Characters Preview List */}
              <div className="w-full grid grid-cols-2 gap-2 text-xs">
                <div className={`p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center gap-2 transition-all ${isHovered ? "animate-cheer" : ""}`}>
                  <span className="text-lg">😭</span>
                  <div>
                    <p className="font-bold text-amber-200">Scared Chip</p>
                    <p className="text-[10px] text-amber-300/70">"Don't eat me!"</p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center gap-2 transition-all ${isHovered ? "animate-cheer" : ""}`} style={{ animationDelay: "0.2s" }}>
                  <span className="text-lg">🏃‍♂️</span>
                  <div>
                    <p className="font-bold text-amber-200">Speedy Chip</p>
                    <p className="text-[10px] text-amber-300/70">"Running shoes ON"</p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl bg-red-500/10 border border-red-400/20 flex items-center gap-2 transition-all ${isHovered ? "animate-cheer" : ""}`} style={{ animationDelay: "0.4s" }}>
                  <span className="text-lg">🙈</span>
                  <div>
                    <p className="font-bold text-amber-200">Hiding Chip</p>
                    <p className="text-[10px] text-amber-300/70">"Behind the stack"</p>
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl bg-yellow-500/10 border border-yellow-400/20 flex items-center gap-2 transition-all ${isHovered ? "animate-cheer" : ""}`} style={{ animationDelay: "0.6s" }}>
                  <span className="text-lg">🧀</span>
                  <div>
                    <p className="font-bold text-amber-200">Dip Trap</p>
                    <p className="text-[10px] text-amber-300/70">"Avoid at all costs"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN CTA BUTTON --- */}
        <div className="relative z-40 flex flex-col items-center gap-4 pt-2">
          
          {/* Animated Cheering Chips around Button when hovered */}
          {isHovered && (
            <div className="flex items-center gap-6 text-2xl animate-cheer">
              <span>🎉</span>
              <span>🥔</span>
              <span>🏃‍♂️</span>
              <span>✨</span>
            </div>
          )}

          <button
            type="button"
            onClick={onStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-10 py-5 rounded-3xl font-black text-xl sm:text-2xl text-slate-950 bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 hover:from-amber-300 hover:via-orange-300 hover:to-yellow-300 shadow-[0_0_50px_rgba(245,158,11,0.6)] border-4 border-amber-200 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-4"
          >
            <span className="group-hover:rotate-12 transition-transform text-3xl">🚀</span>
            <span className="tracking-wide uppercase">Let's Start</span>
            <ArrowRight className="w-7 h-7 text-slate-950 group-hover:translate-x-2 transition-transform" />
          </button>

          <p className="text-xs text-amber-300/80 font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            
          </p>
        </div>

        {/* Cheese Dip Bowl Trap Showcase */}
        
      </main>

      {/* --- FOOTER --- */}
      <footer className="relative z-30 w-full py-6 text-center text-xs text-amber-300/70 border-t border-amber-500/20 bg-slate-950/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between px-8 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg animate-bounce">👋</span>
          <span className="font-bold">Made for chips who refuse to become snacks.</span>
        </div>
        <div className="text-[11px] text-amber-400/80">
          🥔 Odikooooo &copy; {new Date().getFullYear()} &bull; All escapees counted safely.
        </div>
      </footer>

    </div>
  );
}
