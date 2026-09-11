"use client";

import React, { useState } from "react";
import { Heart, Sparkles, Flame, Smile, Award, Briefcase, Users, Trophy } from "lucide-react";

export default function ChipBook({ chips = [] }) {
  const [likedChips, setLikedChips] = useState({});

  if (!chips || chips.length === 0) return null;

  const toggleLike = (chipId) => {
    setLikedChips((prev) => ({
      ...prev,
      [chipId]: !prev[chipId],
    }));
  };

  const formatCount = (num) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return num.toLocaleString();
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            Social Media Feed & Demographics
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            📖 <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300">ChipBook</span> Directory
          </h3>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-200 text-xs font-bold shadow-sm">
          {chips.length} Unique Profiles Generated
        </span>
      </div>

      {/* Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chips.map((chip, idx) => {
          const isLiked = !!likedChips[chip.id];
          const avatarEmojis = ["🥔", "🍟", "🌮", "🧀", "🍿", "🥨"];
          const avatarEmoji = avatarEmojis[idx % avatarEmojis.length];

          return (
            <div
              key={chip.id || idx}
              className="glass-card rounded-3xl p-5 border border-white/15 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 group relative overflow-hidden bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-slate-950/90"
            >
              {/* Instagram-style top header */}
              <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-3">
                <div className="flex items-center gap-3 truncate">
                  <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-md group-hover:rotate-6 transition-transform duration-300 flex-shrink-0">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-2xl">
                      {avatarEmoji}
                    </div>
                  </div>

                  <div className="truncate">
                    <h4 className="text-base font-bold text-white leading-snug truncate">
                      {chip.name}
                    </h4>
                    <span className="text-xs text-indigo-300 font-mono font-medium block truncate">
                      {chip.username}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleLike(chip.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border transition-all duration-200 cursor-pointer flex-shrink-0 ${
                    isLiked
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? "fill-rose-500 text-rose-500 animate-pulse" : "text-slate-400"}`} />
                  <span>{isLiked ? "Liked" : "Follow"}</span>
                </button>
              </div>

              {/* Bio & Professional Details */}
              <div className="flex flex-col gap-3">
                {/* Job Title & Company */}
                <div className="flex items-center gap-2 text-xs font-medium text-purple-200 bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20 truncate">
                  <Briefcase className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                  <span className="truncate">
                    <span className="font-semibold text-white">{chip.job_title || "Snack Ambassador"}</span>
                    {" @ "}
                    <span className="text-purple-300 font-bold">{chip.company || "Doritos Corp"}</span>
                  </span>
                </div>

                {/* Followers & Following Counter */}
                <div className="flex items-center justify-around py-1.5 px-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    <div>
                      <span className="font-bold text-white">{formatCount(chip.followers_count || 14200)}</span>{" "}
                      <span className="text-slate-400 text-[11px]">Followers</span>
                    </div>
                  </div>
                  <div className="w-px h-3.5 bg-white/15" />
                  <div>
                    <span className="font-bold text-white">{formatCount(chip.following_count || 380)}</span>{" "}
                    <span className="text-slate-400 text-[11px]">Following</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-300 italic bg-slate-950/40 p-3 rounded-2xl border border-white/5 leading-relaxed">
                  "{chip.bio}"
                </p>

                {/* Badges Row (Personality, Mood, Relationship) */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-semibold flex items-center gap-1">
                    <Flame className="w-3 h-3 text-purple-400" />
                    {chip.personality}
                  </span>

                  <span className="px-2.5 py-1 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold flex items-center gap-1">
                    <Smile className="w-3 h-3 text-indigo-400" />
                    {chip.mood}
                  </span>

                  {chip.relationship_status && (
                    <span className="px-2.5 py-1 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-300 text-[11px] font-semibold flex items-center gap-1">
                      {chip.relationship_status}
                    </span>
                  )}
                </div>

                {/* Achievement Badges Pills */}
                {chip.achievement_badges && chip.achievement_badges.length > 0 && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                      <Trophy className="w-3 h-3 text-amber-400" /> Achievements
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {chip.achievement_badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2 py-0.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[10px] font-medium shadow-sm"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Flavor & Age Row */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5 truncate">
                    <span className="text-[10px] text-slate-400 block font-medium uppercase">Fav Flavor</span>
                    <span className="text-white font-semibold truncate block mt-0.5">{chip.favorite_flavor}</span>
                  </div>

                  <div className="bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block font-medium uppercase">Crunch Age</span>
                    <span className="text-amber-300 font-semibold font-mono block mt-0.5">{chip.age} yrs</span>
                  </div>
                </div>
              </div>

              {/* Instagram-style footer */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-indigo-300 font-semibold flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-400" /> {chip.id}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium">
                  {(chip.score * 100).toFixed(1)}% Match
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
