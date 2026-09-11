/**
 * Dynamic Personality-Driven Gossip & Conversation Generator for ChipNet (Manglish Version)
 * Generates natural 2-4 turn conversations (max 15 words per message) in Manglish (Malayalam-English blend)
 * based on spatial bounding box relationships, edge proximity, clusters, and chip personalities.
 */

import { analyzeChipSpatialData } from "./spatialAnalysis";

const CATEGORIES = [
  { label: "👀 Rumor", bg: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  { label: "🚨 Breaking News", bg: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
  { label: "😂 Meme", bg: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
  { label: "❤️ Friendship", bg: "bg-pink-500/20 text-pink-300 border-pink-500/30" },
  { label: "😱 Panic", bg: "bg-red-500/20 text-red-300 border-red-500/30" },
  { label: "🎉 Celebration", bg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
];

/**
 * Format dynamic message turn in Manglish based on personality and spatial event
 * Ensures MAX 15 WORDS per message turn.
 */
function formatMessage(speaker, target, eventType) {
  const p = (speaker.personality || "").toLowerCase();
  const targetName = target ? target.name.split(" ")[0] : "machane";

  if (eventType === "EDGE_DANGER") {
    if (p.includes("dramatic") || p.includes("queen")) {
      return `Ayyo aliya! Njan edge-il aanu! Thazhe veenaal full scene aanu! 😱`;
    }
    if (p.includes("edgy") || p.includes("villain")) {
      return `Njan ingane edge-il irikkum bro. Abyss-ine enikku pediyilla! 🖤`;
    }
    if (p.includes("tiny") || p.includes("terror")) {
      return `Njan thazhe veenaal salsa bowl-um koode kondu pokumda! 😈`;
    }
    return `Nokki irundko aliya, thazhe veenu crumble aakaathe nokkenam! 🙈`;
  }

  if (eventType === "CLUSTER_PARTY") {
    if (p.includes("introvert") || p.includes("sleepy")) {
      return `Eda thalli nikkkeda! Ivide full crowd aanu, shwaasam kittunnilla! 😴`;
    }
    if (p.includes("happy")) {
      return `Poli vibe machane! Nammal ellavarum koode full crunch pile! 🎉`;
    }
    if (p.includes("chaotic")) {
      return `Sector 4-il full party aanu! Ellavarum dip cheyyan vaada! 🕺`;
    }
    return `Nammal tight pile aaneda, aarkkum nammale thodaan pattilla! 💪`;
  }

  if (eventType === "ISOLATED_LONE_WOLF") {
    if (p.includes("edgy") || p.includes("villain")) {
      return `Shadows-il irunnu njan ellaam kaanunundeda. Cluster fools! 🖤`;
    }
    if (p.includes("dramatic")) {
      return `Enne aarum salsa dip-inu vilichillallo... Enthau machane ingane? 🥺`;
    }
    return `Solo crisp vibe aanu bro. Extra salt enikku mathram! ✨`;
  }

  if (eventType === "LEADER_DRAMA") {
    if (p.includes("king") || p.includes("confident")) {
      return `Adangi irikkeda! Ee bowl-um guacamole-um njan aalum! 👑`;
    }
    return `Ee King chip athra valiya sambhavam onnum alla bro! ✊`;
  }

  if (eventType === "BLOCKING") {
    return `Eda ${targetName}, maari nikkedo! Ente salsa view block cheyyalle! 😒`;
  }

  // Default proximity gossip
  if (p.includes("dramatic")) {
    return `Eda ${targetName} double dip cheythath njan kanduda! Full scene! 😱`;
  }
  if (p.includes("happy")) {
    return `Aliya ${targetName}! Innale paranja snack bag poli aayirunno? 😊`;
  }
  return `Yo ${targetName}, stay crisp machane! Nammal poli aanu! 🥔`;
}

/**
 * Generate dynamic hashtags in Manglish
 */
export function generateDynamicHashtags(spatialData) {
  const hashtags = ["#PoliVibe", "#SceneAanu"];

  if (spatialData.edgeChips.length > 0) hashtags.push("#EdgeLife", "#ThazheVeelum");
  if (spatialData.clusterChips.length > 0) hashtags.push("#FullCrowd", "#StackSquad");
  if (spatialData.isolatedChips.length > 0) hashtags.push("#SoloCrisp", "#LoneWolf");
  if (spatialData.largestChip) hashtags.push("#KingOfTheBowl");
  if (spatialData.brokenChips.length > 0) hashtags.push("#CrumbleScene");

  hashtags.push("#GuacPoli", "#SaltGang", "#DipMachan");

  // Return unique top 6 hashtags
  return Array.from(new Set(hashtags)).slice(0, 6);
}

/**
 * Dynamically synthesizes a new single gossip post or 2-4 turn conversation thread in Manglish
 */
export function generateDynamicGossipPost(chips = [], imageSize = { width: 800, height: 600 }) {
  if (!chips || chips.length === 0) return null;

  const spatialData = analyzeChipSpatialData(chips, imageSize);
  const { chipsWithSpatial, edgeChips, isolatedChips, clusterChips, blockingPairs, largestChip, brokenChips } = spatialData;

  // Pick an event type based on spatial conditions
  const eventTypes = [];
  if (edgeChips.length > 0) eventTypes.push("EDGE_DANGER");
  if (clusterChips.length > 0) eventTypes.push("CLUSTER_PARTY");
  if (isolatedChips.length > 0) eventTypes.push("ISOLATED_LONE_WOLF");
  if (largestChip) eventTypes.push("LEADER_DRAMA");
  if (blockingPairs.length > 0) eventTypes.push("BLOCKING");
  if (brokenChips.length > 0) eventTypes.push("BROKEN_DRAMA");
  if (eventTypes.length === 0) eventTypes.push("PROXIMITY_CHAT");

  const selectedEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  let mainSpeaker = chipsWithSpatial[Math.floor(Math.random() * chipsWithSpatial.length)];
  let targetChip = null;

  if (selectedEvent === "EDGE_DANGER" && edgeChips.length > 0) {
    mainSpeaker = edgeChips[Math.floor(Math.random() * edgeChips.length)];
  } else if (selectedEvent === "CLUSTER_PARTY" && clusterChips.length > 0) {
    mainSpeaker = clusterChips[Math.floor(Math.random() * clusterChips.length)];
  } else if (selectedEvent === "ISOLATED_LONE_WOLF" && isolatedChips.length > 0) {
    mainSpeaker = isolatedChips[Math.floor(Math.random() * isolatedChips.length)];
  } else if (selectedEvent === "LEADER_DRAMA" && largestChip) {
    mainSpeaker = largestChip;
  } else if (selectedEvent === "BLOCKING" && blockingPairs.length > 0) {
    const pair = blockingPairs[Math.floor(Math.random() * blockingPairs.length)];
    mainSpeaker = pair.blocked;
    targetChip = pair.blocker;
  }

  // Pick target chip if not set
  if (!targetChip) {
    const candidateTargets = chipsWithSpatial.filter((c) => c.originalIndex !== mainSpeaker.originalIndex);
    targetChip = candidateTargets.length > 0 ? candidateTargets[Math.floor(Math.random() * candidateTargets.length)] : null;
  }

  // Generate 2 to 4 conversation turns in Manglish (max 15 words per message)
  const numTurns = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4 turns
  const conversation = [];

  // Turn 1 (Main Speaker)
  const turn1Text = formatMessage(mainSpeaker, targetChip, selectedEvent);
  conversation.push({
    sender: mainSpeaker.name,
    username: mainSpeaker.username,
    avatar: getAvatarEmoji(mainSpeaker.originalIndex),
    text: enforceMaxWords(turn1Text, 15),
    time: "Just now",
  });

  // Turn 2 (Target Reply in Manglish)
  if (numTurns >= 2 && targetChip) {
    const replyText = formatReply(targetChip, mainSpeaker, selectedEvent);
    conversation.push({
      sender: targetChip.name,
      username: targetChip.username,
      avatar: getAvatarEmoji(targetChip.originalIndex),
      text: enforceMaxWords(replyText, 15),
      time: "Just now",
    });
  }

  // Turn 3 (Main Speaker Counter in Manglish)
  if (numTurns >= 3 && targetChip) {
    const counterText = `${mainSpeaker.personality?.includes("King") ? "Athokke anganeya!" : "Poli machane!"} Nammal aanu ee bowl-ile rulers! 🥔🔥`;
    conversation.push({
      sender: mainSpeaker.name,
      username: mainSpeaker.username,
      avatar: getAvatarEmoji(mainSpeaker.originalIndex),
      text: enforceMaxWords(counterText, 15),
      time: "Just now",
    });
  }

  // Turn 4 (Target Final Word in Manglish)
  if (numTurns >= 4 && targetChip) {
    const finalWordText = `Shedda! Kurachu guacamole enikku maati vekkeda! 🥑✨`;
    conversation.push({
      sender: targetChip.name,
      username: targetChip.username,
      avatar: getAvatarEmoji(targetChip.originalIndex),
      text: enforceMaxWords(finalWordText, 15),
      time: "Just now",
    });
  }

  const reactionEmojis = ["🔥", "😂", "😱", "🥑", "👑", "💖", "🧂"];
  const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];

  return {
    id: `gossip-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    category,
    event: selectedEvent,
    speaker: mainSpeaker,
    target: targetChip,
    conversation,
    reactionEmoji,
    likes: Math.floor(Math.random() * 80) + 12,
    timestamp: "Just now",
  };
}

function formatReply(targetChip, mainSpeaker, eventType) {
  const name = mainSpeaker.name.split(" ")[0];

  if (eventType === "EDGE_DANGER") {
    return `Eda ${name}, pedikenda! Kai thaa, njan pidikkam! 🤝`;
  }
  if (eventType === "CLUSTER_PARTY") {
    return `Scene illa ${name}! Full crowd aayal kooduthal crunch aakam! 🎉`;
  }
  if (eventType === "ISOLATED_LONE_WOLF") {
    return `Ivide vaada ${name}! Salsa ivide ചൂട് aayi irikkunnu! 🥑`;
  }
  if (eventType === "LEADER_DRAMA") {
    return `King aanennu paranjitt kaaryam illa ${name}, dip aadyam enikku! 👑`;
  }
  return `Aliya ${name}, njan koode undeda! Stay crisp bro! 💪`;
}

function enforceMaxWords(text, maxWords = 15) {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}

function getAvatarEmoji(index) {
  const avatars = ["🥔", "🍟", "🌮", "🧀", "🍿", "🥨"];
  return avatars[index % avatars.length];
}
