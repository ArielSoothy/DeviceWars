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

const deviceDatabase = {
  "MacBook Pro M3 Max": {
    geekbench: 3128,
    processor: 16,
    performanceCores: 12,
    efficiencyCores: 4,
    cpuFrequency: 4.4,
    processorType: "Apple M3 Max",
    storage: 4000,
    storageType: "NVMe SSD",
    storageSpeed: 7.6,
    ram: 96,
    ramType: "LPDDR5",
    ramSpeed: 7.6,
    gpu: 40,
    gpuType: "Integrated 40-core GPU",
    type: "mac",
    rank: calculateRank(3128).title,
    specs: {
      processor: "Apple M3 Max, 16 cores (12 performance, 4 efficiency) at 4.4 GHz",
      ram: "96 GB LPDDR5, 7.6 GB/s",
      storage: "4000 GB NVMe SSD, 7.6 GB/s",
      gpu: "Integrated 40-core GPU",
    },
    powerLevels: {
      processorPower: 120 + 20 + 88,  // Performance cores (120) + Efficiency cores (20) + Frequency (88) = 228
      ramPower: 288 + 76,             // RAM Size (288) + RAM Speed (76) = 364
      storagePower: 400 + 76,         // Storage Size (400) + Storage Speed (76) = 476
      gpuPower: 320,                  // GPU Cores (40 * 8) = 320
      overallPowerLevel: 228 + 364 + 476 + 320,  // = 1388
    },
  },
  "MacBook Air M2": {
    geekbench: 12450,
    processor: 8,
    performanceCores: 8,
    efficiencyCores: 2,
    cpuFrequency: 3.5,
    processorType: "Apple M2",
    storage: 512,
    storageType: "NVMe SSD",
    storageSpeed: 5.0,
    ram: 16,
    ramType: "LPDDR5",
    ramSpeed: 5.2,
    gpu: 10,
    gpuType: "Integrated 10-core GPU",
    type: "mac",
    rank: calculateRank(12450).title,
    specs: {
      processor: "Apple M2, 8 cores (8 performance, 2 efficiency) at 3.5 GHz",
      ram: "16 GB LPDDR5, 5.2 GB/s",
      storage: "512 GB NVMe SSD, 5.0 GB/s",
      gpu: "Integrated 10-core GPU",
    },
    powerLevels: {
      processorPower: 80 + 10 + 70,  // Performance cores (80) + Efficiency cores (10) + Frequency (70) = 160
      ramPower: 48 + 52,             // RAM Size (48) + RAM Speed (52) = 100
      storagePower: 51 + 50,         // Storage Size (51) + Storage Speed (50) = 101
      gpuPower: 80,                  // GPU Cores (10 * 8) = 80
      overallPowerLevel: 160 + 100 + 101 + 80,  // = 441
    },
  },
  "MacBook Pro 16 2019 i9 8-core": {
    geekbench: 1377,
    processor: 8,
    performanceCores: 8,
    efficiencyCores: 0,
    cpuFrequency: 2.4,
    processorType: "Intel Core i9-9880H",
    storage: 1000,
    storageType: "NVMe SSD",
    storageSpeed: 3.2,
    ram: 16,
    ramType: "DDR4",
    ramSpeed: 2.6,
    gpu: 4,
    gpuType: "AMD Radeon Pro 5500M",
    type: "mac",
    rank: calculateRank(1377).title,
    specs: {
      processor: "Intel Core i9-9880H, 8 cores at 2.4 GHz",
      ram: "16 GB DDR4, 2.6 GB/s",
      storage: "1000 GB NVMe SSD, 3.2 GB/s",
      gpu: "AMD Radeon Pro 5500M, 4 GB",
    },
    powerLevels: {
      processorPower: 80 + 0 + 48,   // Performance cores (80) + Efficiency cores (0) + Frequency (48) = 128
      ramPower: 48 + 26,             // RAM Size (48) + RAM Speed (26) = 74
      storagePower: 100 + 32,        // Storage Size (100) + Storage Speed (32) = 132
      gpuPower: 32,                  // GPU Cores (4 * 8) = 32
      overallPowerLevel: 128 + 74 + 132 + 32,  // = 366
    },
  },
  "MacBook Pro 16 2019 i7 6-core": {
    geekbench: 1291,
    processor: 6,
    performanceCores: 6,
    efficiencyCores: 0,
    cpuFrequency: 2.6,
    processorType: "Intel Core i7-9750H",
    storage: 512,
    storageType: "NVMe SSD",
    storageSpeed: 3.0,
    ram: 16,
    ramType: "DDR4",
    ramSpeed: 2.6,
    gpu: 4,
    gpuType: "AMD Radeon Pro 5300M",
    type: "mac",
    rank: calculateRank(1291).title,
    specs: {
      processor: "Intel Core i7-9750H, 6 cores at 2.6 GHz",
      ram: "16 GB DDR4, 2.6 GB/s",
      storage: "512 GB NVMe SSD, 3.0 GB/s",
      gpu: "AMD Radeon Pro 5300M, 4 GB",
    },
    powerLevels: {
      processorPower: 60 + 0 + 52,   // Performance cores (60) + Efficiency cores (0) + Frequency (52) = 112
      ramPower: 48 + 26,             // RAM Size (48) + RAM Speed (26) = 74
      storagePower: 51 + 30,         // Storage Size (51) + Storage Speed (30) = 81
      gpuPower: 32,                  // GPU Cores (4 * 8) = 32
      overallPowerLevel: 112 + 74 + 81 + 32,  // = 299
    },
  },
  "MacBook Pro 16 2020 M1 Pro": {
    geekbench: 2388,
    processor: 10,
    performanceCores: 8,
    efficiencyCores: 2,
    cpuFrequency: 3.2,
    processorType: "Apple M1 Pro",
    storage: 1024,
    storageType: "NVMe SSD",
    storageSpeed: 6.0,
    ram: 16,
    ramType: "LPDDR5",
    ramSpeed: 6.4,
    gpu: 16,
    gpuType: "Integrated 16-core GPU",
    type: "mac",
    rank: calculateRank(2388).title,
    specs: {
      processor: "Apple M1 Pro, 10 cores (8 performance, 2 efficiency) at 3.2 GHz",
      ram: "16 GB LPDDR5, 6.4 GB/s",
      storage: "1024 GB NVMe SSD, 6.0 GB/s",
      gpu: "Integrated 16-core GPU",
    },
    powerLevels: {
      processorPower: 80 + 10 + 64,  // Performance cores (80) + Efficiency cores (10) + Frequency (64) = 154
      ramPower: 48 + 64,             // RAM Size (48) + RAM Speed (64) = 112
      storagePower: 102 + 60,        // Storage Size (102) + Storage Speed (60) = 162
      gpuPower: 128,                 // GPU Cores (16 * 8) = 128
      overallPowerLevel: 154 + 112 + 162 + 128,  // = 556
    },
  },
  "MacBook Pro 16 2021 M1 Max": {
    geekbench: 2374,
    processor: 10,
    performanceCores: 8,
    efficiencyCores: 2,
    cpuFrequency: 3.5,
    processorType: "Apple M1 Max",
    storage: 2000,
    storageType: "NVMe SSD",
    storageSpeed: 7.0,
    ram: 32,
    ramType: "LPDDR5",
    ramSpeed: 6.4,
    gpu: 24,
    gpuType: "Integrated 24-core GPU",
    type: "mac",
    rank: calculateRank(2374).title,
    specs: {
      processor: "Apple M1 Max, 10 cores (8 performance, 2 efficiency) at 3.5 GHz",
      ram: "32 GB LPDDR5, 6.4 GB/s",
      storage: "2000 GB NVMe SSD, 7.0 GB/s",
      gpu: "Integrated 24-core GPU",
    },
    powerLevels: {
      processorPower: 80 + 10 + 70,  // Performance cores (80) + Efficiency cores (10) + Frequency (70) = 160
      ramPower: 96 + 64,             // RAM Size (96) + RAM Speed (64) = 160
      storagePower: 200 + 70,        // Storage Size (200) + Storage Speed (70) = 270
      gpuPower: 192,                 // GPU Cores (24 * 8) = 192
      overallPowerLevel: 160 + 160 + 270 + 192,  // = 782
    },
  },
  // Repeat similarly for other devices...
};

export default deviceDatabase;
