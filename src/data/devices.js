// ╔══════════════════════════════════════════════════════════════════╗
// ║  DeviceWars — Master Device Spec Sheet                         ║
// ║                                                                ║
// ║  All Geekbench scores: GB6 single-core (standardized)          ║
// ║  GPU field: compute units (Apple GPU cores / NVIDIA SMs /      ║
// ║             AMD CUs) — comparable across architectures          ║
// ║  RAM speed: memory bandwidth in GB/s                           ║
// ║  Storage speed: sequential read in GB/s                        ║
// ╚══════════════════════════════════════════════════════════════════╝

const deviceDatabase = {
  // ══ Apple Mac ═══════════════════════════════════════════════════

  "MacBook Pro M4 Max": {
    category: "mac",
    geekbench: 3900,                                    // GB6 SC
    processor: 16, performanceCores: 12, efficiencyCores: 4,
    cpuFrequency: 4.5, processorType: "Apple M4 Max",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 128, ramType: "LPDDR5X", ramSpeed: 8.0,
    gpu: 40, gpuType: "Integrated 40-core GPU",
  },
  "MacBook Pro M4 Pro": {
    category: "mac",
    geekbench: 3800,                                    // GB6 SC
    processor: 14, performanceCores: 10, efficiencyCores: 4,
    cpuFrequency: 4.5, processorType: "Apple M4 Pro",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 48, ramType: "LPDDR5X", ramSpeed: 6.4,
    gpu: 20, gpuType: "Integrated 20-core GPU",
  },
  "MacBook Air M4": {
    category: "mac",
    geekbench: 3800,                                    // GB6 SC
    processor: 10, performanceCores: 4, efficiencyCores: 6,
    cpuFrequency: 4.4, processorType: "Apple M4",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 24, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },
  "MacBook Pro M3 Max": {
    category: "mac",
    geekbench: 3100,                                    // GB6 SC
    processor: 16, performanceCores: 12, efficiencyCores: 4,
    cpuFrequency: 4.4, processorType: "Apple M3 Max",
    storage: 4000, storageType: "NVMe SSD", storageSpeed: 7.6,
    ram: 96, ramType: "LPDDR5", ramSpeed: 7.6,
    gpu: 40, gpuType: "Integrated 40-core GPU",
  },
  "MacBook Pro M3 Pro": {
    category: "mac",
    geekbench: 3000,                                    // GB6 SC
    processor: 12, performanceCores: 6, efficiencyCores: 6,
    cpuFrequency: 4.0, processorType: "Apple M3 Pro",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 36, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 18, gpuType: "Integrated 18-core GPU",
  },
  "MacBook Pro M2 Max": {
    category: "mac",
    geekbench: 2750,                                    // GB6 SC
    processor: 12, performanceCores: 8, efficiencyCores: 4,
    cpuFrequency: 3.7, processorType: "Apple M2 Max",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 7.4,
    ram: 64, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 38, gpuType: "Integrated 38-core GPU",
  },
  "MacBook Air M2": {
    category: "mac",
    geekbench: 2600,                                    // GB6 SC (was 1899 = GB5)
    processor: 8, performanceCores: 4, efficiencyCores: 4,
    cpuFrequency: 3.5, processorType: "Apple M2",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 5.0,
    ram: 16, ramType: "LPDDR5", ramSpeed: 5.2,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },
  "MacBook Pro M1 Max": {
    category: "mac",
    geekbench: 2400,                                    // GB6 SC
    processor: 10, performanceCores: 8, efficiencyCores: 2,
    cpuFrequency: 3.5, processorType: "Apple M1 Max",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.0,
    ram: 32, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 24, gpuType: "Integrated 24-core GPU",
  },
  "MacBook Pro 16\" i9 2019": {
    category: "mac",
    geekbench: 1350,                                    // GB6 SC
    processor: 8, performanceCores: 8, efficiencyCores: 0,
    cpuFrequency: 2.4, processorType: "Intel Core i9-9880H",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 3.2,
    ram: 16, ramType: "DDR4", ramSpeed: 2.6,
    gpu: 4, gpuType: "AMD Radeon Pro 5500M (4 CUs)",
  },

  // ══ Apple Mobile ════════════════════════════════════════════════

  "iPhone 16 Pro Max": {
    category: "mobile",
    geekbench: 3500,                                    // GB6 SC
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 4.0, processorType: "Apple A18 Pro",
    storage: 1000, storageType: "NVMe", storageSpeed: 3.0,
    ram: 8, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 6, gpuType: "Apple GPU 6-core",
  },
  "iPhone 16 Pro": {
    category: "mobile",
    geekbench: 3500,                                    // GB6 SC (same chip as Pro Max)
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 4.0, processorType: "Apple A18 Pro",
    storage: 512, storageType: "NVMe", storageSpeed: 3.0,
    ram: 8, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 6, gpuType: "Apple GPU 6-core",
  },
  "iPhone 15 Pro": {
    category: "mobile",
    geekbench: 2900,                                    // GB6 SC
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.8, processorType: "Apple A17 Pro",
    storage: 256, storageType: "NVMe", storageSpeed: 2.5,
    ram: 8, ramType: "LPDDR5", ramSpeed: 6.4,
    gpu: 6, gpuType: "Apple GPU 6-core",
  },
  "iPhone 13": {
    category: "mobile",
    geekbench: 2400,                                    // GB6 SC (was 1700 = GB5)
    processor: 6, performanceCores: 2, efficiencyCores: 4,
    cpuFrequency: 3.2, processorType: "Apple A15 Bionic",
    storage: 128, storageType: "NVMe", storageSpeed: 1.5,
    ram: 4, ramType: "LPDDR4X", ramSpeed: 4.2,
    gpu: 4, gpuType: "Apple GPU 4-core",
  },
  "iPad Pro M4": {
    category: "mobile",
    geekbench: 3800,                                    // GB6 SC
    processor: 10, performanceCores: 4, efficiencyCores: 6,
    cpuFrequency: 4.4, processorType: "Apple M4",
    storage: 1000, storageType: "NVMe SSD", storageSpeed: 6.0,
    ram: 16, ramType: "LPDDR5X", ramSpeed: 7.5,
    gpu: 10, gpuType: "Apple GPU 10-core",
  },
  "iPad Air M2": {
    category: "mobile",
    geekbench: 2600,                                    // GB6 SC
    processor: 8, performanceCores: 4, efficiencyCores: 4,
    cpuFrequency: 3.5, processorType: "Apple M2",
    storage: 256, storageType: "NVMe SSD", storageSpeed: 5.0,
    ram: 8, ramType: "LPDDR5", ramSpeed: 5.2,
    gpu: 10, gpuType: "Integrated 10-core GPU",
  },

  // ══ Gaming ══════════════════════════════════════════════════════

  "Gaming PC (RTX 5090)": {
    category: "gaming",
    geekbench: 3100,                                    // GB6 SC (Ryzen 9 9950X)
    processor: 16, performanceCores: 16, efficiencyCores: 0,
    cpuFrequency: 5.7, processorType: "AMD Ryzen 9 9950X",
    storage: 2000, storageType: "NVMe Gen5 SSD", storageSpeed: 12.0,
    ram: 64, ramType: "DDR5-6400", ramSpeed: 6.4,
    gpu: 170, gpuType: "NVIDIA GeForce RTX 5090 (170 SMs)",
  },
  "Gaming PC (RTX 4090)": {
    category: "gaming",
    geekbench: 2900,                                    // GB6 SC (i9-14900K)
    processor: 24, performanceCores: 8, efficiencyCores: 16,
    cpuFrequency: 5.8, processorType: "Intel Core i9-14900K",
    storage: 2000, storageType: "NVMe SSD", storageSpeed: 7.0,
    ram: 64, ramType: "DDR5-5600", ramSpeed: 5.6,
    gpu: 128, gpuType: "NVIDIA GeForce RTX 4090 (128 SMs)",
  },
  "PlayStation 5": {
    category: "gaming",
    geekbench: 1100,                                    // GB6 SC (Zen 2 @ 3.5GHz)
    processor: 8, performanceCores: 8, efficiencyCores: 0,
    cpuFrequency: 3.5, processorType: "AMD Zen 2 (custom)",
    storage: 825, storageType: "Custom SSD", storageSpeed: 5.5,
    ram: 16, ramType: "GDDR6", ramSpeed: 7.0,
    gpu: 36, gpuType: "AMD RDNA 2 (36 CUs)",
  },
  "Steam Deck OLED": {
    category: "gaming",
    geekbench: 900,                                     // GB6 SC (Zen 2 APU)
    processor: 4, performanceCores: 4, efficiencyCores: 0,
    cpuFrequency: 3.5, processorType: "AMD Zen 2 APU",
    storage: 512, storageType: "NVMe SSD", storageSpeed: 3.0,
    ram: 16, ramType: "LPDDR5", ramSpeed: 5.5,
    gpu: 8, gpuType: "AMD RDNA 2 (8 CUs)",
  },
  "Nintendo Switch OLED": {
    category: "gaming",
    geekbench: 400,                                     // GB6 SC (ARM Cortex-A57)
    processor: 4, performanceCores: 4, efficiencyCores: 0,
    cpuFrequency: 1.02, processorType: "NVIDIA Tegra X1+",
    storage: 64, storageType: "eMMC", storageSpeed: 0.4,
    ram: 4, ramType: "LPDDR4", ramSpeed: 3.2,
    gpu: 2, gpuType: "NVIDIA Maxwell (256 CUDA cores / 2 SMs)",
  },
};

export const DEVICE_CATEGORIES = {
  mac: { label: "Apple Mac", icon: "💻" },
  mobile: { label: "Apple Mobile", icon: "📱" },
  gaming: { label: "Gaming", icon: "🎮" },
};

export default deviceDatabase;
