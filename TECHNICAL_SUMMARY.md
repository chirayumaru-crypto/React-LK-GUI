# Topcon GUI Simulator - Complete Technical Summary

## 📋 Overview

This document provides a complete technical summary of the Topcon CV-5000 GUI Simulator application, including architecture, implementation plan, and development guidelines.

---

## 🏗️ High-Level Architecture

### System Layers (Bottom-Up)

```
┌─────────────────────────────────────┐
│   Presentation Layer (React)        │  ← User Interface
├─────────────────────────────────────┤
│   State Management (Context API)    │  ← Global State
├─────────────────────────────────────┤
│   Business Logic (Utils & Hooks)    │  ← Validation & Calculations
├─────────────────────────────────────┤
│   Data Model (TypeScript Types)     │  ← Data Structures
└─────────────────────────────────────┘
```

### Key Features by Layer

| Layer | Components | Technologies |
|-------|-----------|--------------|
| **Presentation** | React Components, UI, Styling | React 18, TypeScript, CSS3 |
| **State** | SimulatorContext, useReducer | Context API, Hooks |
| **Logic** | Validation, Calculations, Helpers | Pure Functions, Utils |
| **Data** | Types, Interfaces, Constants | TypeScript Interfaces |

---

## 💻 Low-Level Architecture

### Component Tree
```
App
├── SimulatorProvider (Context Wrapper)
│   └── AppContent
│       ├── Header
│       ├── TopSection (Grid: 3 columns)
│       │   ├── RefractionPanel
│       │   │   └── RefractionTable
│       │   │       └── RefractionCell × 8
│       │   ├── MiddlePanel
│       │   │   ├── PDControl
│       │   │   │   └── PDButton × 2
│       │   │   └── OcclusionControl
│       │   │       └── OcclusionButton × 2
│       │   └── RightPanel
│       │       └── EyeTestMode
│       │           └── ModeButton × 3
│       ├── ChartsSection
│       │   ├── ChartTabs
│       │   │   └── ChartTab × 5+
│       │   └── ChartDisplay
│       └── Footer
```

### State Management Flow
```
User Action
    ↓
Event Handler (onClick, onChange)
    ↓
Dispatch Action
    ↓
SimulatorContext → useReducer
    ↓
Reducer Function (validates, updates state)
    ↓
Context Update (notify subscribers)
    ↓
Components Re-render
    ↓
UI Reflects New State
```

---

## 📦 Technology Stack

### Core Technologies
- **React 18.2+**: Component-based UI framework
- **TypeScript 5.2+**: Type-safe development
- **Vite 5.0+**: Ultra-fast build tool
- **CSS3**: Styling with CSS variables and Grid/Flexbox

### Development Tools
- **npm 10+**: Package management
- **ESLint**: Code linting
- **TypeScript Compiler**: Type checking

### Architecture Patterns
- **Context API**: Global state management
- **useReducer**: Complex state logic
- **Custom Hooks**: Reusable logic
- **Utility Functions**: Pure, testable functions
- **TypeScript Interfaces**: Type safety

---

## 📁 Project Structure

```
topcon-gui-simulator/
├── src/
│   ├── components/           # React Components (Phase 2+)
│   │   ├── RefractionTable.tsx
│   │   ├── RefractionCell.tsx
│   │   ├── PDControl.tsx
│   │   ├── OcclusionControl.tsx
│   │   ├── EyeTestMode.tsx
│   │   └── ChartSection.tsx
│   │
│   ├── context/              # State Management
│   │   └── SimulatorContext.tsx
│   │
│   ├── hooks/                # Custom Hooks
│   │   ├── useSimulator.ts
│   │   ├── useRefraction.ts  # Phase 2
│   │   ├── useOcclusion.ts   # Phase 3
│   │   └── index.ts
│   │
│   ├── types/                # TypeScript Definitions
│   │   ├── simulator.ts       # State types
│   │   ├── components.ts      # Component prop types
│   │   └── index.ts
│   │
│   ├── utils/                # Utilities & Helpers
│   │   ├── constants.ts      # App constants
│   │   ├── validation.ts     # Validation functions
│   │   ├── calculations.ts   # Math functions
│   │   └── index.ts
│   │
│   ├── styles/               # CSS Files
│   │   ├── global.css
│   │   ├── app.css
│   │   ├── components.css    # Phase 2+
│   │   └── variables.css     # Phase 2+
│   │
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── vite-env.d.ts        # Vite types
│
├── public/                   # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite config
└── .eslintrc.cjs            # ESLint config
```

---

## 🔑 Key Concepts

### 1. State Structure
```typescript
interface SimulatorState {
  rightEye: RefractionValue;      // { s, c, a, add }
  leftEye: RefractionValue;
  pd: number;                      // 50-80 mm
  occlusion: {
    rightEye: boolean;
    leftEye: boolean;
  };
  testMode: 'left-only' | 'right-only' | 'bino';
}
```

### 2. Action Types
```typescript
type SimulatorAction = 
  | { type: 'UPDATE_RIGHT_EYE_PARAM'; payload: { param, value } }
  | { type: 'UPDATE_LEFT_EYE_PARAM'; payload: { param, value } }
  | { type: 'SET_PD'; payload: number }
  | { type: 'TOGGLE_OCCLUSION'; payload: 'rightEye' | 'leftEye' }
  | { type: 'SET_TEST_MODE'; payload: EyeTestMode }
  | { type: 'RESET' };
```

### 3. Refraction Parameters

| Parameter | Label | Range | Step | Default |
|-----------|-------|-------|------|---------|
| **S** | Sphere | -10.00 to +10.00 | 0.25 | 0.00 |
| **C** | Cylinder | -10.00 to +10.00 | 0.25 | 0.00 |
| **A** | Axis | 0 to 180° | 1 | 180 |
| **ADD** | Addition | 0.00 to +10.00 | 0.25 | 0.00 |

### 4. PD (Pupillary Distance)

| Property | Value |
|----------|-------|
| Default | 64 mm |
| Min | 50 mm |
| Max | 80 mm |
| Step | 0.5 mm |

### 5. Eye Test Modes

| Mode | Label | Behavior |
|------|-------|----------|
| **left-only** | Left Only | Disables right eye controls |
| **right-only** | Right Only | Disables left eye controls |
| **bino** | Binocular | Both eyes active |

---

## 🎯 Implementation Phases

### Phase 1: Foundation ✅ COMPLETE
- React project setup with TypeScript
- Folder structure and architecture
- Context API state management
- UI layout mockup
- Global styling

### Phase 2: Refraction Table (NEXT)
- RefractionTable component
- RefractionCell component
- Click handlers (left/right click)
- Boundary validation
- Hover effects
- Disable logic

### Phase 3: Control Components
- PDControl component logic
- OcclusionControl component logic
- EyeTestMode component logic
- State synchronization
- Disabled state handling

### Phase 4: Charts & Polish
- ChartSection component
- Chart tab functionality
- Professional styling
- Responsive design
- Accessibility features

### Phase 5: Future Enhancements
- localStorage persistence
- Backend API integration
- Chart data visualization
- Export functionality
- Keyboard shortcuts

---

## 🔧 Utility Functions

### Validation Functions
```typescript
validateSphereValue(value: number): number
validateCylinderValue(value: number): number
validateAxisValue(value: number): number
validateADDValue(value: number): number
validatePDValue(value: number): number
validateRefractionParam(param: string, value: number): number
```

### Calculation Functions
```typescript
incrementValue(currentValue: number, param: string): number
decrementValue(currentValue: number, param: string): number
incrementPD(currentPD: number): number
decrementPD(currentPD: number): number
formatRefractionValue(value: number, param: string): string
formatPDValue(value: number): string
```

### Helper Functions
```typescript
getStepSize(param: string): number
getRange(param: string): { min, max }
isAtMax(value: number, param: string): boolean
isAtMin(value: number, param: string): boolean
isPDAtMax(value: number): boolean
isPDAtMin(value: number): boolean
```

---

## 🪝 Custom Hooks

### useSimulator Hook
```typescript
const { state, dispatch } = useSimulator();
// Returns: SimulatorState and dispatch function
// Used by: All components needing state access
```

### useRefraction Hook (Phase 2)
```typescript
const { eye, updateParam, increment, decrement } = useRefraction('rightEye');
// Provides: Refraction-specific operations
```

### useOcclusion Hook (Phase 3)
```typescript
const { toggle, isOccluded } = useOcclusion();
// Provides: Occlusion control operations
```

---

## 🎨 Styling Architecture

### CSS Variables (Theme)
```css
:root {
  --primary-bg: #e8eef7;           /* Main background */
  --secondary-bg: #d4dce8;         /* Secondary background */
  --button-bg: #b8c5d6;            /* Button background */
  --button-hover: #a0afc8;         /* Button hover state */
  --button-active: #8896b0;        /* Button active state */
  --text-primary: #1a1a1a;         /* Primary text */
  --text-secondary: #4a4a4a;       /* Secondary text */
  --border-color: #6b7a8f;         /* Border color */
  --highlight-color: #4a90e2;      /* Highlight/active */
  --disabled-bg: #e0e8f0;          /* Disabled background */
  --disabled-text: #8a96a8;        /* Disabled text */
  --occlusion-off: #c8d0db;        /* Occlusion off state */
  --occlusion-on: #5a6a7a;         /* Occlusion on state */
  --cell-hover: #b3d9ff;           /* Cell hover state */
  --cell-border: #9ab5cf;          /* Cell border */
}
```

### Layout System
- **Grid**: Main layout with CSS Grid
- **Flexbox**: Component alignment
- **Responsive**: Mobile-first design
- **Variables**: Consistent theming

---

## 📊 Data Flow Examples

### Example 1: Increase Refraction Value
```
User Right-Clicks S Cell
    ↓
RefractionCell.onContextMenu()
    ↓
incrementValue('s', currentValue)
    ↓
validateSphereValue(newValue)
    ↓
Dispatch: UPDATE_RIGHT_EYE_PARAM
    ↓
simulatorReducer processes action
    ↓
Context updates state
    ↓
RefractionTable re-renders
    ↓
New value displayed
```

### Example 2: Toggle Occlusion
```
User Clicks Occlusion Button
    ↓
OcclusionButton.onClick()
    ↓
Dispatch: TOGGLE_OCCLUSION
    ↓
simulatorReducer toggles state
    ↓
Context updates state
    ↓
Multiple components re-render:
  - RefractionTable (disable/enable)
  - EyeTestMode (update disabled states)
  - OcclusionControl (visual feedback)
```

---

## 🧪 Testing Strategy (Phase 4+)

### Unit Tests
- Validation functions
- Calculation functions
- Reducer logic
- Hook behavior

### Integration Tests
- Component interactions
- State management
- Data flow

### E2E Tests
- User workflows
- Click interactions
- Form submissions

---

## 🚀 Performance Optimization

### Current Optimizations
- React.memo for pure components
- useMemo for expensive calculations
- CSS transforms for animations
- Event delegation

### Future Optimizations (Phase 5)
- Code splitting
- Lazy loading
- Virtual scrolling (if needed)
- Service workers for offline

---

## 🔒 Type Safety

### TypeScript Benefits
- Static type checking
- IntelliSense support
- Self-documenting code
- Compile-time error detection
- Refactoring confidence

### Key Type Definitions
```typescript
interface RefractionValue {
  s: number;
  c: number;
  a: number;
  add: number;
}

interface SimulatorState {
  rightEye: RefractionValue;
  leftEye: RefractionValue;
  pd: number;
  occlusion: { rightEye: boolean; leftEye: boolean };
  testMode: 'left-only' | 'right-only' | 'bino';
}
```

---

## 📝 Documentation Standards

### Code Comments
- Function documentation with JSDoc
- Complex logic explanation
- Edge case handling

### File Headers
- Purpose of the file
- Key exports
- Dependencies

### Component Documentation
- Props interface
- Usage examples
- Related components

---

## 🔄 Development Workflow

### Before Implementation
1. Review phase requirements
2. Check architecture documents
3. Identify dependencies
4. Plan component structure

### During Implementation
1. Create TypeScript interfaces first
2. Implement component skeleton
3. Add event handlers
4. Integrate with state
5. Test interactions

### After Implementation
1. Code review
2. TypeScript compilation check
3. ESLint validation
4. Manual testing
5. Update documentation

---

## 📈 Metrics & Monitoring

### Performance Metrics (Phase 5)
- Component render time
- State update latency
- Bundle size
- Network requests

### Quality Metrics
- Type coverage
- Test coverage
- ESLint violations
- Code complexity

---

## 🎓 Learning Resources

### For Developers New to Project
1. Start with ARCHITECTURE.md
2. Review src/types/simulator.ts
3. Study SimulatorContext implementation
4. Examine RefractionTable component
5. Follow Phase 2 implementation guide

### Key Concepts to Understand
1. React Context API & useReducer
2. TypeScript interfaces
3. CSS Grid and Flexbox
4. Pure functions and immutability
5. State management patterns

---

## ✅ Checklist for Phase 2 Start

- [ ] Review Phase 1 code
- [ ] Understand state structure
- [ ] Understand action dispatch flow
- [ ] Read ARCHITECTURE.md
- [ ] Review utility functions
- [ ] Design RefractionTable component structure
- [ ] Plan click handler logic
- [ ] Create TypeScript interfaces for props
- [ ] Implement component skeleton
- [ ] Add styling
- [ ] Connect to state
- [ ] Test interactions

---

## 🤝 Contributing Guidelines

1. **Follow TypeScript conventions**: Use strict mode
2. **Keep functions pure**: No side effects
3. **Use descriptive names**: Clear intent
4. **Add JSDoc comments**: For public APIs
5. **Validate input**: Prevent invalid states
6. **Test edge cases**: Boundary conditions
7. **Update types**: Always keep types current
8. **Document changes**: Update relevant docs

---

## 📞 Support & Questions

For questions about:
- **Architecture**: See ARCHITECTURE.md
- **Types**: Check src/types/
- **State**: Review SimulatorContext.tsx
- **Utils**: Check src/utils/ and their JSDoc
- **Components**: See component-specific comments
- **Styling**: Review CSS variables in global.css

---

**Version**: 1.0  
**Last Updated**: December 3, 2025  
**Status**: Phase 1 Complete, Ready for Phase 2
