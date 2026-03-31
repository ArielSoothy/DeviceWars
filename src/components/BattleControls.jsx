"use client";

import { motion } from 'framer-motion';
import { Sword, RotateCw } from 'lucide-react';

export default function BattleControls({ onStartBattle, canStart, isBattling, winner, round }) {
  return (
    <div className="battle-controls">
      <div className="vs-indicator">⚔️</div>

      {isBattling && (
        <div className="round-counter">Round {round}</div>
      )}

      <button
        className={`battle-button ${
          isBattling ? 'battle-button-battling' :
          canStart ? 'battle-button-active' : 'battle-button-disabled'
        }`}
        onClick={onStartBattle}
        disabled={!canStart || isBattling}
      >
        {isBattling ? (
          <>
            <RotateCw className="animate-spin" size={16} />
            Fighting...
          </>
        ) : (
          <>
            <Sword size={16} />
            Start Battle
          </>
        )}
      </button>

      {winner && (
        <motion.div
          className="winner-announcement"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
        >
          🏆 {winner} Wins!
        </motion.div>
      )}
    </div>
  );
}
