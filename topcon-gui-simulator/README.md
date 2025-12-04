# Topcon GUI Simulator

A React-based interactive simulator for the Topcon CV-5000 phoropter.

## Project Structure

```
topcon-gui-simulator/
├── public/                    # Static assets
├── src/
│   ├── components/           # React components
│   ├── context/              # React Context for state management
│   ├── hooks/                # Custom React hooks
│   ├── styles/               # CSS files
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   └── main.tsx              # Entry point
├── index.html                # HTML template
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Build

```bash
npm run build
```

## Phase 1 Complete ✓

- React project setup with TypeScript
- Folder structure and architecture
- State management with Context API and useReducer
- Global styles and app layout
- UI Mockup matching Topcon CV-5000 interface
- All basic components in place

## Next Steps (Phase 2-3)

- Implement refraction cell click interactions
- Add boundary validation for values
- Implement visual feedback on interactions
- Complete PD and Occlusion control logic
- Eye test mode disabling functionality
- Charts placeholder and future enhancements
