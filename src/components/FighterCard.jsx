"use client";

import { motion } from 'framer-motion';
import FighterCharacter from './FighterCharacter';
import StatGrid from './StatGrid';
import DeviceSelector from './DeviceSelector';

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
    { value: device.strength, label: 'ATK', colorClass: 'attack', spec: `${device.processor} cores × ${device.multiplier}x` },
    { value: device.physicalDefense, label: 'DEF', colorClass: 'defense', spec: `${device.performanceCores} P-cores` },
    { value: device.speed, label: 'SPD', colorClass: 'speed-stat', spec: `${device.cpuFrequency} GHz` },
    { value: device.spellPower, label: 'MAG', colorClass: 'magic', spec: `${device.gpu} GPU cores` },
    { value: device.magicDefense, label: 'MDEF', colorClass: 'magic-def', spec: `${device.efficiencyCores || 0} E-cores` },
    { value: device.hpRegen, label: 'REGEN', colorClass: 'regen', spec: `${device.storageSpeed} GB/s` },
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
