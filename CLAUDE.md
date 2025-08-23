# DeviceWars - Claude Code Project

## Project Overview
DeviceWars is an interactive device battler game that transforms your computer specifications into RPG-style combat statistics. Users can select devices and watch them battle using real hardware specifications converted into game stats.

## Technology Stack
- **Framework**: Next.js 15.0.2 with React 18
- **Styling**: Tailwind CSS + Custom CSS
- **Icons**: Lucide React
- **Deployment**: GitHub Pages with static export
- **Development**: Turbopack for fast development builds

## Project Structure
```
device-battler/
├── src/
│   ├── app/
│   │   ├── page.js          # Main game component
│   │   └── styles/
│   │       └── styles.css   # Custom styles
│   ├── components/
│   │   └── ui/              # Reusable UI components
│   └── data/
│       └── devices.js       # Device specifications database
├── public/
│   └── assets/              # Game assets (character images)
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Pages deployment
└── next.config.mjs          # Next.js configuration
```

## Key Features
- **Device Selection**: Choose from various computer models
- **Real-time Combat**: Automated battle system with animations
- **Tabbed Interface**: Clean separation of combat stats and technical specs
- **Modern UI**: Glassmorphism design with smooth animations
- **Responsive Design**: Works on all device sizes
- **Live Battle Log**: Real-time combat updates

## Game Mechanics
### Stat Conversion
- **HP**: Storage size × 2 (e.g., 1TB = 2000 HP)
- **Strength**: CPU cores × 10 × rank multiplier
- **Defense**: Performance cores × 8
- **Magic Power**: GPU cores × 8
- **Speed**: CPU frequency × 10
- **Mana**: RAM size × 10

### Rank System
Devices are ranked based on Geekbench scores:
- **Archangel**: 3000+ (2.0× multiplier)
- **Black Dragon**: 2800+ (1.9× multiplier)
- **Titan**: 2600+ (1.8× multiplier)
- ... down to **Skeleton**: <600 (0.7× multiplier)

## Development Commands
```bash
# Development server
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Static export (for GitHub Pages)
npm run export
```

## UI/UX Design Philosophy
The interface was redesigned from a cluttered technical display to a modern, user-friendly experience:

### Before (Issues)
- Information overload with all specs visible at once
- Poor visual hierarchy
- Medieval theme felt outdated
- No clear organization of information

### After (Solutions)
- **Tabbed Interface**: Combat vs Technical specs separated
- **Progressive Disclosure**: Only essential info visible initially
- **Modern Design**: Clean gradients, glassmorphism, smooth animations
- **Visual Hierarchy**: HP/Mana bars prominent, secondary stats organized in grids
- **Better Typography**: Modern font stack with proper spacing

## Deployment
The project automatically deploys to GitHub Pages via GitHub Actions:
1. Push to `main` branch triggers deployment
2. Next.js builds static export in `out/` directory  
3. GitHub Pages serves the static files
4. Available at: `https://arielsoothy.github.io/DeviceWars/`

## Configuration Notes
- **basePath**: Set to `/DeviceWars` for GitHub Pages deployment
- **Static Export**: Configured for client-side only deployment
- **Image Optimization**: Disabled for static hosting compatibility
- **Trailing Slashes**: Enabled for better GitHub Pages compatibility

## Future Enhancements
- [ ] Add more device types (smartphones, tablets, gaming consoles)
- [ ] Implement multiplayer battles
- [ ] Add sound effects and music
- [ ] Create tournament mode
- [ ] Add device comparison tool
- [ ] Implement save/load game states

## Development Notes
This project was built with modern web development best practices:
- Component-based architecture
- Responsive design patterns  
- Performance optimized with Next.js
- Accessible UI components
- Clean code structure with proper separation of concerns

## License
Open source project - feel free to contribute or fork!