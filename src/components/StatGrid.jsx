export default function StatGrid({ stats }) {
  return (
    <div className="stat-grid">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="stat-cell">
            {Icon && <Icon className={`stat-cell-icon ${stat.colorClass}`} size={18} />}
            <div className={`stat-cell-value ${stat.colorClass}`}>{stat.value}</div>
            <div className="stat-cell-label">{stat.label}</div>
            {stat.spec && <div className="stat-cell-spec">{stat.spec}</div>}
          </div>
        );
      })}
    </div>
  );
}
