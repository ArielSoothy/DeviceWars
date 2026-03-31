"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import FighterCard from './FighterCard';
import BattleControls from './BattleControls';
import BattleLog from './BattleLog';
import DamageNumber from './DamageNumber';
import deviceDatabase from '@/data/devices';
import { calculateStats } from '@/lib/stats';
import { executeTurn } from '@/lib/battle-engine';

export default function BattleArena() {
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);
  const [hp1, setHP1] = useState(0);
  const [hp2, setHP2] = useState(0);
  const [mana1, setMana1] = useState(0);
  const [mana2, setMana2] = useState(0);
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [round, setRound] = useState(0);
  const [damages, setDamages] = useState([]);
  const [attackState, setAttackState] = useState({ a1: false, a2: false, h1: false, h2: false });

  const eventIdRef = useRef(0);
  const damageIdRef = useRef(0);

  // Use refs to always have current values in the battle loop
  const hp1Ref = useRef(hp1);
  const hp2Ref = useRef(hp2);
  const mana1Ref = useRef(mana1);
  const mana2Ref = useRef(mana2);

  useEffect(() => { hp1Ref.current = hp1; }, [hp1]);
  useEffect(() => { hp2Ref.current = hp2; }, [hp2]);
  useEffect(() => { mana1Ref.current = mana1; }, [mana1]);
  useEffect(() => { mana2Ref.current = mana2; }, [mana2]);

  const selectDevice = useCallback((deviceName, position) => {
    const raw = deviceDatabase[deviceName];
    if (!raw) return;
    const stats = calculateStats(raw);
    const device = { name: deviceName, ...raw, ...stats };

    if (position === 1) {
      setFighter1(device);
      setHP1(device.maxHP);
      setMana1(device.maxMana);
    } else {
      setFighter2(device);
      setHP2(device.maxHP);
      setMana2(device.maxMana);
    }
    setWinner(null);
    setBattleLog([]);
  }, []);

  const startBattle = useCallback(() => {
    if (!fighter1 || !fighter2 || isBattling) return;
    setIsBattling(true);
    setWinner(null);
    setRound(0);
    setHP1(fighter1.maxHP);
    setHP2(fighter2.maxHP);
    setMana1(fighter1.maxMana);
    setMana2(fighter2.maxMana);
    setDamages([]);
    setBattleLog([]);
  }, [fighter1, fighter2, isBattling]);

  useEffect(() => {
    if (!isBattling || !fighter1 || !fighter2) return;

    const timeout = setTimeout(() => {
      const result = executeTurn({
        fighter1, fighter2,
        hp1: hp1Ref.current, hp2: hp2Ref.current,
        mana1: mana1Ref.current, mana2: mana2Ref.current,
        round,
      });

      const newEvents = result.events.map(e => ({
        ...e,
        id: `evt-${eventIdRef.current++}`,
      }));

      // Animate first attack event
      const firstEvent = newEvents.find(e => e.type !== 'victory');
      if (firstEvent) {
        const isP1Attacking = firstEvent.attackerNum === 1;
        setAttackState({
          a1: isP1Attacking,
          a2: !isP1Attacking,
          h1: !isP1Attacking && !firstEvent.isDodged,
          h2: isP1Attacking && !firstEvent.isDodged,
        });

        // Floating damage number
        if (!firstEvent.isDodged && firstEvent.damage > 0) {
          const dmgId = `dmg-${damageIdRef.current++}`;
          setDamages(prev => [...prev, {
            id: dmgId,
            value: firstEvent.damage,
            type: firstEvent.type,
            isCritical: firstEvent.isCritical,
            isDodged: false,
            x: isP1Attacking ? '70%' : '30%',
            y: '20%',
            onComplete: (id) => setDamages(p => p.filter(d => d.id !== id)),
          }]);
        }

        setTimeout(() => setAttackState({ a1: false, a2: false, h1: false, h2: false }), 400);
      }

      // Batch state updates from pure function result
      setHP1(result.hp1);
      setHP2(result.hp2);
      setMana1(result.mana1);
      setMana2(result.mana2);
      setBattleLog(prev => [...prev, ...newEvents]);
      setRound(prev => prev + 1);

      if (result.winner) {
        setIsBattling(false);
        setWinner(result.winner === 1 ? fighter1.name : fighter2.name);
      }
    }, 1500);

    return () => clearTimeout(timeout);
  }, [isBattling, fighter1, fighter2, round]);

  return (
    <div style={{ position: 'relative' }}>
      <div className="battle-arena">
        <FighterCard
          device={fighter1}
          playerNum={1}
          currentHP={hp1}
          currentMana={mana1}
          isAttacking={attackState.a1}
          isHit={attackState.h1}
          onSelectDevice={selectDevice}
          isBattling={isBattling}
        />

        <BattleControls
          onStartBattle={startBattle}
          canStart={!!fighter1 && !!fighter2}
          isBattling={isBattling}
          winner={winner}
          round={round}
        />

        <FighterCard
          device={fighter2}
          playerNum={2}
          currentHP={hp2}
          currentMana={mana2}
          isAttacking={attackState.a2}
          isHit={attackState.h2}
          onSelectDevice={selectDevice}
          isBattling={isBattling}
        />

        <DamageNumber damages={damages} />
      </div>

      <BattleLog events={battleLog} />
    </div>
  );
}
