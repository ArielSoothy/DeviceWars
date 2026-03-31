import deviceDatabase, { DEVICE_CATEGORIES } from '@/data/devices';

export default function DeviceSelector({ onSelect, disabled }) {
  const grouped = {};
  Object.entries(deviceDatabase).forEach(([name, device]) => {
    const cat = device.category || 'other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(name);
  });

  return (
    <div className="device-selector">
      <div className="device-selector-label">Choose your fighter</div>
      <select
        className="device-dropdown"
        onChange={(e) => e.target.value && onSelect(e.target.value)}
        disabled={disabled}
        defaultValue=""
      >
        <option value="" disabled>Select a device...</option>
        {Object.entries(DEVICE_CATEGORIES).map(([key, cat]) => (
          <optgroup key={key} label={`${cat.icon} ${cat.label}`}>
            {(grouped[key] || []).map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
