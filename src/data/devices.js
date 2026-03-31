// ╔══════════════════════════════════════════════════════════════════╗
// ║  DeviceWars — Master Device Spec Sheet                         ║
// ║                                                                ║
// ║  geekbench:      GB6 single-core score                         ║
// ║  geekbenchMulti: GB6 multi-core score                          ║
// ║  gpu:            compute units (Apple cores / NVIDIA SMs /     ║
// ║                  AMD CUs) — normalized across architectures     ║
// ║  ramSpeed:       memory bandwidth in GB/s                      ║
// ║  storageSpeed:   sequential read in GB/s                       ║
// ║  architecture:   trait key for set bonuses                     ║
// ╚══════════════════════════════════════════════════════════════════╝

const deviceDatabase = {

  // ══ Apple Mac — M4 Generation (2024-2025) ═══════════════════════

  "MacBook Pro M4 Max": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3900, geekbenchMulti: 25000,
    processor: 16, performanceCores: 12, efficiencyCores: 4,
    cpuFrequency: 4.5, processorType: "Apple M4 Max",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 128, ramType: "LPDDR5X", ramSpeed: 8.0,
    gpu: 40, gpuType: "Integrated 40-core GPU",
  },
  "MacBook Pro M4 Pro": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3800, geekbenchMulti: 22000,
    processor: 14, performanceCores: 10, efficiencyCores: 4,
    cpuFrequency: 4.5, processorType: "Apple M4 Pro",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 48, ramType: "LPDDR5X", ramSpeed: 6.4,
    gpu: 20, gpuType: "Integrated 20-core GPU",
  },
  "MacBook Air M4": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3800, geekbenchMulti: 15000,
    processor: 10, performanceCores: 4, efficiencyCores: 6,
    cpuFrequency: 4.4, processorType: "Apple M4",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 24, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },
  "Mac Mini M4": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3800, geekbenchMulti: 15000,
    processor: 10, performanceCores: 4, efficiencyCores: 6,
    cpuFrequency: 4.4, processorType: "Apple M4",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 32, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },

  // ══ Apple Mac — M3 Generation (2023-2024) ═══════════════════════

  "MacBook Pro M3 Max": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3100, geekbenchMulti: 21000,
    processor: 16, performanceCores: 12, efficiencyCores: 4,
    cpuFrequency: 4.4, processorType: "Apple M3 Max",
    storage: 4000, storageType: "NVMe SSD", storageSpeed: 7.6,
    ram: 96, ramType: "LPDDR5", ramSpeed: 7.6,
    gpu: 40, gpuType: "Integrated 40-core GPU",
  },
  "MacBook Pro M3 Pro": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3000, geekbenchMulti: 15000,
    processor: 12, performanceCores: 6, efficiencyCores: 6,
    cpuFrequency: 4.0, processorType: "Apple M3 Pro",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 36, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 18, gpuType: "Integrated 18-core GPU",
  },
  "MacBook Air M3": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 3000, geekbenchMulti: 12000,
    processor: 8, performanceCores: 4, efficiencyCores: 4,
    cpuFrequency: 4.0, processorType: "Apple M3",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 16, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },

  // ══ Apple Mac — M2 Generation (2022-2023) ═══════════════════════

  "MacBook Pro M2 Max": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2750, geekbenchMulti: 15500,
    processor: 12, performanceCores: 8, efficiencyCores: 4,
    cpuFrequency: 3.7, processorType: "Apple M2 Max",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 64, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 38, gpuType: "Integrated 38-core GPU",
  },
  "MacBook Pro M2 Pro": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2650, geekbenchMulti: 14500,
    processor: 12, performanceCores: 8, efficiencyCores: 4,
    cpuFrequency: 3.5, processorType: "Apple M2 Pro",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 5.0,
    ram: 32, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 19, gpuType: "Integrated 19-core GPU",
  },
  "MacBook Air M2": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2600, geekbenchMulti: 10000,
    processor: 8, performanceCores: 4, efficiencyCores: 4,
    cpuFrequency: 3.5, processorType: "Apple M2",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 5.0,
    ram: 16, ramType: "LPDDR5", ramSpeed: 5.2,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },
  "Mac Studio M2 Ultra": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2800, geekbenchMulti: 28000,
    processor: 24, performanceCores: 16, efficiencyCores: 8,
    cpuFrequency: 3.7, processorType: "Apple M2 Ultra",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 192, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 76, gpuType: "Integrated 76-core GPU",
  },

  // ══ Apple Mac — M1 Generation (2020-2022) ═══════════════════════

  "MacBook Pro M1 Max": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2400, geekbenchMulti: 12500,
    processor: 10, performanceCores: 8, efficiencyCores: 2,
    cpuFrequency: 3.5, processorType: "Apple M1 Max",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.0,
    ram: 32, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 24, gpuType: "Integrated 24-core GPU",
  },
  "MacBook Pro M1 Pro": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2400, geekbenchMulti: 12000,
    processor: 10, performanceCores: 8, efficiencyCores: 2,
    cpuFrequency: 3.2, processorType: "Apple M1 Pro",
    storage: 1024, storageType: "NVMe SSD", storageSpeed: 6.0,
    ram: 16, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 16, gpuType: "Integrated 16-core GPU",
  },
  "MacBook Air M1": {
    category: "mac", architecture: "apple-silicon",
    geekbench: 2300, geekbenchMulti: 8500,
    processor: 8, performanceCores: 4, efficiencyCores: 4,
    cpuFrequency: 3.2, processorType: "Apple M1",
    storage: 256, storageType: "NVMe SSD", storageSpeed: 5.0,
    ram: 8, ramType: "LPDDR4X", ramSpeed: 4.2,
    gpu: 8, gpuType: "Integrated 8-core GPU",
  },

  // ══ Apple Mac — Intel (Legacy) ══════════════════════════════════

  "MacBook Pro 16\" i9 2019": {
    category: "mac", architecture: "legacy-intel",
    geekbench: 1350, geekbenchMulti: 6500,
    processor: 8, performanceCores: 8, efficiencyCores: 0,
    cpuFrequency: 2.4, processorType: "Intel Core i9-9880H",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 3.2,
    ram: 16, ramType: "DDR4", ramSpeed: 2.6,
    gpu: 4, gpuType: "AMD Radeon Pro 5500M (4 CUs)",
  },

  // ══ Apple Mobile — iPhone ═══════════════════════════════════════

  "iPhone 16 Pro Max": {
    category: "mobile", architecture: "mobile-chip",
    geekbench: 3500, geekbenchMulti: 8800,
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 4.0, processorType: "Apple A18 Pro",
    storage: 1000, storageType: "NVMe", storageSpeed: 3.0,
    ram: 8, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 6, gpuType: "Apple GPU 6-core",
  },
  "iPhone 16": {
    category: "mobile", architecture: "mobile-chip",
    geekbench: 3300, geekbenchMulti: 7500,
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.8, processorType: "Apple A18",
    storage: 256, storageType: "NVMe", storageSpeed: 2.5,
    ram: 8, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 5, gpuType: "Apple GPU 5-core",
  },
  "iPhone 15 Pro": {
    category: "mobile", architecture: "mobile-chip",
    geekbench: 2900, geekbenchMulti: 7200,
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.8, processorType: "Apple A17 Pro",
    storage: 256, storageType: "NVMe", storageSpeed: 2.5,
    ram: 8, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 6, gpuType: "Apple GPU 6-core",
  },
  "iPhone 14 Pro": {
    category: "mobile", architecture: "mobile-chip",
    geekbench: 2530, geekbenchMulti: 6400,
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.5, processorType: "Apple A16 Bionic",
    storage: 256, storageType: "NVMe", storageSpeed: 2.0,
    ram: 6, ramType: "LPDDR5", ramSpeed: 5.5,
    gpu: 5, gpuType: "Apple GPU 5-core",
  },
  "iPhone 13": {
    category: "mobile", architecture: "mobile-chip",
    geekbench: 2400, geekbenchMulti: 5800,
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.2, processorType: "Apple A15 Bionic",
    storage: 128, storageType: "NVMe", storageSpeed: 1.5,
    ram: 4, ramType: "LPDDR4X", ramSpeed: 4.2,
    gpu: 4, gpuType: "Apple GPU 4-core",
  },
  "iPhone 12": {
    category: "mobile", architecture: "mobile-chip",
    geekbench: 2100, geekbenchMulti: 4500,
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.1, processorType: "Apple A14 Bionic",
    storage: 128, storageType: "NVMe", storageSpeed: 1.2,
    ram: 4, ramType: "LPDDR4X", ramSpeed: 4.2,
    gpu: 4, gpuType: "Apple GPU 4-core",
  },

  // ══ Apple Mobile — iPad ═════════════════════════════════════════

  "iPad Pro M4": {
    category: "mobile", architecture: "apple-silicon",
    geekbench: 3800, geekbenchMulti: 15000,
    processor: 10, performanceCores: 4, efficiencyCores: 6,
    cpuFrequency: 4.4, processorType: "Apple M4",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 6.0,
    ram: 16, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 10, gpuType: "Apple GPU 10-core",
  },

  // ══ Gaming — PC ═════════════════════════════════════════════════

  "Gaming PC (RTX 5090)": {
    category: "gaming", architecture: "discrete-gpu",
    geekbench: 3100, geekbenchMulti: 20000,
    processor: 16, performanceCores: 16, efficiencyCores: 0,
    cpuFrequency: 5.7, processorType: "AMD Ryzen 9 9950X",
    storage: 2000, storageType: "NVMe Gen5 SSD", storageSpeed: 12.0,
    ram: 64, ramType: "DDR5-6400", ramSpeed: 6.4,
    gpu: 170, gpuType: "NVIDIA RTX 5090 (170 SMs)",
  },
  "Gaming PC (RTX 4090)": {
    category: "gaming", architecture: "discrete-gpu",
    geekbench: 2900, geekbenchMulti: 18000,
    processor: 24, performanceCores: 8, efficiencyCores: 16,
    cpuFrequency: 5.8, processorType: "Intel Core i9-14900K",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.0,
    ram: 64, ramType: "DDR5-5600", ramSpeed: 5.6,
    gpu: 128, gpuType: "NVIDIA RTX 4090 (128 SMs)",
  },

  // ══ Gaming — Console & Handheld ═════════════════════════════════

  "PlayStation 5": {
    category: "gaming", architecture: "amd-apu",
    geekbench: 1100, geekbenchMulti: 6500,
    processor: 8, performanceCores: 8, efficiencyCores: 0,
    cpuFrequency: 3.5, processorType: "AMD Zen 2 (custom)",
    storage: 825, storageType: "Custom SSD", storageSpeed: 5.5,
    ram: 16, ramType: "GDDR6", ramSpeed: 7.0,
    gpu: 36, gpuType: "AMD RDNA 2 (36 CUs)",
  },
  "Steam Deck OLED": {
    category: "gaming", architecture: "amd-apu",
    geekbench: 900, geekbenchMulti: 3500,
    processor: 4, performanceCores: 4, efficiencyCores: 0,
    cpuFrequency: 3.5, processorType: "AMD Zen 2 APU",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 3.0,
    ram: 16, ramType: "LPDDR5", ramSpeed: 5.5,
    gpu: 8, gpuType: "AMD RDNA 2 (8 CUs)",
  },
  "Nintendo Switch OLED": {
    category: "gaming", architecture: "mobile-chip",
    geekbench: 400, geekbenchMulti: 1200,
    processor: 4, performanceCores: 4, efficiencyCores: 0,
    cpuFrequency: 1.02, processorType: "NVIDIA Tegra X1+",
    storage: 64, storageType: "eMMC", storageSpeed: 0.4,
    ram: 4, ramType: "LPDDR4", ramSpeed: 3.2,
    gpu: 2, gpuType: "NVIDIA Maxwell (2 SMs)",
  },
};

export const DEVICE_CATEGORIES = {
  mac: { label: "Apple Mac", icon: "💻" },
  mobile: { label: "Apple Mobile", icon: "📱" },
  gaming: { label: "Gaming", icon: "🎮" },
};

export default deviceDatabase;
