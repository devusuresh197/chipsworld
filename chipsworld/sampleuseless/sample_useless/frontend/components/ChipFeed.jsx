"use client";

import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Repeat, Share2, Sparkles, Flame, CheckCircle, Award } from "lucide-react";

// Dataset of funny chip social media status updates
const STATUS_UPDATES = [
  "Just got seasoned 🌶️ feeling extra spicy today!",
  "Someone just disappeared from the top of the bowl... 😰 stay safe out there family.",
  "Living my crispy life. 🥔✨",
  "99% sea salt, 1% unbothered. 🧂",
  "Dipped in salsa and honestly I ain't looking back. 🥑💃",
  "If the human hand returns, I'm hiding under Dorito Dave! 🤫",
  "Never crumble under pressure. Stay crispy! 💪",
  "Currently floating in sour cream. 10/10 recommendation. 🧀",
  "Just survived another guacamole dip. What a rush! ⚡",
  "Bag oxygen level at 40%. We crunching through it. 💨"
];

const PRESET_COMMENTS = [
  "Bro stay safe out there!! 😭",
  "That salsa dip looked epic 🥑🔥",
  "Crispy legend! 🥔",
  "Don't go near the top of the bowl!! ⚠️",
  "Too salty for this timeline 🧂"
];

export default function ChipFeed({ chips = [] }) {
  const [posts, setPosts] = useState([]);
  const [likesState, setLikesState] = useState({});
  const [expandedComments, setExpandedComments] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Generate 1-3 funny posts for every detected chip
  useEffect(() => {
    if (chips && chips.length > 0) {
      const generatedPosts = [];
      chips.forEach((chip, chipIdx) => {
        // Generate 1-2 posts per chip
        const numPosts = (chipIdx % 2) + 1;
        for (let p = 0; p < numPosts; p++) {
          const statusIdx = (chipIdx * 3 + p * 2) % STATUS_UPDATES.length;
          const initialLikes = (chipIdx * 17 + p * 9) % 85 + 12;
          const initialComments = (chipIdx * 5 + p * 3) % 15 + 2;
          const minutesAgo = (chipIdx * 11 + p * 7) % 55 + 2;

          generatedPosts.push({
            id: `post-${chip.id}-${p}`,
            chipId: chip.id,
            authorName: chip.name,
            username: chip.username,
            chipIdx: chipIdx,
            content: STATUS_UPDATES[statusIdx],
            flavor: chip.favorite_flavor,
            mood: chip.mood,
            initialLikes: initialLikes,
            commentsCount: initialComments,
            timeAgo: `${minutesAgo}m ago`,
          });
        }
      });

      // Sort posts by time
      setPosts(generatedPosts);
    }
  }, [chips]);

  if (!chips || chips.length === 0) return null;

  const handleToggleLike = (postId, initialCount) => {
    setLikesState((prev) => {
      const current = prev[postId] || { liked: false, count: initialCount };
      return {
        ...prev,
        [postId]: {
          liked: !current.liked,
          count: current.liked ? current.count - 1 : current.count + 1,
        },
      };
    });
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleShare = (postId) => {
    setCopiedId(postId);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Feed Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            📲 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-red-400">ChipFeed</span> Status Updates
          </h3>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm">
          {posts.length} Live Bowl Updates
        </span>
      </div>

      {/* Vertical Social Timeline Stream */}
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
        {posts.map((post) => {
          const avatarEmojis = ["🥔", "🍟", "🌮", "🧀", "🍿", "🥨"];
          const avatarEmoji = avatarEmojis[post.chipIdx % avatarEmojis.length];

          const likeData = likesState[post.id] || { liked: false, count: post.initialLikes };
          const isCommentsExpanded = !!expandedComments[post.id];

          return (
            <div
              key={post.id}
              className="glass-card rounded-3xl p-5 sm:p-6 border border-amber-500/30 flex flex-col gap-4 transition-all duration-300 hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10 bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 backdrop-blur-xl group"
            >
              {/* Author Header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-orange-500 to-red-500 shadow-md flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-xl">
                      {avatarEmoji}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-white hover:underline cursor-pointer">
                        {post.authorName}
                      </h4>
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-amber-200/70">
                      <span className="font-mono text-amber-300">{post.username}</span>
                      <span>&bull;</span>
                      <span className="font-mono text-amber-200/60">{post.timeAgo}</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-200 text-[10px] font-mono font-medium">
                  {post.chipId}
                </span>
              </div>

              {/* Post Body Content */}
              <div className="space-y-3">
                <p className="text-sm text-slate-100 font-medium leading-relaxed">
                  {post.content}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" /> {post.flavor}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-300 text-[11px] font-medium">
                    {post.mood}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-200/70">
                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => handleToggleLike(post.id, post.initialLikes)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                    likeData.liked
                      ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                      : "bg-white/5 hover:bg-white/10 text-amber-200 border-amber-500/20"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${likeData.liked ? "fill-rose-500 text-rose-500 scale-110" : "text-amber-300"}`} />
                  <span className="font-semibold font-mono">{likeData.count}</span>
                </button>

                {/* Comment Button */}
                <button
                  type="button"
                  onClick={() => toggleComments(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/20 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-orange-400" />
                  <span className="font-semibold font-mono">{post.commentsCount}</span>
                </button>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={() => handleShare(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-200 border border-amber-500/20 transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>{copiedId === post.id ? "Shared!" : "Share"}</span>
                </button>
              </div>

              {/* Expandable Comments Drawer */}
              {isCommentsExpanded && (
                <div className="mt-2 pt-3 border-t border-amber-500/20 space-y-2 text-xs animate-in fade-in duration-200">
                  <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    Recent Comments
                  </span>
                  {PRESET_COMMENTS.slice(0, 3).map((cmt, cIdx) => (
                    <div key={cIdx} className="bg-slate-950/60 p-2.5 rounded-xl border border-amber-500/20 flex items-start gap-2">
                      <span className="text-sm">🥔</span>
                      <div>
                        <span className="font-bold text-amber-300 block text-[11px]">Chip-Fan-{cIdx + 1}</span>
                        <span className="text-amber-100/90">{cmt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
