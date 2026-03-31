"use client";

import { motion, AnimatePresence } from 'framer-motion';

function formatLogEntry(event) {
  if (event.type === 'victory') {
    return { text: `${event.attacker} wins the battle!`, dotClass: 'victory' };
  }
  if (event.isDodged) {
    return { text: `${event.defender} dodged the attack!`, dotClass: 'dodge' };
  }
  if (event.type === 'spell-failed') {
    return { text: `${event.attacker} tried to cast a spell but lacked mana!`, dotClass: 'spell' };
  }

  const action = event.type === 'spell' ? 'cast a spell for' : 'dealt';
  const dmgClass = event.type === 'spell' ? 'log-spell-damage' : 'log-damage';

  return {
    parts: [
      { text: event.attacker, className: 'log-name' },
      { text: ` ${action} ` },
      { text: `${event.damage}`, className: dmgClass },
      { text: ` damage` },
      event.isCritical ? { text: ' (Critical!)', className: 'log-crit' } : null,
      event.defenseBlocked > 0 ? { text: `, blocked ${event.defenseBlocked}` } : null,
    ].filter(Boolean),
    dotClass: event.isCritical ? 'crit' : event.type === 'spell' ? 'spell' : 'physical',
  };
}

export default function BattleLog({ events }) {
  if (!events || events.length === 0) return null;

  const visibleEvents = events.slice(-10);

  return (
    <div className="battle-log">
      <div className="battle-log-title">Battle Log</div>
      <div className="battle-log-content">
        <AnimatePresence initial={false}>
          {visibleEvents.map((event, i) => {
            const formatted = formatLogEntry(event);
            return (
              <motion.div
                key={event.id || i}
                className="log-entry"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className={`log-dot ${formatted.dotClass}`} />
                {formatted.text ? (
                  <span>{formatted.text}</span>
                ) : (
                  <span>
                    {formatted.parts.map((part, j) => (
                      <span key={j} className={part.className || ''}>{part.text}</span>
                    ))}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
