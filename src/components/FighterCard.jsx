"use client";

import { motion } from 'framer-motion';
import { Sword, Shield, Zap, ShieldCheck, Gauge, Heart } from 'lucide-react';
import FighterCharacter from './FighterCharacter';
import StatGrid from './StatGrid';
import DeviceSelector from './DeviceSelector';
import { COOLING_TYPES } from '@/data/devices';
import { ARCHITECTURES } from '@/lib/stats';

export default function FighterCard({
  device, playerNum, currentHP, currentMana,
  isAttacking, isHit, onSelectDevice, isBattling,
}) {
  const position = playerNum === 1 ? 'left' : 'right';

  if (!device) {
    return (
      <motion.div
        className="fighter-card"
        data-player={playerNum}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="player-label" data-player={playerNum}>
          Player {playerNum}
        </div>
        <DeviceSelector
          onSelect={(name) => onSelectDevice(name, playerNum)}
          disabled={isBattling}
        />
      </motion.div>
    );
  }

  const stats = [
    { value: device.strength, label: 'ATK', colorClass: 'attack', spec: `MC: ${(device.geekbenchMulti / 1000).toFixed(1)}k`, icon: Sword },
    { value: device.physicalDefense, label: 'DEF', colorClass: 'defense', spec: `${device.performanceCores}P + ${device.efficiencyCores || 0}E`, icon: Shield },
    { value: device.speed, label: 'SPD', colorClass: 'speed-stat', spec: `SC: ${device.geekbench}`, icon: Gauge },
    { value: device.spellPower, label: 'MAG', colorClass: 'magic', spec: `${device.gpu} GPU cores`, icon: Zap },
    { value: device.magicDefense, label: 'MDEF', colorClass: 'magic-def', spec: `${device.efficiencyCores || 0} E-cores`, icon: ShieldCheck },
    { value: device.hpRegen, label: 'REGEN', colorClass: 'regen', spec: `${device.storageSpeed} GB/s`, icon: Heart },
  ];

  return (
    <motion.div
      className="fighter-card"
      data-player={playerNum}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: playerNum === 2 ? 0.1 : 0 }}
    >
      <div className="player-label" data-player={playerNum}>
        Player {playerNum}
      </div>

      <FighterCharacter
        character={device.character}
        tier={device.tier}
        isAttacking={isAttacking}
        isHit={isHit}
        position={position}
      />

      <div className="fighter-info">
        <div className="device-name">{device.name}</div>
        <span className={`rank-badge ${device.tier}`}>{device.rank}</span>
        <div className="trait-row">
          {device.cooling && COOLING_TYPES[device.cooling] && (
            <span className={`trait-badge cooling-${device.cooling}`}>
              {COOLING_TYPES[device.cooling].icon} {COOLING_TYPES[device.cooling].name}
            </span>
          )}
          {device.architecture && ARCHITECTURES[device.architecture] && (
            <span className="trait-badge arch">
              {ARCHITECTURES[device.architecture].icon} {ARCHITECTURES[device.architecture].name}
            </span>
          )}
        </div>
      </div>

      <div className="vital-stats">
        <div className="stat-bar-row">
          <span className="stat-bar-label">HP</span>
          <div className="stat-bar-track">
            <motion.div
              className="stat-bar-fill-hp"
              animate={{ width: `${(currentHP / device.maxHP) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="stat-bar-value">{currentHP} / {device.maxHP}</span>
        </div>
        <div className="stat-bar-spec">{device.storage}GB storage</div>
        <div className="stat-bar-row">
          <span className="stat-bar-label">MP</span>
          <div className="stat-bar-track">
            <motion.div
              className="stat-bar-fill-mana"
              animate={{ width: `${(currentMana / device.maxMana) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="stat-bar-value">{currentMana} / {device.maxMana}</span>
        </div>
        <div className="stat-bar-spec">{device.ram}GB {device.ramType}</div>
      </div>

      <StatGrid stats={stats} />
    </motion.div>
  );
}
