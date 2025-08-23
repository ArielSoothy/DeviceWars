"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {Sword, Shield, Brain, Heart, ShieldCheck, Droplet, RotateCw, ProjectorIcon, Zap, Cpu, HardDrive, MemoryStick} from 'lucide-react';
import deviceDatabase from '@/data/devices';
import "./styles/styles.css";


const RankCharacter = ({ rank, isAttacking, isHit, position }) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/DeviceWars' : '';
  
  const getCharacterImage = () => {
    switch (rank) {
      case 'Dragon':
        return `${basePath}/assets/characters/dragon.png`;
      case 'Phoenix':
        return `${basePath}/assets/characters/phoenix.png`;
      case 'Griffin':
        return `${basePath}/assets/characters/griffin.png`;
      case 'Unicorn':
        return `${basePath}/assets/characters/unicorn.png`;
      default:
        return null;
    }
  };

  const characterImage = getCharacterImage();

  return (
    <div className={`relative ${position === 'left' ? 'scale-x-1' : 'scale-x-[-1]'}`}>
      <img
        src={characterImage}
        alt={`${rank} character`}
        className={`w-24 h-24 relative transition-all duration-300
          ${isAttacking ? 'animate-attack' : ''}
          ${isHit ? 'animate-hit' : ''}
        `}
      />
    </div>
  );
};

export default function DeviceBattler() {
  const [device1, setDevice1] = useState(null);
  const [device2, setDevice2] = useState(null);
  const [battleLog, setBattleLog] = useState([]);
  const [currentHP1, setCurrentHP1] = useState(0);
  const [currentHP2, setCurrentHP2] = useState(0);
  const [currentMana1, setCurrentMana1] = useState(0);
  const [currentMana2, setCurrentMana2] = useState(0);
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isDevice1Attacking, setIsDevice1Attacking] = useState(false);
  const [isDevice2Attacking, setIsDevice2Attacking] = useState(false);
  const [isDevice1Hit, setIsDevice1Hit] = useState(false);
  const [isDevice2Hit, setIsDevice2Hit] = useState(false);

  const calculateRank = (geekbench) => {
  if (geekbench >= 3000) return { title: 'Archangel', multiplier: 2.0 }; // Top tier
  if (geekbench >= 2800) return { title: 'Black Dragon', multiplier: 1.9 };
  if (geekbench >= 2600) return { title: 'Titan', multiplier: 1.8 };
  if (geekbench >= 2400) return { title: 'Hydra', multiplier: 1.7 };
  if (geekbench >= 2200) return { title: 'Behemoth', multiplier: 1.6 };
  if (geekbench >= 2000) return { title: 'Gold Dragon', multiplier: 1.5 };
  if (geekbench >= 1800) return { title: 'Phoenix', multiplier: 1.4 };
  if (geekbench >= 1600) return { title: 'Cyclops', multiplier: 1.3 };
  if (geekbench >= 1400) return { title: 'Minotaur', multiplier: 1.2 };
  if (geekbench >= 1200) return { title: 'Griffin', multiplier: 1.1 };
  if (geekbench >= 1000) return { title: 'Centaur', multiplier: 1.0 };
  if (geekbench >= 800) return { title: 'Goblin', multiplier: 0.9 };
  if (geekbench >= 600) return { title: 'Peasant', multiplier: 0.8 }; // Lowest meaningful tier
  return { title: 'Skeleton', multiplier: 0.7 }; // Very low-end tier
};

  const calculateStats = (device) => {
    const rank = calculateRank(device.geekbench);
    return {
      // Health Stats
      maxHP: Math.floor(device.storage * 2), // 2000GB = 4000HP
      hpRegen: Math.floor(device.storageSpeed * 2), // 7.4GB/s = 15HP/turn

      // Combat Stats
      strength: Math.floor(device.processor * 10 * rank.multiplier), // CPU cores for physical damage
      physicalDefense: Math.floor(device.performanceCores * 8), // Performance cores
      magicDefense: Math.floor((device.efficiencyCores || 0) * 10), // Efficiency cores, default to 0 if none

      // Speed
      speed: Math.floor(device.cpuFrequency * 10), // 4.2GHz = 42 speed

      // Magic Stats
      maxMana: Math.floor(device.ram * 10), // 64GB = 640 mana
      manaRegen: Math.floor(device.ramSpeed * 2), // 6.4GB/s = 13 mana/turn
      spellPower: Math.floor(device.gpu * 8), // GPU cores for magical damage

      // Meta
      rank: rank.title,
      multiplier: rank.multiplier,
      // Include specs for display
      specs: {
        processor: `${device.processor} Cores`,
        storage: `${device.storage} GB`,
        ram: `${device.ram} GB`,
        gpu: `${device.gpu} Cores`,
        cpuFrequency: `${device.cpuFrequency} GHz`,
        storageSpeed: `${device.storageSpeed} GB/s`,
        ramSpeed: `${device.ramSpeed} GB/s`
      }
    };
  };

  const selectDevice = (deviceName, position) => {
    const device = {
      name: deviceName,
      ...deviceDatabase[deviceName],
      ...calculateStats(deviceDatabase[deviceName]),
    };

    if (position === 1) {
      setDevice1(device);
      setCurrentHP1(device.maxHP);
      setCurrentMana1(device.maxMana);
    } else {
      setDevice2(device);
      setCurrentHP2(device.maxHP);
      setCurrentMana2(device.maxMana);
    }
  };

  const calculateDamage = (attacker, defender, isSpellAttack = false) => {
    if (isSpellAttack) {
      // Magical damage
      const baseDamage = (attacker.spellPower * 0.8) + (attacker.maxMana * 0.2);
      const defense = defender.magicDefense * 0.5;
      const manaCost = Math.floor(attacker.spellPower * 0.3);

      if (attacker.currentMana < manaCost) {
        return { damage: 0, isDodged: false, isCritical: false, manaCost: 0, defenseBlocked: 0, type: 'spell-failed' };
      }

      const criticalChance = Math.random() < 0.25;
      const finalDamage = Math.max(1, Math.floor((baseDamage - defense) * (criticalChance ? 1.8 : 1)));
      return { damage: finalDamage, isDodged: false, isCritical: criticalChance, manaCost, defenseBlocked: defense, type: 'spell' };
    } else {
      // Physical damage
      const baseDamage = (attacker.strength * 0.6) + (attacker.speed * 0.2);
      const defense = defender.physicalDefense * 0.4;
      const dodgeChance = (defender.speed - attacker.speed) * 0.01;

      if (Math.random() < Math.max(0, Math.min(0.5, dodgeChance))) {
        return { damage: 0, isDodged: true, isCritical: false, manaCost: 0, defenseBlocked: 0, type: 'physical' };
      }

      const criticalChance = Math.random() < 0.2;
      const finalDamage = Math.max(1, Math.floor((baseDamage - defense) * (criticalChance ? 1.5 : 1)));
      return { damage: finalDamage, isDodged: false, isCritical: criticalChance, manaCost: 0, defenseBlocked: defense, type: 'physical' };
    }
  };

  useEffect(() => {
    let battleTimeout;
    if (isBattling && currentHP1 > 0 && currentHP2 > 0) {
      battleTimeout = setTimeout(executeTurn, 1500);
    }
    return () => clearTimeout(battleTimeout);
  }, [isBattling, currentHP1, currentHP2]);

  const executeTurn = async () => {
    if (!isBattling || !device1 || !device2) return;

    // Regeneration phase
    setCurrentHP1((prev) => Math.min(device1.maxHP, prev + device1.hpRegen));
    setCurrentHP2((prev) => Math.min(device2.maxHP, prev + device2.hpRegen));
    setCurrentMana1((prev) => Math.min(device1.maxMana, prev + device1.manaRegen));
    setCurrentMana2((prev) => Math.min(device2.maxMana, prev + device2.manaRegen));

    // Determine who goes first
    const device1First = device1.speed > device2.speed || (device1.speed === device2.speed && Math.random() < 0.5);

    // Execute turns
    if (device1First) {
      await handleAttack(device1, device2, 1);
      if (currentHP2 > 0) {
        await handleAttack(device2, device1, 2);
      }
    } else {
      await handleAttack(device2, device1, 2);
      if (currentHP1 > 0) {
        await handleAttack(device1, device2, 1);
      }
    }
  };

  const handleAttack = async (attacker, defender, attackerNumber) => {
    const useSpell = attackerNumber === 1 ? currentMana1 >= attacker.spellPower * 0.3 && Math.random() < 0.4 : currentMana2 >= attacker.spellPower * 0.3 && Math.random() < 0.4;

    const { damage, isDodged, isCritical, manaCost, defenseBlocked, type } = calculateDamage(attacker, defender, useSpell);

    if (attackerNumber === 1) {
      setIsDevice1Attacking(true);
      if (type === 'spell') setCurrentMana1((prev) => prev - manaCost);
    } else {
      setIsDevice2Attacking(true);
      if (type === 'spell') setCurrentMana2((prev) => prev - manaCost);
    }

    await new Promise((resolve) => setTimeout(resolve, 300));

    if (attackerNumber === 1) {
      setIsDevice1Attacking(false);
      if (!isDodged) setIsDevice2Hit(true);
      setTimeout(() => setIsDevice2Hit(false), 300);
    } else {
      setIsDevice2Attacking(false);
      if (!isDodged) setIsDevice1Hit(true);
      setTimeout(() => setIsDevice1Hit(false), 300);
    }

    if (!isDodged && damage > 0) {
      if (attackerNumber === 1) {
        setCurrentHP2((prev) => Math.max(0, prev - damage));
      } else {
        setCurrentHP1((prev) => Math.max(0, prev - damage));
      }

      const logMessage = `${attacker.name} ${type === 'spell-failed' ? "tried to cast a spell but didn't have enough mana!" : `${type === 'spell' ? 'cast a spell for' : 'dealt'} ${damage} damage`}${isCritical ? ' (Critical Hit!)' : ''}, defended: ${defenseBlocked.toFixed(1)}`;
      setBattleLog((prev) => [...prev, logMessage]);

      if ((attackerNumber === 1 && currentHP2 - damage <= 0) || (attackerNumber === 2 && currentHP1 - damage <= 0)) {
        setWinner(attacker);
        setIsBattling(false);
        setBattleLog((prev) => [...prev, `${attacker.name} wins!`]);
      }
    } else {
      setBattleLog((prev) => [...prev, `${defender.name} dodged the attack!`]);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const startBattle = () => {
    if (!device1 || !device2 || isBattling) return;
    setIsBattling(true);
    setWinner(null);
    setCurrentHP1(device1.maxHP);
    setCurrentHP2(device2.maxHP);
    setCurrentMana1(device1.maxMana);
    setCurrentMana2(device2.maxMana);
    setBattleLog([`Battle started: ${device1.name} vs ${device2.name}`]);
  };

  const HPBar = ({ current, max }) => (
    <div className="w-full bg-gray-300 rounded-full h-4 mb-4">
      <div
        className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${(current / max) * 100}%` }}
      />
    </div>
  );

  const [activeTab1, setActiveTab1] = useState('combat');
  const [activeTab2, setActiveTab2] = useState('combat');

  const DeviceCard = ({ device, position }) => {
    const activeTab = position === 1 ? activeTab1 : activeTab2;
    const setActiveTab = position === 1 ? setActiveTab1 : setActiveTab2;

    if (!device) {
      return (
        <div className="device-card-modern">
          <div className="card-header-modern">
            <div className="device-title-modern">Select Device</div>
          </div>
          <div className="device-selector">
            <select
              className="device-dropdown"
              onChange={(e) => selectDevice(e.target.value, position)}
            >
              <option value="">Choose your device...</option>
              {Object.keys(deviceDatabase).map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    }

    const currentHP = position === 1 ? currentHP1 : currentHP2;
    const currentMana = position === 1 ? currentMana1 : currentMana2;

    return (
      <div className="device-card-modern">
        <div className="card-header-modern">
          <div className="rank-badge">{device.rank}</div>
          <div className="device-title-modern">{device.name}</div>
          <div className="character-container">
            <RankCharacter
              rank={device.rank}
              isAttacking={position === 1 ? isDevice1Attacking : isDevice2Attacking}
              isHit={position === 1 ? isDevice1Hit : isDevice2Hit}
              position={position === 1 ? 'left' : 'right'}
            />
          </div>
        </div>

        {/* Vital Stats Always Visible */}
        <div className="vital-stats">
          <div className="stat-bar">
            <div className="stat-label">
              <Heart className="stat-icon hp" size={16} />
              HP: {currentHP}/{device.maxHP}
            </div>
            <div className="progress-bar hp">
              <div 
                className="progress-fill hp"
                style={{width: `${(currentHP / device.maxHP) * 100}%`}}
              />
            </div>
          </div>
          <div className="stat-bar">
            <div className="stat-label">
              <Brain className="stat-icon mana" size={16} />
              Mana: {currentMana}/{device.maxMana}
            </div>
            <div className="progress-bar mana">
              <div 
                className="progress-fill mana"
                style={{width: `${(currentMana / device.maxMana) * 100}%`}}
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === 'combat' ? 'active' : ''}`}
            onClick={() => setActiveTab('combat')}
          >
            <Sword size={16} />
            Combat
          </button>
          <button 
            className={`tab-button ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            <Cpu size={16} />
            Specs
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'combat' && (
            <div className="combat-stats">
              <div className="stat-group">
                <div className="stat-item-modern">
                  <Sword className="stat-icon attack" size={20} />
                  <div>
                    <div className="stat-value">{device.strength}</div>
                    <div className="stat-name">Attack</div>
                  </div>
                </div>
                <div className="stat-item-modern">
                  <Shield className="stat-icon defense" size={20} />
                  <div>
                    <div className="stat-value">{device.physicalDefense}</div>
                    <div className="stat-name">Defense</div>
                  </div>
                </div>
              </div>
              <div className="stat-group">
                <div className="stat-item-modern">
                  <Zap className="stat-icon magic" size={20} />
                  <div>
                    <div className="stat-value">{device.spellPower}</div>
                    <div className="stat-name">Magic Power</div>
                  </div>
                </div>
                <div className="stat-item-modern">
                  <ShieldCheck className="stat-icon magic-def" size={20} />
                  <div>
                    <div className="stat-value">{device.magicDefense}</div>
                    <div className="stat-name">Magic Def</div>
                  </div>
                </div>
              </div>
              <div className="stat-group">
                <div className="stat-item-modern">
                  <RotateCw className="stat-icon speed" size={20} />
                  <div>
                    <div className="stat-value">{device.speed}</div>
                    <div className="stat-name">Speed</div>
                  </div>
                </div>
                <div className="stat-item-modern">
                  <Droplet className="stat-icon regen" size={20} />
                  <div>
                    <div className="stat-value">{device.hpRegen}</div>
                    <div className="stat-name">HP Regen</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'specs' && (
            <div className="tech-specs">
              <div className="spec-row">
                <Cpu className="spec-icon" size={16} />
                <span className="spec-label">CPU:</span>
                <span className="spec-value">{device.processorType}</span>
              </div>
              <div className="spec-row">
                <HardDrive className="spec-icon" size={16} />
                <span className="spec-label">Storage:</span>
                <span className="spec-value">{device.storage}GB @ {device.storageSpeed}GB/s</span>
              </div>
              <div className="spec-row">
                <MemoryStick className="spec-icon" size={16} />
                <span className="spec-label">RAM:</span>
                <span className="spec-value">{device.ram}GB {device.ramType} @ {device.ramSpeed}GB/s</span>
              </div>
              <div className="spec-row">
                <ProjectorIcon className="spec-icon" size={16} />
                <span className="spec-label">GPU:</span>
                <span className="spec-value">{device.gpuType}</span>
              </div>
              <div className="spec-row">
                <Cpu className="spec-icon" size={16} />
                <span className="spec-label">Cores:</span>
                <span className="spec-value">{device.performanceCores}P + {device.efficiencyCores || 0}E</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Device Battler</h1>
          <p className="app-subtitle">Epic battles between your devices</p>
        </header>
        <div className="battle-arena">
          <DeviceCard device={device1} position={1}/>
          <div className="battle-controls">
            <div className="vs-indicator">
              <span className="vs-text">VS</span>
            </div>
            <button
                className={`battle-button ${
                    device1 && device2 && !isBattling
                        ? 'battle-button-active'
                        : 'battle-button-disabled'
                }`}
                onClick={startBattle}
                disabled={!device1 || !device2 || isBattling}
            >
              {isBattling ? (
                <>
                  <RotateCw className="animate-spin" size={16} />
                  Battle in Progress...
                </>
              ) : (
                <>
                  <Sword size={16} />
                  Start Battle
                </>
              )}
            </button>
            {winner && (
              <div className="winner-announcement">
                🏆 {winner.name} Wins!
              </div>
            )}
          </div>
          <DeviceCard device={device2} position={2}/>
        </div>

        {battleLog.length > 0 && (
            <div className="battle-log">
              <h3 className="battle-log-title">Battle Log</h3>
              <div className="battle-log-content">
                {battleLog.slice(-8).map((log, index) => (
                  <div key={index} className="battle-log-entry">
                    {log}
                  </div>
                ))}
              </div>
            </div>
        )}
        <style>
          {`
          @keyframes attack {
            0% { transform: translateX(0); }
            50% { transform: translateX(15px); } /* Increase movement */
            100% { transform: translateX(0); }
          }
          .animate-attack {
            animation: attack 0.3s ease-in-out; /* Increase duration */
          }
          
          @keyframes hit {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-6px); } /* Increase shaking intensity */
            75% { transform: translateX(6px); }
          }
          .animate-hit {
            animation: hit 0.4s ease-in-out 3; /* Increase duration to make it more visible */
          }
        `}
        </style>
      </div>
  );

}
