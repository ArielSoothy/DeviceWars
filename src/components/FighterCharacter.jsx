"use client";

import { motion } from 'framer-motion';

const basePath = process.env.NODE_ENV === 'production' ? '/DeviceWars' : '';

const CHARACTER_IMAGES = {
  dragon: `${basePath}/assets/characters/dragon.png`,
  phoenix: `${basePath}/assets/characters/phoenix.png`,
  griffin: `${basePath}/assets/characters/griffin.png`,
  unicorn: `${basePath}/assets/characters/unicorn.png`,
};

export default function FighterCharacter({ character, tier, isAttacking, isHit, position }) {
  const imageSrc = CHARACTER_IMAGES[character] || CHARACTER_IMAGES.griffin;
  const auraClass = `aura-${tier}`;

  return (
    <div className="fighter-character-wrap">
      <motion.img
        src={imageSrc}
        alt={`${tier} fighter`}
        className={`character-img ${auraClass}`}
        style={{ scaleX: position === 'right' ? -1 : 1 }}
        animate={
          isAttacking
            ? { x: [0, position === 'left' ? 15 : -15, 0] }
            : isHit
            ? { x: [0, -6, 6, -6, 6, 0] }
            : { x: 0 }
        }
        transition={{ duration: isAttacking ? 0.3 : isHit ? 0.4 : 0.2 }}
      />
    </div>
  );
}
