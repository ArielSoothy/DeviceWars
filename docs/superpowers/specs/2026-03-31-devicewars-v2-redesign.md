# DeviceWars v2 — Complete Redesign Spec

## Context

DeviceWars is a device battler game that converts hardware specs into RPG combat stats. The current version (v1) was built early on — it works but has a 534-line monolithic component, only 6 MacBook devices, duplicate code, a stale medieval/generic theme, CSS with ~300 lines of dead styles, and an async race condition in battle logic. This redesign transforms it into a polished, fun, portfolio-worthy product.

**What prompted this**: The developer wants to revisit this project with stronger tools and taste — making it both a genuinely entertaining game and a technical showcase.

**Intended outcome**: A dark-themed, fighting-game-inspired battle arena with expanded device roster, smooth animations, clean architecture, and a foundation for future social/sharing features.

---

## Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Visual direction | Gaming Dark | Dark theme with fighting-game energy, Player 1 (red) / Player 2 (blue) framing. Fun AND portfolio-worthy. |
| Layout | Single Screen | Everything visible — no scrolling during battle. Follows fighting game UI conventions. |
| Tech stack | Framer Motion + Tailwind | Battle-tested, deeply known, proven at scale. No bleeding-edge risks. |
| Characters | Keep pixel art + CSS rank auras | Existing 4 pixel art characters are charming. Differentiate ranks via CSS glow/color effects rather than 14 separate images. |
| Device roster | Apple ecosystem first → expand | Start with ~15 devices: Macs, iPhones, iPads, Steam Deck, PS5, Gaming PC. The "phone chip vs desktop chip" narrative is compelling. |
| Animation scope | Core now, fancy later | Framer Motion infrastructure + damage numbers + HP transitions now. Screen shake, particles, combos in Phase 2. |

---

## Architecture

### Current (monolith)
```
src/app/page.js (534 lines) — everything
src/data/devices.js — 6 devices, duplicate calculateRank
src/app/styles/styles.css — 622 lines, ~300 dead
```

### Target (decomposed)
```
src/
├── app/
│   ├── page.js                → Slim orchestrator (~80 lines)
│   ├── layout.js              → Dark theme body, fonts
│   ├── globals.css            → CSS reset, dark theme variables
│   └── styles/
│       └── styles.css         → Complete rewrite, dark theme system
│
├── components/
│   ├── BattleArena.jsx        → Main arena layout, battle state orchestration
│   ├── FighterCard.jsx        → Device card: character, name, rank, HP/mana, stats
│   ├── FighterCharacter.jsx   → Pixel art image + rank-based CSS aura/glow
│   ├── BattleControls.jsx     → VS indicator, start button, round counter, winner
│   ├── BattleLog.jsx          → Scrolling combat feed, color-coded entries
│   ├── DeviceSelector.jsx     → Categorized dropdown (Mac / iPhone / iPad / PC / Console)
│   ├── DamageNumber.jsx       → Floating damage number animation (Framer Motion)
│   └── StatGrid.jsx           → Compact 3-column stat display (ATK/DEF/SPD etc.)
│
├── lib/
│   ├── battle-engine.js       → Pure JS: damage calc, turn logic, no React
│   ├── stats.js               → Single source: calculateRank + calculateStats
│   └── utils.js               → cn() utility (existing)
│
└── data/
    └── devices.js             → ~15 devices, categorized by type
```

### Key Principles
- **Battle logic is pure JS** — no React dependencies, independently testable
- **`calculateRank` exists in ONE place** — `lib/stats.js`, imported everywhere
- **Components are focused** — each does one thing, ~50-100 lines max
- **State lives in BattleArena** — passed down as props, no prop drilling beyond 2 levels

---

## Visual Design System

### Colors (CSS custom properties)
```
--bg-primary: #0c1222          (deep navy background)
--bg-secondary: #1a1033        (gradient end)
--surface: rgba(255,255,255,0.04)   (card backgrounds)
--surface-border: rgba(255,255,255,0.08)
--surface-hover: rgba(255,255,255,0.06)

--player1: #ff6b6b             (red — attack, HP, Player 1)
--player2: #4dabf7             (blue — defense, mana, Player 2)
--gold: #ffd700                (rankings, crits, victory)
--magic: #9c88ff               (spell power, magic damage)
--speed: #51cf66               (speed, regen, healing)
--text-primary: #e2e8f0        (main text)
--text-secondary: #94a3b8      (secondary text)
--text-dim: #475569            (labels, low-priority)
```

### Typography
- **Geist Sans** (already loaded): UI text, names, labels
- **Geist Mono**: Stat numbers, damage values, HP counts — gives a techy feel

### Rank Visual System
Each rank gets a CSS aura effect on their character image:

| Tier | Ranks | Aura Effect |
|------|-------|-------------|
| Legendary | Archangel, Black Dragon | Gold pulsing glow, strong shadow |
| Epic | Titan, Hydra, Behemoth | Purple glow |
| Rare | Gold Dragon, Phoenix | Orange/amber glow |
| Common | Cyclops, Minotaur, Griffin | Subtle white glow |
| Low | Centaur, Goblin, Peasant | Dim gray, no glow |
| Trash | Skeleton | Flickering dim effect |

### Card Structure (FighterCard)
```
┌─────────────────────────────┐
│  PLAYER 1          [rank]   │
│                              │
│        [character img]       │  ← pixel art + rank aura
│        with CSS glow         │
│                              │
│  Device Name                 │
│  ★ Rank Title                │
│                              │
│  HP ████████░░ 6800/8000     │  ← red gradient bar
│  MP ████░░░░░░  420/960      │  ← blue gradient bar
│                              │
│  ┌─────┬─────┬─────┐        │
│  │ 320 │  96 │  44 │        │  ← compact stat grid
│  │ ATK │ DEF │ SPD │        │
│  ├─────┼─────┼─────┤        │
│  │ 320 │  40 │  15 │        │
│  │ MAG │MDEF │REGEN│        │
│  └─────┴─────┴─────┘        │
└─────────────────────────────┘
```

---

## Device Database (Phase 1: ~15 devices)

### Apple Mac
| Device | Geekbench | Rank | Key Stat |
|--------|-----------|------|----------|
| MacBook Pro M3 Max | 3128 | Archangel | 96GB RAM, 40-core GPU |
| MacBook Pro M3 Pro | 2850 | Black Dragon | 36GB RAM, 18-core GPU |
| MacBook Pro M2 Max | 2750 | Titan | 64GB RAM, 38-core GPU |
| MacBook Pro M1 Max | 2374 | Hydra | 32GB RAM, 24-core GPU |
| MacBook Pro M1 Pro | 2388 | Hydra | 16GB RAM, 16-core GPU |
| MacBook Air M2 | 1899 | Phoenix | 16GB RAM, 10-core GPU |
| MacBook Pro i9 2019 | 1377 | Minotaur | 16GB DDR4, Radeon Pro |
| MacBook Pro i7 2019 | 1291 | Griffin | 16GB DDR4, Radeon Pro |

### Apple Mobile
| Device | Geekbench | Rank | Key Stat |
|--------|-----------|------|----------|
| iPhone 16 Pro Max | 3400 | Archangel | A18 Pro, 8GB RAM |
| iPhone 15 Pro | 2900 | Black Dragon | A17 Pro, 8GB RAM |
| iPhone 13 | 1700 | Cyclops | A15, 4GB RAM |
| iPad Pro M4 | 3600 | Archangel | M4 chip, 16GB RAM |
| iPad Air M2 | 2600 | Titan | M2 chip, 8GB RAM |

### Gaming / PC / Console
| Device | Geekbench | Rank | Key Stat |
|--------|-----------|------|----------|
| Gaming PC (RTX 4090) | 2800 | Black Dragon | 64GB DDR5, RTX 4090 |
| Steam Deck | 900 | Goblin | 16GB, RDNA 2 |
| PS5 | 1100 | Centaur | 16GB GDDR6, 36 CU |

### Device Selector UI
Categorized dropdown with headers:
```
── Apple Mac ──
MacBook Pro M3 Max
MacBook Air M2
...
── Apple Mobile ──
iPhone 16 Pro Max
iPad Pro M4
...
── Gaming ──
Gaming PC (RTX 4090)
Steam Deck
PS5
```

---

## Battle Engine Fixes

### Race Condition Fix
**Problem**: `executeTurn` calls `handleAttack` then checks `currentHP2 > 0`, but React state updates are async — the HP hasn't actually changed yet.

**Fix**: `executeTurn` uses local variables to track damage within the turn:
```js
// Pseudocode
const turn = executeTurn(fighter1, fighter2, currentHP1, currentHP2, currentMana1, currentMana2);
// Returns: { newHP1, newHP2, newMana1, newMana2, events[] }
// Then batch-update all state at once
```

The battle engine becomes a pure function: `(state) → (newState, events)`. React just renders the results.

### Battle Log Improvement
Each log entry becomes a structured object instead of a string:
```js
{
  type: 'attack' | 'spell' | 'dodge' | 'crit' | 'regen' | 'victory',
  attacker: string,
  defender: string,
  damage: number,
  defenseBlocked: number,
  isCritical: boolean,
  manaCost: number
}
```
This lets the BattleLog component render with proper colors, icons, and formatting.

---

## Animation System (Phase 1)

Using **Framer Motion** (npm: `framer-motion`):

| Element | Animation | Implementation |
|---------|-----------|----------------|
| HP/Mana bars | Smooth width transition | `motion.div` with `animate={{ width }}` |
| Card entrance | Slide up + fade in | `initial={{ y: 20, opacity: 0 }}` |
| Damage numbers | Float up + fade out | `DamageNumber` component with exit animation |
| Tab content | Cross-fade | `AnimatePresence` with opacity transition |
| Battle log entry | Slide in from bottom | `motion.div` with `initial={{ y: 10 }}` |
| Winner announcement | Scale pop | `animate={{ scale: [0.8, 1.1, 1] }}` |
| Character attack | Horizontal lunge | `animate={{ x: 15 }}` then return |
| Character hit | Shake | `animate={{ x: [-6, 6, -6, 6, 0] }}` |

### Phase 2 (later)
- Screen shake on critical hit (transform the arena container)
- Spell cast glow effect (box-shadow pulse on attacker)
- Victory confetti/celebration
- Combo counter for consecutive hits

---

## Cleanup

### Remove
- ~300 lines of dead medieval CSS (`.device-card`, `.card-header`, `.hp-bar`, `.mana-bar`, etc.)
- Duplicate `calculateRank` in `devices.js` (keep only `lib/stats.js`)
- Unused deps: `@radix-ui/react-icons`, `@radix-ui/react-slot`, `class-variance-authority`
- Inline `<style>` block in page.js (move to CSS)

### Add
- `framer-motion` package
- `.superpowers/` to `.gitignore`

### Fix
- M2 Air Geekbench: 12,450 → 1,899
- `efficiencyCores` fallback handling (some Intel chips have 0)
- Inline `HPBar` component → proper component

---

## Responsive Design

### Desktop (>768px)
- Horizontal layout: `[Fighter 1] [Controls] [Fighter 2]`
- Full stat grids visible
- Battle log below the arena

### Mobile (<768px)
- Vertical stack: Fighter 1 → Controls → Fighter 2
- Compact stat grid (3 cols maintained, smaller text)
- Battle log collapsible or below
- Touch-friendly select dropdowns

---

## Verification Plan

1. **Build check**: `npm run build` must succeed with zero errors
2. **Type check**: `npx tsc --noEmit` (if tsconfig exists, or ESLint)
3. **Visual check**: Run `npm run dev`, verify:
   - Dark theme renders correctly
   - Both fighters display with proper rank auras
   - Device selector shows categorized list
   - Battle runs smoothly with damage numbers
   - HP/mana bars animate smoothly
   - Battle log shows color-coded entries
   - Responsive layout works on mobile viewport
4. **Battle logic**: Verify no race condition:
   - A fighter with 1 HP remaining should die when hit
   - Winner announcement should appear immediately
   - No "ghost attacks" after a fighter dies
5. **GitHub Pages**: Push to main, verify deployment at arielsoothy.github.io/DeviceWars/
6. **Asset paths**: Character images load correctly on both dev and production

---

## Phases

### Phase 1 (This Implementation)
- Complete architecture decomposition
- Dark theme design system
- Expanded device roster (~15 devices)
- Core Framer Motion animations (HP bars, damage numbers, entrances)
- Battle engine fixes (race condition, structured log)
- CSS cleanup (remove dead styles)
- Dependency cleanup

### Phase 2 (Future)
- Advanced battle effects (screen shake, spell visuals, combos)
- Social sharing (battle result screenshots/cards)
- Sound effects
- Tournament mode
- Battle history
- More devices (Android phones, more consoles)
