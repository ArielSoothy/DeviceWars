export default function StatGrid({ stats }) {
  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <div key={stat.label} className="stat-cell">
          <div className={`stat-cell-value ${stat.colorClass}`}>{stat.value}</div>
          <div className="stat-cell-label">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
