"use client";

import BattleArena from '@/components/BattleArena';
import "./styles/styles.css";

export default function DeviceBattler() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">
          <span className="app-title-accent">DeviceWars</span>
        </h1>
        <p className="app-subtitle">Transform your specs into combat stats</p>
      </header>
      <BattleArena />
    </div>
  );
}
