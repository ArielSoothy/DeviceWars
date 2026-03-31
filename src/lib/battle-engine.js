import { getThermalMultiplier } from './stats';

export function calculateDamage(attacker, defender, currentMana, thermalMult, isSpellAttack = false) {
  if (isSpellAttack) {
    const manaCost = Math.floor(attacker.spellPower * 0.3);
    if (currentMana < manaCost) {
      return {
        damage: 0, isDodged: false, isCritical: false,
        manaCost: 0, defenseBlocked: 0, type: 'spell-failed',
      };
    }
    const baseDamage = (attacker.spellPower * 0.8 * thermalMult) + (attacker.maxMana * 0.2);
    const defense = defender.magicDefense * 0.5;
    const isCritical = Math.random() < 0.25;
    const finalDamage = Math.max(1, Math.floor((baseDamage - defense) * (isCritical ? 1.8 : 1)));
    return {
      damage: finalDamage, isDodged: false, isCritical,
      manaCost, defenseBlocked: Math.floor(defense), type: 'spell',
    };
  }

  const baseDamage = (attacker.strength * 0.6 * thermalMult) + (attacker.speed * 0.2);
  const defense = defender.physicalDefense * 0.4;
  const dodgeChance = Math.max(0, Math.min(0.5, (defender.speed - attacker.speed) * 0.01));

  if (Math.random() < dodgeChance) {
    return {
      damage: 0, isDodged: true, isCritical: false,
      manaCost: 0, defenseBlocked: 0, type: 'physical',
    };
  }

  const isCritical = Math.random() < 0.2;
  const finalDamage = Math.max(1, Math.floor((baseDamage - defense) * (isCritical ? 1.5 : 1)));
  return {
    damage: finalDamage, isDodged: false, isCritical,
    manaCost: 0, defenseBlocked: Math.floor(defense), type: 'physical',
  };
}

function processAttack(attacker, defender, attackerMana, thermalMult) {
  const useSpell = attackerMana >= attacker.spellPower * 0.3 && Math.random() < 0.4;
  return calculateDamage(attacker, defender, attackerMana, thermalMult, useSpell);
}

export function executeTurn({ fighter1, fighter2, hp1, hp2, mana1, mana2, round }) {
  const events = [];

  // Thermal multipliers — fanless burst early, tower ramps up
  const thermal1 = getThermalMultiplier(fighter1.cooling, round);
  const thermal2 = getThermalMultiplier(fighter2.cooling, round);

  // Regeneration phase
  let newHP1 = Math.min(fighter1.maxHP, hp1 + fighter1.hpRegen);
  let newHP2 = Math.min(fighter2.maxHP, hp2 + fighter2.hpRegen);
  let newMana1 = Math.min(fighter1.maxMana, mana1 + fighter1.manaRegen);
  let newMana2 = Math.min(fighter2.maxMana, mana2 + fighter2.manaRegen);

  // Determine turn order by speed (thermal affects speed too)
  const spd1 = fighter1.speed * thermal1;
  const spd2 = fighter2.speed * thermal2;
  const fighter1First = spd1 > spd2 || (spd1 === spd2 && Math.random() < 0.5);

  const first = fighter1First
    ? { fighter: fighter1, num: 1, thermal: thermal1 }
    : { fighter: fighter2, num: 2, thermal: thermal2 };
  const second = fighter1First
    ? { fighter: fighter2, num: 2, thermal: thermal2 }
    : { fighter: fighter1, num: 1, thermal: thermal1 };

  // First attacker strikes
  const firstMana = first.num === 1 ? newMana1 : newMana2;
  const attack1 = processAttack(first.fighter, second.fighter, firstMana, first.thermal);

  if (attack1.type === 'spell' && attack1.manaCost > 0) {
    if (first.num === 1) newMana1 -= attack1.manaCost;
    else newMana2 -= attack1.manaCost;
  }

  events.push({
    attacker: first.fighter.name,
    attackerNum: first.num,
    defender: second.fighter.name,
    defenderNum: second.num,
    thermal: Math.round(first.thermal * 100),
    ...attack1,
  });

  if (!attack1.isDodged && attack1.damage > 0) {
    if (second.num === 1) newHP1 = Math.max(0, newHP1 - attack1.damage);
    else newHP2 = Math.max(0, newHP2 - attack1.damage);
  }

  // Check if defender died
  const defenderHP = second.num === 1 ? newHP1 : newHP2;
  if (defenderHP <= 0) {
    events.push({ type: 'victory', attacker: first.fighter.name, attackerNum: first.num });
    return { hp1: newHP1, hp2: newHP2, mana1: newMana1, mana2: newMana2, events, winner: first.num };
  }

  // Second attacker counter-strikes
  const secondMana = second.num === 1 ? newMana1 : newMana2;
  const attack2 = processAttack(second.fighter, first.fighter, secondMana, second.thermal);

  if (attack2.type === 'spell' && attack2.manaCost > 0) {
    if (second.num === 1) newMana1 -= attack2.manaCost;
    else newMana2 -= attack2.manaCost;
  }

  events.push({
    attacker: second.fighter.name,
    attackerNum: second.num,
    defender: first.fighter.name,
    defenderNum: first.num,
    thermal: Math.round(second.thermal * 100),
    ...attack2,
  });

  if (!attack2.isDodged && attack2.damage > 0) {
    if (first.num === 1) newHP1 = Math.max(0, newHP1 - attack2.damage);
    else newHP2 = Math.max(0, newHP2 - attack2.damage);
  }

  // Check if first attacker died from counter
  const firstHP = first.num === 1 ? newHP1 : newHP2;
  let winner = null;
  if (firstHP <= 0) {
    winner = second.num;
    events.push({ type: 'victory', attacker: second.fighter.name, attackerNum: second.num });
  }

  return { hp1: newHP1, hp2: newHP2, mana1: newMana1, mana2: newMana2, events, winner };
}
