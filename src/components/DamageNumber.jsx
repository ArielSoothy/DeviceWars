"use client";

import { motion, AnimatePresence } from 'framer-motion';

export default function DamageNumber({ damages }) {
  return (
    <AnimatePresence>
      {damages.map((dmg) => (
        <motion.div
          key={dmg.id}
          className={`damage-number ${dmg.isCritical ? 'crit' : dmg.type === 'spell' ? 'spell' : dmg.isDodged ? 'dodge' : 'physical'}`}
          style={{ left: dmg.x, top: dmg.y }}
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: -40 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => dmg.onComplete?.(dmg.id)}
        >
          {dmg.isDodged ? 'DODGE' : dmg.isCritical ? `${dmg.value}!` : dmg.value}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
