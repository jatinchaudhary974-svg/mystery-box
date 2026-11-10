export type SurpriseCategory = "funny" | "visual" | "puzzle" | "wholesome" | "weird";
export type SurpriseType = "interactive" | "visual" | "message";

export interface Surprise {
  id: string;
  title: string;
  category: SurpriseCategory;
  description: string;
  type: SurpriseType;
  /** Identifier of the dedicated visual/interaction treatment. */
  visual?: string;
  shareText: string;
}

export const CATEGORY_LABEL: Record<SurpriseCategory, string> = {
  funny: "Funny",
  visual: "Visual",
  puzzle: "Puzzle",
  wholesome: "Wholesome",
  weird: "Weird",
};

export const SURPRISES: Surprise[] = [
  // Funny
  { id: "useless-superpower", title: "Useless Superpower", category: "funny", type: "interactive", visual: "superpower",
    description: "Congratulations. You have been granted a power of absolutely no strategic value. Use it wisely. Or loudly.",
    shareText: "I opened a box and got a useless superpower. Mine is honestly tragic." },
  { id: "invisible-trophy", title: "Invisible Trophy", category: "funny", type: "interactive", visual: "trophy",
    description: "Awarded for an achievement so impressive it can't be seen by the naked eye. Polish it regularly.",
    shareText: "I just won an Invisible Trophy. You'll have to take my word for it." },
  { id: "ceo-of-nothing", title: "CEO of Doing Nothing", category: "funny", type: "visual", visual: "ceo",
    description: "Your promotion is effective immediately. Responsibilities: none. Meetings: optional. Snacks: mandatory.",
    shareText: "Promoted to CEO of Doing Nothing. Ask me how I did it (I won't)." },
  { id: "dancing-potato", title: "Dancing Potato", category: "funny", type: "interactive", visual: "potato",
    description: "He's starchy. He's groovy. He has been waiting in this box his whole life for this moment. Tap to change his moves.",
    shareText: "A potato danced for me today. What's inside your box?" },
  { id: "unexpected-answer", title: "Unexpected Answer", category: "funny", type: "interactive", visual: "answer",
    description: "Life's big questions, answered with total confidence and zero accuracy.",
    shareText: "I finally got answers to life's big questions. They were wrong, but confident." },
  // Visual
  { id: "tiny-galaxy", title: "Tiny Galaxy", category: "visual", type: "visual", visual: "galaxy",
    description: "A whole spiral galaxy, shrunk to fit in a box. Roughly 400 billion stars. Please don't shake it.",
    shareText: "I found a tiny galaxy inside a box." },
  { id: "liquid-universe", title: "Liquid Universe", category: "visual", type: "visual", visual: "liquid",
    description: "A universe that never quite decided on a shape. Watch it melt, merge, and drift.",
    shareText: "I opened a box and a liquid universe spilled out." },
  { id: "golden-particle-storm", title: "Golden Particle Storm", category: "visual", type: "interactive", visual: "storm",
    description: "A swarm of golden light that follows your every move. Drag, swipe, or wave your cursor around.",
    shareText: "I conducted a golden particle storm. Try it yourself." },
  { id: "infinite-tunnel", title: "Infinite Tunnel", category: "visual", type: "visual", visual: "tunnel",
    description: "It keeps going. Nobody knows where. Staring is encouraged; entering is not.",
    shareText: "Found an infinite tunnel in a box. Still haven't reached the end." },
  { id: "floating-island", title: "Floating Island", category: "visual", type: "visual", visual: "island",
    description: "A small, peaceful island drifting above the clouds. Population: one very relaxed tree.",
    shareText: "I got a floating island. Moving there soon." },
  // Puzzle
  { id: "one-minute-riddle", title: "One-Minute Riddle", category: "puzzle", type: "interactive", visual: "riddle",
    description: "Sixty seconds. One riddle. Your brain versus the clock.",
    shareText: "I got a one-minute riddle in a mystery box. Can you beat the clock?" },
  { id: "optical-illusion", title: "Optical Illusion", category: "puzzle", type: "visual", visual: "illusion",
    description: "Every horizontal line here is perfectly straight and parallel. Your eyes will insist otherwise.",
    shareText: "These lines are perfectly straight. My brain disagrees." },
  { id: "hidden-object", title: "Hidden Object", category: "puzzle", type: "interactive", visual: "hidden",
    description: "Somewhere among these stars hides a single moon. Find it.",
    shareText: "There's a moon hiding among the stars. Found it?" },
  { id: "pattern-challenge", title: "Pattern Challenge", category: "puzzle", type: "interactive", visual: "pattern",
    description: "The sequence follows a rule. Spot it, and pick what comes next.",
    shareText: "Can you crack this pattern? I got one from a mystery box." },
  { id: "backwards-message", title: "Backwards Message", category: "puzzle", type: "interactive", visual: "backwards",
    description: "A secret message has been sealed inside, written the wrong way round. Can you read it before you flip it?",
    shareText: "I decoded a backwards message from a mystery box." },
  // Wholesome
  { id: "little-reminder", title: "A Little Reminder", category: "wholesome", type: "interactive", visual: "reminder",
    description: "Small, gentle reminders for whenever you need one. Tap for another.",
    shareText: "A mystery box reminded me to drink some water. Good box." },
  { id: "virtual-high-five", title: "Virtual High Five", category: "wholesome", type: "interactive", visual: "highfive",
    description: "Someone, somewhere, thinks you deserve this. Go on — leave them hanging? Never.",
    shareText: "I got a virtual high five. Passing it on to you." },
  { id: "appreciation-letter", title: "Tiny Appreciation Letter", category: "wholesome", type: "interactive", visual: "letter",
    description: "A small sealed envelope addressed simply: “To you.” Open it.",
    shareText: "A mystery box wrote me a tiny appreciation letter." },
  { id: "good-things-ahead", title: "Good Things Ahead", category: "wholesome", type: "interactive", visual: "fortune",
    description: "A small forecast of good things on their way. No guarantees, but strong vibes.",
    shareText: "My mystery box says good things are ahead." },
  { id: "pocket-of-positivity", title: "Pocket of Positivity", category: "wholesome", type: "interactive", visual: "pocket",
    description: "A pocket stuffed with kind little notes. Reach in and take one.",
    shareText: "I pulled a note from a Pocket of Positivity." },
  // Weird
  { id: "what-is-this-creature", title: "What Is This Creature?", category: "weird", type: "interactive", visual: "creature",
    description: "It blinked at us when we opened the box. We don't know what it is. Neither does it.",
    shareText: "A strange creature came out of my box. Help me identify it." },
  { id: "floating-button", title: "Floating Button", category: "weird", type: "interactive", visual: "button",
    description: "It's just a button. It wants to be pressed. It just doesn't want to be pressed by you. Yet.",
    shareText: "I spent way too long trying to press a button." },
  { id: "impossible-door", title: "Impossible Door", category: "weird", type: "interactive", visual: "door",
    description: "Behind this door is another door. Behind that one... well, you'll see.",
    shareText: "I found a door with only doors behind it." },
  { id: "tiny-digital-planet", title: "Tiny Digital Planet", category: "weird", type: "interactive", visual: "planet",
    description: "A pocket-sized world with one house, one moon, and a very short day. Tap it to spin time forward.",
    shareText: "I own a tiny digital planet now. Its days last two seconds." },
  { id: "unexpected-sound", title: "Unexpected Sound", category: "weird", type: "interactive", visual: "sound",
    description: "We trapped a sound in this box. We're not sure what made it. Press the button if you dare.",
    shareText: "I heard an unexpected sound from a mystery box. Can't unhear it." },
];

export function isValidSurprise(s: unknown): s is Surprise {
  if (!s || typeof s !== "object") return false;
  const x = s as Record<string, unknown>;
  return (
    typeof x.id === "string" && x.id.length > 0 &&
    typeof x.title === "string" && x.title.length > 0 &&
    typeof x.description === "string" && x.description.length > 0 &&
    typeof x.shareText === "string" && x.shareText.length > 0 &&
    typeof x.category === "string" && x.category in CATEGORY_LABEL &&
    (x.type === "interactive" || x.type === "visual" || x.type === "message")
  );
}

/** Keeps valid entries and drops duplicate ids (first wins). */
export function validateCollection(list: readonly unknown[]): Surprise[] {
  const seen = new Set<string>();
  const out: Surprise[] = [];
  for (const s of list) {
    if (isValidSurprise(s) && !seen.has(s.id)) {
      seen.add(s.id);
      out.push(s);
    }
  }
  return out;
}

/**
 * Uniform selection: every valid entry has exactly equal probability.
 * Repeats are allowed. Returns null for an empty collection.
 */
export function pickSurprise(list: readonly unknown[] = SURPRISES, rng: () => number = Math.random): Surprise | null {
  const valid = validateCollection(list);
  if (valid.length === 0) return null;
  const i = Math.min(Math.floor(rng() * valid.length), valid.length - 1);
  return valid[i];
}

export function getSurprise(id: string): Surprise | undefined {
  return SURPRISES.find((s) => s.id === id);
}
