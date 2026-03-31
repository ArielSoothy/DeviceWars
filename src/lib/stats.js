export const RANKS = [
  { minScore: 3000, title: 'Archangel', multiplier: 2.0, tier: 'legendary', character: 'dragon' },
  { minScore: 2800, title: 'Black Dragon', multiplier: 1.9, tier: 'legendary', character: 'dragon' },
  { minScore: 2600, title: 'Titan', multiplier: 1.8, tier: 'epic', character: 'griffin' },
  { minScore: 2400, title: 'Hydra', multiplier: 1.7, tier: 'epic', character: 'griffin' },
  { minScore: 2200, title: 'Behemoth', multiplier: 1.6, tier: 'epic', character: 'griffin' },
  { minScore: 2000, title: 'Gold Dragon', multiplier: 1.5, tier: 'rare', character: 'dragon' },
  { minScore: 1800, title: 'Phoenix', multiplier: 1.4, tier: 'rare', character: 'phoenix' },
  { minScore: 1600, title: 'Cyclops', multiplier: 1.3, tier: 'common', character: 'unicorn' },
  { minScore: 1400, title: 'Minotaur', multiplier: 1.2, tier: 'common', character: 'unicorn' },
  { minScore: 1200, title: 'Griffin', multiplier: 1.1, tier: 'common', character: 'griffin' },
  { minScore: 1000, title: 'Centaur', multiplier: 1.0, tier: 'low', character: 'unicorn' },
  { minScore: 800, title: 'Goblin', multiplier: 0.9, tier: 'low', character: 'griffin' },
  { minScore: 600, title: 'Peasant', multiplier: 0.8, tier: 'low', character: 'griffin' },
  { minScore: 0, title: 'Skeleton', multiplier: 0.7, tier: 'trash', character: 'griffin' },
];

// Architecture traits — displayed on card, combat bonuses in Phase 2
export const ARCHITECTURES = {
  'apple-silicon': { name: 'Unified Memory', icon: '🔗', description: 'CPU, GPU & Neural Engine share memory' },
  'discrete-gpu':  { name: 'Dedicated VRAM', icon: '💎', description: 'GPU has its own memory pool' },
  'mobile-chip':   { name: 'Burst Mode', icon: '⚡', description: 'Optimized for peak burst performance' },
  'amd-apu':       { name: 'Power Efficient', icon: '♻️', description: 'Sustained performance under load' },
  'legacy-intel':  { name: 'Battle Hardened', icon: '🛡️', description: 'Proven x86 workhorse' },
};

export function calculateRank(geekbench) {
  return RANKS.find(r => geekbench >= r.minScore) || RANKS[RANKS.length - 1];
}

export function calculateStats(device) {
  const rank = calculateRank(device.geekbench);
  return {
    // HP from storage — phones are fragile, desktops are tanky
    maxHP: Math.floor(device.storage * 2),
    hpRegen: Math.floor(device.storageSpeed * 2),

    // ATK from multi-core benchmark — total combat power
    strength: Math.floor(device.geekbenchMulti / 100),

    // DEF from core architecture — P-cores block hard, E-cores help
    physicalDefense: Math.floor((device.performanceCores * 8) + ((device.efficiencyCores || 0) * 4)),

    // SPD from single-core benchmark — reflexes, initiative
    speed: Math.floor(device.geekbench / 50),

    // Mana from RAM — your spell resource pool
    maxMana: Math.floor(device.ram * 10),
    manaRegen: Math.floor(device.ramSpeed * 2),

    // Spell Power from GPU — magic damage
    spellPower: Math.floor(device.gpu * 8),

    // Magic defense from efficiency cores (background resilience)
    magicDefense: Math.floor((device.efficiencyCores || 0) * 10),

    // Meta
    rank: rank.title,
    tier: rank.tier,
    character: rank.character,
    multiplier: rank.multiplier,
    architecture: device.architecture || null,
  };
}
