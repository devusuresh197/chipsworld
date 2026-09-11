"use client";

import React, { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check, Shuffle } from "lucide-react";

export const COUNTRIES = [
  { id: "IN", name: "India", flag: "🇮🇳", code: "+91", region: "Asia-Pacific" },
  { id: "JP", name: "Japan", flag: "🇯🇵", code: "+81", region: "Asia-Pacific" },
  { id: "BR", name: "Brazil", flag: "🇧🇷", code: "+55", region: "South America" },
  { id: "CA", name: "Canada", flag: "🇨🇦", code: "+1", region: "North America" },
  { id: "FR", name: "France", flag: "🇫🇷", code: "+33", region: "Europe" },
  { id: "DE", name: "Germany", flag: "🇩🇪", code: "+49", region: "Europe" },
  { id: "AU", name: "Australia", flag: "🇦🇺", code: "+61", region: "Oceania" },
  { id: "KR", name: "South Korea", flag: "🇰🇷", code: "+82", region: "Asia-Pacific" },
];

export default function CountrySelect({ selectedCountry, onSelectCountry }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const dropdownRef = useRef(null);

  const currentCountry = COUNTRIES.find((c) => c.name === selectedCountry) || COUNTRIES[0];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleRandomCountry = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 500);

    // Pick a random country (preferably different from the current one)
    const available = COUNTRIES.filter((c) => c.name !== selectedCountry);
    const random = available[Math.floor(Math.random() * available.length)];
    onSelectCountry(random.name);
  };

  return (
    <div className="flex flex-col gap-2 w-full" ref={dropdownRef}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-amber-200 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-amber-400" />
          Target Country / Region
        </label>

        {/* Random Country Action Button */}
        <button
          type="button"
          onClick={handleRandomCountry}
          className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-200 border border-amber-500/30 text-[11px] font-semibold flex items-center gap-1.5 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          title="Randomly pick a country"
        >
          <Shuffle className={`w-3 h-3 text-amber-400 ${isSpinning ? "animate-spin" : ""}`} />
          <span>Random Country</span>
        </button>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full glass-input rounded-xl px-4 py-3 text-left flex items-center justify-between gap-3 transition-all duration-200 ${
            isOpen ? "border-amber-400 ring-2 ring-amber-500/20" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">{currentCountry.flag}</span>
            <div>
              <div className="text-sm font-semibold text-white">{currentCountry.name}</div>
              <div className="text-[11px] text-amber-200/70">{currentCountry.region}</div>
            </div>
          </div>
          <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-amber-300" : ""}`} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 w-full glass-card rounded-2xl p-1.5 border border-amber-500/30 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 bg-slate-950/95">
            <div className="max-h-56 overflow-y-auto space-y-1">
              {COUNTRIES.map((country) => {
                const isSelected = country.name === currentCountry.name;
                return (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => {
                      onSelectCountry(country.name);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-amber-500/20 text-white font-medium border border-amber-500/40"
                        : "hover:bg-white/10 text-amber-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl leading-none">{country.flag}</span>
                      <span className="text-sm">{country.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
