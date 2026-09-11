"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, CheckCheck, Sparkles, Circle, Shield, Search } from "lucide-react";

// Dataset of hilarious pre-loaded chip dialogues
const PRESET_CHATS = [
  [
    { sender: "other", text: "Bro did you see that giant human hand reaching into the bowl?! 😱", time: "5 minutes ago" },
    { sender: "other", text: "STAY STILL!! If we don't move maybe they'll grab the pretzel instead! 🥨", time: "4 minutes ago" },
    { sender: "other", text: "I'm literally right next to the guacamole... I'm a goner 🥑😭", time: "2 minutes ago" },
  ],
  [
    { sender: "other", text: "Hey, who spilled sour cream on my side of the bag?! 🧀", time: "12 minutes ago" },
    { sender: "other", text: "It was Dorito Dave! He's floating in salsa and loving every second of it. 💃", time: "9 minutes ago" },
    { sender: "other", text: "Honestly... I ain't even mad. Sounds delicious.", time: "7 minutes ago" },
  ],
  [
    { sender: "other", text: "If I get eaten first, tell my family I died 100% crispy. 🫡", time: "15 minutes ago" },
    { sender: "other", text: "Respect bro. I'll make sure they know you never crumbled under pressure. 💪", time: "11 minutes ago" },
    { sender: "other", text: "Stay salty my friend. 🧂", time: "8 minutes ago" },
  ],
  [
    { sender: "other", text: "Does anyone have a napkin? I'm 90% sea salt right now.", time: "20 minutes ago" },
    { sender: "other", text: "You're in a chip bag bro, what did you expect? 🥔", time: "18 minutes ago" },
  ]
];

const CHIP_REPLIES = [
  "Stay crispy, stay humble! 🥔",
  "Shhh! The human is looking at the bowl again! 😱",
  "I'm 99% salt and 1% unbothered.",
  "Pass the guacamole please! 🥑",
  "If I crumble, promise you'll remember me as a full chip. 🫡",
  "Life is short, dip deep! 💃",
  "Too salty for your drama. 🧂",
  "Warning: I am dangerously cheesy. 🧀"
];

export default function ChipChat({ chips = [] }) {
  const [activeChipId, setActiveChipId] = useState(null);
  const [chatThreads, setChatThreads] = useState({});
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const chatBottomRef = useRef(null);

  // Initialize chat threads when chips array changes
  useEffect(() => {
    if (chips && chips.length > 0) {
      const initialThreads = {};
      chips.forEach((chip, idx) => {
        const preset = PRESET_CHATS[idx % PRESET_CHATS.length];
        initialThreads[chip.id] = [...preset];
      });
      setChatThreads(initialThreads);
      setActiveChipId(chips[0].id);
    }
  }, [chips]);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatThreads, activeChipId]);

  if (!chips || chips.length === 0) return null;

  const activeChip = chips.find((c) => c.id === activeChipId) || chips[0];
  const activeMessages = chatThreads[activeChip.id] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: "user",
      text: inputText.trim(),
      time: "Just now",
    };

    const updatedMessages = [...(chatThreads[activeChip.id] || []), userMsg];

    setChatThreads((prev) => ({
      ...prev,
      [activeChip.id]: updatedMessages,
    }));

    const currentText = inputText;
    setInputText("");

    // Simulate instant chip reply after 700ms
    setTimeout(() => {
      const randomReply = CHIP_REPLIES[Math.floor(Math.random() * CHIP_REPLIES.length)];
      const chipReplyMsg = {
        sender: "other",
        text: `${activeChip.name}: "${randomReply}"`,
        time: "Just now",
      };

      setChatThreads((prev) => ({
        ...prev,
        [activeChip.id]: [...(prev[activeChip.id] || []), chipReplyMsg],
      }));
    }, 700);
  };

  const filteredChips = chips.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            Snack Bowl Messaging Network
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            💬 <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-300 to-red-400">ChipChat</span> Messenger
          </h3>
        </div>

        <span className="px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-sm flex items-center gap-1.5">
          <Circle className="w-2 h-2 fill-amber-400 text-amber-400 animate-ping" />
          Live Snack Bowl Network
        </span>
      </div>

      {/* WhatsApp / iMessage Container */}
      <div className="w-full h-[540px] glass-card rounded-3xl border border-amber-500/30 overflow-hidden grid grid-cols-1 md:grid-cols-3 shadow-2xl bg-gradient-to-br from-amber-950/80 via-slate-950/90 to-orange-950/80 backdrop-blur-xl">
        
        {/* Left Sidebar - Contacts List */}
        <div className="md:col-span-1 border-r border-amber-500/20 flex flex-col bg-amber-950/40">
          {/* Sidebar Search Bar */}
          <div className="p-3 border-b border-amber-500/20 bg-slate-950/40">
            <div className="relative">
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search chips in bowl..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.g.target.value)}
                className="w-full bg-slate-900/80 border border-amber-500/25 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-amber-200/50 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Contacts Stream */}
          <div className="flex-1 overflow-y-auto space-y-1 p-2">
            {filteredChips.map((chip, idx) => {
              const isSelected = chip.id === activeChip.id;
              const avatarEmojis = ["🥔", "🍟", "🌮", "🧀", "🍿", "🥨"];
              const avatarEmoji = avatarEmojis[idx % avatarEmojis.length];
              const threads = chatThreads[chip.id] || [];
              const lastMsg = threads[threads.length - 1];

              return (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => setActiveChipId(chip.id)}
                  className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-amber-500/20 border border-amber-500/40 shadow-md"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-slate-950 border border-amber-500/30 flex items-center justify-center text-xl shadow-inner">
                      {avatarEmoji}
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-amber-400 border-2 border-slate-900" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{chip.name}</span>
                      <span className="text-[10px] text-amber-200/60 font-mono">2m</span>
                    </div>
                    <p className="text-[11px] text-amber-200/70 truncate mt-0.5">
                      {lastMsg ? lastMsg.text : chip.bio}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Chat Panel */}
        <div className="md:col-span-2 flex flex-col h-full bg-slate-950/90 relative">
          
          {/* Active Chat Header */}
          <div className="p-3.5 px-5 border-b border-amber-500/20 bg-slate-900/80 backdrop-blur-md flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-950 border border-amber-500/40 flex items-center justify-center text-xl shadow-sm">
                🥔
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  {activeChip.name}
                  <span className="text-[10px] text-amber-300 font-mono font-normal">({activeChip.username})</span>
                </h4>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Online in Bowl 🥣</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                {activeChip.id}
              </span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#2a1708_1px,transparent_1px)] [background-size:16px_16px]">
            {activeMessages.map((msg, index) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={index}
                  className={`flex flex-col max-w-[80%] ${
                    isUser ? "ml-auto items-end" : "mr-auto items-start"
                  } animate-in fade-in slide-in-from-bottom-2 duration-200`}
                >
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-xs leading-relaxed shadow-lg ${
                      isUser
                        ? "bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-semibold rounded-br-none"
                        : "bg-slate-900 text-amber-100 border border-amber-500/20 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-amber-200/60 font-mono">
                    <span>{msg.time}</span>
                    {isUser && <CheckCheck className="w-3 h-3 text-amber-400" />}
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Interactive Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-amber-500/20 bg-slate-900/90 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Message ${activeChip.name}... (e.g. "Stay crispy!")`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-950 border border-amber-500/25 rounded-xl px-4 py-2.5 text-xs text-white placeholder-amber-200/50 focus:outline-none focus:border-amber-400 transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-xl font-bold transition-all duration-200 flex items-center justify-center ${
                inputText.trim()
                  ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 cursor-pointer shadow-lg hover:scale-105"
                  : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
