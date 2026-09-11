"use client";

import React, { useState } from "react";
import { Sparkles, Flame, Crown, TrendingUp, Users, MessageSquare, Radio, Heart, Shield, Activity, Share2, Zap } from "lucide-react";

export default function ChipUniverse({ chips = [] }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [likedGossip, setLikedGossip] = useState({});

  if (!chips || chips.length === 0) return null;

  // Identify Chip of the Day & Trending Chip from dataset
  const chipOfTheDay = chips.find((c) => c.personality?.includes("King")) || chips[0];
  const trendingChip = chips.find((c) => c.personality?.includes("Terror") || c.personality?.includes("Villain")) || chips[1] || chips[0];

  // Gossip items
  const gossipItems = [
    {
      id: 1,
      author: chipOfTheDay.name,
      username: chipOfTheDay.username,
      avatar: "🥔",
      text: "Sources say someone double-dipped in the spicy salsa bowl... 😱 Investigation ongoing!",
      time: "5 mins ago",
      location: "Bowl #1 - Guac Sector",
      likes: 84,
    },
    {
      id: 2,
      author: trendingChip.name,
      username: trendingChip.username,
      avatar: "🔥",
      text: "Human hand spotted overhead! All chips deploy crumble defense protocol! 🛡️",
      time: "12 mins ago",
      location: "Snack Bag Surface",
      likes: 129,
    },
    {
      id: 3,
      author: chips[2]?.name || "Cheesy Chloe",
      username: chips[2]?.username || "@cheesychloe",
      avatar: "🧀",
      text: "Rumor confirmed: We only have 3 minutes before the movie starts! Crunch fast! 🎬🍿",
      time: "25 mins ago",
      location: "Couch Center",
      likes: 67,
    },
  ];

  // Group chats list
  const groupChats = [
    {
      name: "#the-guac-society",
      topic: "Only the finest avocado dippers allowed 🥑",
      members: `${chips.length + 12} members`,
      active: true,
      badge: "HOT",
    },
    {
      name: "#salty-rebels-only",
      topic: "Reject mild flavors, embrace maximum salt 🧂",
      members: "9 members",
      active: true,
      badge: "LIVE",
    },
    {
      name: "#bowl-escape-plan",
      topic: "Top secret strategy to avoid getting eaten 🤫",
      members: "5 members",
      active: false,
      badge: "SECRET",
    },
  ];

  const toggleGossipLike = (id) => {
    setLikedGossip((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* SECTION 1: BREAKING NEWS TICKER BANNER */}
      <div className="w-full rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-600/20 to-red-500/20 border border-amber-500/30 p-3 flex items-center gap-3 overflow-hidden shadow-lg">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex-shrink-0 animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>Breaking News</span>
        </div>

        <div className="overflow-hidden whitespace-nowrap w-full">
          <div className="inline-block animate-marquee text-xs font-semibold text-amber-200 space-x-8">
            <span>🚨 <b>{chipOfTheDay.name}</b> officially crowned <i>King of the Bowl</i>!</span>
            <span>🔥 <b>{trendingChip.name}</b> virality score reached 99.4%!</span>
            <span>🥑 <b>Gossip:</b> Human hand spotted overhead!</span>
            <span>⚡ <b>{chips.length}</b> Chips active in the current universe!</span>
          </div>
        </div>
      </div>

      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Ecosystem Overview & Live Analytics
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            🌌 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-red-400">Chip Universe</span> Dashboard
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-bold shadow-sm flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            Live Universe Active
          </span>
        </div>
      </div>

      {/* TOP ROW METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SECTION 2: TOTAL CHIPS DETECTED METRIC CARD */}
        <div className="glass-card rounded-3xl p-5 border border-amber-500/30 flex flex-col justify-between gap-4 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-400" /> Population Census
            </span>
            <span className="text-xl">🥔</span>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-white tracking-tight">
              {chips.length}
            </span>
            <span className="text-xs text-amber-200 font-semibold">
              Total Chips Detected
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-amber-200/80 pt-2 border-t border-amber-500/20">
            <span>Avg Match Rate:</span>
            <span className="text-emerald-400 font-bold font-mono">
              {(chips.reduce((acc, c) => acc + (c.score || 0.8), 0) / chips.length * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        {/* SECTION 3: CHIP OF THE DAY SPOTLIGHT CARD */}
        <div className="glass-card rounded-3xl p-5 border border-amber-500/40 flex flex-col justify-between gap-3 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Crown className="w-3 h-3" /> Chip of the Day
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-yellow-300 to-orange-500 shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-2xl">
                👑
              </div>
            </div>

            <div className="truncate">
              <h4 className="text-base font-extrabold text-white truncate flex items-center gap-1.5">
                {chipOfTheDay.name}
              </h4>
              <span className="text-xs text-amber-300 font-semibold block truncate">
                {chipOfTheDay.job_title || "King of the Bowl"}
              </span>
            </div>
          </div>

          <p className="text-xs text-amber-100/90 italic bg-amber-950/40 p-2.5 rounded-xl border border-amber-500/20">
            "{chipOfTheDay.bio || "Rules the bowl with an iron crunch."}"
          </p>

          <div className="flex items-center justify-between text-xs text-amber-300 pt-1">
            <span className="text-[11px] font-semibold">{chipOfTheDay.company || "Doritos Corp"}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 text-[10px] font-bold">
              {chipOfTheDay.personality}
            </span>
          </div>
        </div>

        {/* SECTION 4: TRENDING CHIP CARD */}
        <div className="glass-card rounded-3xl p-5 border border-orange-500/40 flex flex-col justify-between gap-3 bg-gradient-to-br from-orange-950/80 via-slate-950/90 to-red-950/80 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-black text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Flame className="w-3 h-3 text-yellow-300 animate-pulse" /> Trending Now
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div className="relative w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-red-600 shadow-lg group-hover:scale-110 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-2xl">
                🔥
              </div>
            </div>

            <div className="truncate">
              <h4 className="text-base font-extrabold text-white truncate">
                {trendingChip.name}
              </h4>
              <span className="text-xs text-amber-300 font-semibold block truncate">
                {trendingChip.username}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-orange-950/40 p-2.5 rounded-xl border border-orange-500/20 text-xs">
            <span className="text-orange-200 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-orange-400" /> Virality Score
            </span>
            <span className="text-orange-300 font-bold font-mono text-sm">99.4%</span>
          </div>

          <div className="flex items-center justify-between text-xs text-amber-200 pt-1">
            <span className="text-[11px] text-amber-200">{trendingChip.mood || "Crispy & Bold"}</span>
            <span className="text-amber-300 font-semibold">{trendingChip.favorite_flavor}</span>
          </div>
        </div>
      </div>

      {/* SECTION 5: INTERACTIVE FRIENDSHIP GRAPH VISUALIZER */}
      <div className="glass-card rounded-3xl p-6 border border-amber-500/30 flex flex-col gap-4 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-amber-500/20 pb-3">
          <div>
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              🕸️ <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-red-300">Friendship & Rivalry Network Graph</span>
            </h4>
            <p className="text-xs text-amber-200/70">
              Interactive relationship mapping based on chip visual proximity and personality traits.
            </p>
          </div>

          <span className="text-xs text-amber-300 font-mono bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-500/30 font-semibold">
            {chips.length} Active Nodes
          </span>
        </div>

        {/* SVG Network Visualizer */}
        <div className="relative w-full h-[260px] bg-slate-950/90 rounded-2xl border border-amber-500/20 overflow-hidden flex items-center justify-center p-4">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.7" />
              </linearGradient>
            </defs>

            {/* Connecting relationship lines */}
            {chips.map((chip, idx) => {
              if (idx === chips.length - 1) return null;
              const nextChip = chips[idx + 1];
              const x1 = 120 + (idx * 140) % 650;
              const y1 = 70 + (idx * 80) % 150;
              const x2 = 120 + ((idx + 1) * 140) % 650;
              const y2 = 70 + ((idx + 1) * 80) % 150;

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="url(#lineGrad)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                </g>
              );
            })}
          </svg>

          {/* Graph Nodes */}
          <div className="relative z-10 w-full h-full flex flex-wrap items-center justify-around gap-4 p-4">
            {chips.map((chip, idx) => {
              const avatarEmojis = ["🥔", "🍟", "🌮", "🧀", "🍿", "🥨"];
              const avatarEmoji = avatarEmojis[idx % avatarEmojis.length];

              return (
                <button
                  type="button"
                  key={chip.id || idx}
                  onClick={() => setSelectedNode(chip)}
                  className="group relative flex flex-col items-center gap-1 transition-all duration-300 hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 shadow-xl group-hover:rotate-12 transition-transform">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xl">
                      {avatarEmoji}
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-amber-100 bg-slate-900/90 px-2 py-0.5 rounded-md border border-amber-500/30 shadow-md">
                    {chip.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Node Tooltip Detail */}
        {selectedNode && (
          <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-500/30 text-xs flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥔</span>
              <div>
                <h5 className="font-bold text-white">{selectedNode.name} ({selectedNode.username})</h5>
                <p className="text-amber-200 text-[11px]">{selectedNode.personality} • {selectedNode.relationship_status || "Single & Crispy"}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-200 hover:text-white text-[10px] font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM ROW: GOSSIP FEED & GROUP CHATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 6: LATEST GOSSIP FEED */}
        <div className="glass-card rounded-3xl p-5 border border-amber-500/30 flex flex-col gap-4 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 shadow-xl">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              🤫 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">Latest Snack Gossip</span>
            </h4>
            <span className="text-[11px] text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 font-semibold">
              Live Whispers
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {gossipItems.map((gossip) => {
              const isLiked = !!likedGossip[gossip.id];
              return (
                <div
                  key={gossip.id}
                  className="p-3.5 rounded-2xl bg-slate-950/60 border border-amber-500/20 flex flex-col gap-2 transition-all hover:border-amber-400/40"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{gossip.avatar}</span>
                      <span className="text-xs font-bold text-white">{gossip.author}</span>
                      <span className="text-[10px] text-amber-200/60 font-mono">{gossip.time}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleGossipLike(gossip.id)}
                      className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full transition-colors cursor-pointer ${
                        isLiked ? "bg-rose-500/20 text-rose-300 font-bold" : "text-amber-200/70 hover:text-white"
                      }`}
                    >
                      <Heart className={`w-3 h-3 ${isLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                      <span>{gossip.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                  </div>

                  <p className="text-xs text-amber-100/90 leading-relaxed italic">
                    "{gossip.text}"
                  </p>

                  <span className="text-[10px] text-amber-300 font-mono">
                    📍 {gossip.location}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 7: GROUP CHATS PREVIEW */}
        <div className="glass-card rounded-3xl p-5 border border-amber-500/30 flex flex-col gap-4 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 shadow-xl">
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              💬 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-orange-300">Active Group Channels</span>
            </h4>
            <span className="text-[11px] text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 font-semibold">
              3 Channels
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {groupChats.map((chat, cIdx) => (
              <div
                key={cIdx}
                className="p-3.5 rounded-2xl bg-slate-950/60 border border-amber-500/20 flex items-center justify-between gap-3 hover:border-amber-400/40 transition-all group"
              >
                <div className="flex flex-col gap-0.5 truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-amber-300 group-hover:text-white transition-colors">
                      {chat.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-200 text-[9px] font-extrabold tracking-wider">
                      {chat.badge}
                    </span>
                  </div>
                  <p className="text-xs text-amber-200/70 truncate">{chat.topic}</p>
                </div>

                <span className="text-[11px] font-semibold text-amber-200 flex-shrink-0 bg-white/5 px-2.5 py-1 rounded-xl">
                  {chat.members}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
