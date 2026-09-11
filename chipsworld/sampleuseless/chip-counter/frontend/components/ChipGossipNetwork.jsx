"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Radio, Heart, Hash, Users, CornerDownRight } from "lucide-react";
import { analyzeChipSpatialData } from "@/utils/spatialAnalysis";
import { generateDynamicGossipPost, generateDynamicHashtags } from "@/utils/gossipGenerator";

export default function ChipGossipNetwork({ chips = [], imageSize = { width: 800, height: 600 } }) {
  const [featuredGossips, setFeaturedGossips] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  if (!chips || chips.length === 0) return null;

  const spatialData = analyzeChipSpatialData(chips, imageSize);
  const trendingHashtags = generateDynamicHashtags(spatialData).slice(0, 4);

  // Initialize exactly 3 distinct category posts: Breaking News, Rumor, Meme
  useEffect(() => {
    const posts = [];
    for (let i = 0; i < 3; i++) {
      const p = generateDynamicGossipPost(chips, imageSize);
      if (p) {
        p.timestamp = `${(i + 1) * 2}m ago`;
        posts.push(p);
      }
    }
    setFeaturedGossips(posts);
  }, [chips]);

  // Live simulation: replace 1 gossip card every 5-8 seconds smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      const newPost = generateDynamicGossipPost(chips, imageSize);
      if (newPost) {
        setFeaturedGossips((prev) => {
          const replaceIdx = Math.floor(Math.random() * 3);
          const updated = [...prev];
          updated[replaceIdx] = newPost;
          return updated;
        });
      }
    }, 6000);

    return () => clearInterval(timer);
  }, [chips, imageSize]);

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full glass-card rounded-3xl p-5 sm:p-6 border border-white/15 flex flex-col gap-5 bg-gradient-to-b from-slate-900/95 via-slate-900/90 to-slate-950/95 shadow-2xl animate-in fade-in duration-300">
      {/* COMPACT TOP HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-400 flex items-center gap-1.5 mb-1">
            <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            Compact Live Social Stream
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            📡 <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-300">Chip Gossip Network</span>
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>{chips.length} Chips Online</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Live 6s
          </span>
        </div>
      </div>

      {/* TRENDING HASHTAGS ROW */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
          <Hash className="w-3 h-3 text-pink-400" /> Trending:
        </span>
        {trendingHashtags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2.5 py-0.5 rounded-lg bg-white/5 border border-white/10 text-purple-200 text-xs font-semibold flex-shrink-0"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* COMPACT 2-3 FEATURED GOSSIP CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featuredGossips.map((post, idx) => {
          const isLiked = !!likedPosts[post.id];
          return (
            <div
              key={post.id || idx}
              className="rounded-2xl p-4 border border-white/10 bg-slate-950/70 flex flex-col justify-between gap-3 hover:border-indigo-500/30 transition-all duration-300 shadow-md relative group animate-in fade-in duration-300"
            >
              {/* Category & Timestamp */}
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${post.category?.bg || "bg-indigo-500/20 text-indigo-300"}`}>
                  {post.category?.label || "👀 Rumor"}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {post.timestamp || "Just now"}
                </span>
              </div>

              {/* 2-Turn Conversation Snippet */}
              <div className="flex flex-col gap-2 my-1">
                {post.conversation?.slice(0, 2).map((msg, mIdx) => (
                  <div key={mIdx} className="flex items-start gap-2 text-xs">
                    <span className="text-base flex-shrink-0 mt-0.5">{msg.avatar}</span>
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-[11px] flex items-center gap-1">
                        {mIdx > 0 && <CornerDownRight className="w-2.5 h-2.5 text-indigo-400" />}
                        {msg.sender}:
                      </span>
                      <p className="text-slate-300 italic text-[11px] leading-snug">
                        "{msg.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="text-sm">{post.reactionEmoji || "🔥"}</span>
                <button
                  type="button"
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer ${
                    isLiked
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 border-white/10"
                  }`}
                >
                  <Heart className={`w-3 h-3 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                  <span>{(post.likes || 18) + (isLiked ? 1 : 0)}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
