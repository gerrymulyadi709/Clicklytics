import React, { useEffect, useState } from "react";

// Dummy interface untuk backend — nanti diganti import dari dfx-generated binding
const clicklytics = {
  recordClick: async (btn) => {
    // simulasi response backend: return count terbaru
    return new Promise(resolve => setTimeout(() => resolve(Math.floor(Math.random() * 100)), 200));
  },
  getAllClicks: async () => {
    return new Promise(resolve =>
      setTimeout(() => resolve([
        ["Button A", 10],
        ["Button B", 25],
        ["Button C", 7]
      ]), 200)
    );
  }
};

const BUTTONS = ["Button A", "Button B", "Button C"];

export default function App() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  // Load stats dari backend
  async function loadStats() {
    setLoading(true);
    const all = await clicklytics.getAllClicks();
    const statObj = {};
    all.forEach(([btn, count]) => statObj[btn] = count);
    setStats(statObj);
    setLoading(false);
  }

  useEffect(() => {
    loadStats();
  }, []);

  async function handleClick(buttonId) {
    setLoading(true);
    const newCount = await clicklytics.recordClick(buttonId);
    setStats(prev => ({ ...prev, [buttonId]: newCount }));
    setLoading(false);
  }

  return (
    <div className="container">
      <h1>Clicklytics — Statistik Klik</h1>

      <div className="buttons-grid">
        {BUTTONS.map(btn => (
          <button
            key={btn}
            className="button-item"
            onClick={() => handleClick(btn)}
            disabled={loading}
          >
            {btn}
          </button>
        ))}
      </div>

      <ul className="stats-list">
        {BUTTONS.map(btn => (
          <li key={btn}>
            {btn}
            <span>{stats[btn] ?? 0}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
