# Disinformation Quest

An interactive narrative experience exploring the mechanics of disinformation through a thought-provoking simulation. Available in both English and Romanian at [2-plus-2.com](https://2-plus-2.com/).

## Project Overview

This project serves as both an educational tool and a thought experiment on how mathematical truths can be challenged through various psychological and social mechanisms. Through an immersive game-like experience, users take on the role of a disinformation agent tasked with spreading the notion that "2+2=5".

Understanding how disinformation works is crucial for defending against it. By experiencing these tactics firsthand, we can better identify and resist them in reality.

### Key Features

- **Interactive Narrative**: Progress through multiple stages of a disinformation campaign, making strategic choices that affect the outcome
- **Multilingual Support**: Full support for English and Romanian languages with automatic detection based on user's location
- **Immersive Audio**: Voice-acted briefings and atmospheric sound design
- **Dynamic Visualizations**: Real-time animations illustrating the impact of your choices
- **Progress Tracking**: Visual metrics showing the effectiveness of your campaign

## Technical Implementation

### Tech Stack
- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Internationalization**: i18next
- **Routing**: React Router
- **Animation**: Framer Motion

### Architecture Overview
```mermaid
graph TD
    A[Frontend] --> B[React]
    A --> C[Vite]
    A --> D[shadcn/ui]
    A --> E[Tailwind CSS]
    
    subgraph Core Layers
        F[Presentation Layer] --> G[UI Components]
        F --> H[Animations]
        I[Application Layer] --> J[State Management]
        I --> K[Routing]
        L[Data Layer] --> M[Localization]
        L --> N[Metrics]
    end

    G -->|Uses| O[Framer Motion]
    J -->|TanStack Query| P[Choice State]
    K -->|React Router| Q[Game Stages]
    M -->|i18next| R[en/ro Translations]
    
    subgraph External Services
        S[Audio Service]
        T[Analytics]
        U[Hosting]
    end

    A -->|Builds With| C
    Core Layers -->|Depends On| A
    External Services -->|Integrates With| A
```

Key Architecture Components:
1. **Presentation Layer**: Handles UI components and animations using Framer Motion
2. **Application Layer**: Manages state and routing through game stages
3. **Data Layer**: Handles localization and campaign metrics
4. **External Services**: Audio assets and analytics tracking

The system follows a layered architecture with clear separation between:
- User interface components
- Game state management
- Localization/internationalization
- Audio-visual systems

### Project Structure
```
src/
├── components/    # Reusable UI components
│   ├── game/     # Game-specific components
│   └── ui/       # shadcn/ui components
├── pages/        # Main application pages
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization config and translations
├── utils/        # Utility functions
└── styles/       # Global styles and Tailwind config
```

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm or yarn package manager

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Contributing

We welcome contributions! Please feel free to submit a Pull Request. Read the issues list for inspiration, or add your own!

## Live Demo

Experience the simulation at [2-plus-2.com](https://2-plus-2.com/)