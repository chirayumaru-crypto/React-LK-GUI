# Topcon GUI Simulator - Architecture Design Document

## 1. High-Level Architecture

### System Overview
```
┌─────────────────────────────────────────────────────────────┐
│                   Browser / React App                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Presentation Layer (UI)                 │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ Components (App, Refraction, PD, Occlusion...)│  │  │
│  │  │ Hooks (useSimulator, useRefraction...)         │  │  │
│  │  │ Styles (CSS with CSS Variables)                │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓↑                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         State Management Layer (Context API)        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ SimulatorContext (useReducer Pattern)          │  │  │
│  │  │ - Manages global simulator state               │  │  │
│  │  │ - Dispatches actions for state updates         │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓↑                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Business Logic Layer (Utils & Hooks)        │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ Validation Functions                          │  │  │
│  │  │ - Boundary checking                            │  │  │
│  │  │ - Value formatting                             │  │  │
│  │  │ Calculation Functions                          │  │  │
│  │  │ - Step increment/decrement logic               │  │  │
│  │  │ Custom Hooks                                   │  │  │
│  │  │ - useSimulator, useRefraction, useOcclusion  │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                           ↓↑                                │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Data Model Layer (Types)                 │  │
│  │  ┌────────────────────────────────────────────────┐  │  │
│  │  │ TypeScript Interfaces                          │  │  │
│  │  │ - RefractionValue, OcclusionState             │  │  │
│  │  │ - SimulatorState, SimulatorAction              │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer | Responsibility | Technologies |
|-------|----------------|--------------|
| **Presentation** | Render UI, handle user interactions | React, CSS, HTML |
| **State Management** | Manage application state, dispatch actions | Context API, useReducer |
| **Business Logic** | Validate data, calculate values, enforce rules | TypeScript, custom functions |
| **Data Model** | Define data structures and types | TypeScript interfaces |

---

## 2. Low-Level Architecture

### Component Hierarchy
```
App (Root)
├── SimulatorProvider (Context Wrapper)
│   └── AppContent
│       ├── Header
│       ├── Top Section (Grid: 3 columns)
│       │   ├── Left Panel
│       │   │   └── RefractionTable
│       │   │       └── RefractionCell (8 instances)
│       │   ├── Middle Panel
│       │   │   ├── PDControl
│       │   │   │   └── PDButton (2 instances)
│       │   │   └── OcclusionControl
│       │   │       └── OcclusionButton (2 instances)
│       │   └── Right Panel
│       │       └── EyeTestMode
│       │           └── ModeButton (3 instances)
│       ├── Charts Section
│       │   ├── ChartTabs
│       │   │   └── ChartTab (5+ instances)
│       │   └── ChartDisplay
│       └── Footer
```

### Component Specifications

#### 1. **RefractionTable Component**
```typescript
// Purpose: Display and manage refraction parameters
// Props: None (uses context)
// State: Managed by SimulatorContext
// Features:
// - Display S, C, A, ADD values for both eyes
// - Handle left/right click interactions
// - Show hover effects
// - Disable based on occlusion/test mode
```

#### 2. **RefractionCell Component**
```typescript
// Purpose: Individual cell for refraction value
// Props: 
//   - eye: 'rightEye' | 'leftEye'
//   - param: 'S' | 'C' | 'A' | 'ADD'
//   - value: number
//   - disabled: boolean
//   - onLeftClick: () => void
//   - onRightClick: () => void
// Features:
// - Left-click to decrease
// - Right-click to increase
// - Visual feedback on interaction
// - Disabled state styling
```

#### 3. **PDControl Component**
```typescript
// Purpose: Manage pupillary distance
// Props: None (uses context)
// State: Managed by SimulatorContext
// Features:
// - Increment/decrement by 0.5mm
// - Range validation (50-80)
// - Display current value
```

#### 4. **OcclusionControl Component**
```typescript
// Purpose: Toggle eye occlusion
// Props: None (uses context)
// State: Managed by SimulatorContext
// Features:
// - Toggle individual eye occlusion
// - Visual feedback (light/dark grey)
// - Disable test mode when both eyes occluded
```

#### 5. **EyeTestMode Component**
```typescript
// Purpose: Select test mode
// Props: None (uses context)
// State: Managed by SimulatorContext
// Features:
// - Three mode buttons (R, BINO, L)
// - Disable based on occlusion
// - Preserve values when switching
```

---

## 3. State Management Architecture

### State Structure
```typescript
interface SimulatorState {
  rightEye: RefractionValue;    // { s, c, a, add }
  leftEye: RefractionValue;
  pd: number;                    // 50-80 mm
  occlusion: {
    rightEye: boolean;
    leftEye: boolean;
  };
  testMode: 'left-only' | 'right-only' | 'bino';
}
```

### Action Types & Handlers
```typescript
type SimulatorAction = 
  | { type: 'UPDATE_RIGHT_EYE_PARAM'; payload: { param, value } }
  | { type: 'UPDATE_LEFT_EYE_PARAM'; payload: { param, value } }
  | { type: 'SET_PD'; payload: number }
  | { type: 'TOGGLE_OCCLUSION'; payload: 'rightEye' | 'leftEye' }
  | { type: 'SET_TEST_MODE'; payload: EyeTestMode }
  | { type: 'RESET' };
```

### Reducer Logic
```typescript
// simulatorReducer(state, action) → newState
// Handles:
// - Value updates with boundary checking
// - PD range validation (50-80)
// - Occlusion state toggling
// - Test mode switching
// - State reset to defaults
```

### Data Flow Diagram
```
User Interaction (Click/Change)
    ↓
Component Event Handler
    ↓
Dispatch Action
    ↓
useSimulator Hook
    ↓
SimulatorContext dispatch()
    ↓
simulatorReducer()
    ↓
Validate & Update State
    ↓
Context Update
    ↓
Components Re-render
    ↓
UI Updates
```

---

## 4. Technology Stack

### Frontend Framework
- **React 18.2+**: UI library with hooks support
- **TypeScript 5.2+**: Type-safe development

### State Management
- **Context API**: Built-in React state management
- **useReducer Hook**: Complex state logic handling

### Styling
- **CSS3**: Native styling
- **CSS Variables**: Theme management (colors, spacing)
- **CSS Grid**: Layout system
- **CSS Flexbox**: Component alignment

### Build & Development
- **Vite 5.0+**: Ultra-fast build tool
- **npm 10+**: Package management

### Code Quality
- **ESLint**: Code linting
- **TypeScript Compiler**: Type checking

### Browser APIs (Future)
- **localStorage**: Data persistence (Phase 5)
- **Canvas API**: Chart rendering (Phase 4)

---

## 5. Utility Functions & Helpers

### Validation Utilities
```typescript
// src/utils/validation.ts

validateSphereValue(value: number): number
// Ensures value is between -10.00 and +10.00
// Returns boundary-clamped value

validateCylinderValue(value: number): number
// Ensures value is between -10.00 and +10.00

validateAxisValue(value: number): number
// Ensures value is between 0 and 180

validateADDValue(value: number): number
// Ensures value is between 0.00 and +10.00

validatePDValue(value: number): number
// Ensures value is between 50 and 80
// Supports 0.5mm increments
```

### Calculation Utilities
```typescript
// src/utils/calculations.ts

incrementValue(
  currentValue: number,
  step: number,
  min: number,
  max: number
): number
// Increment with boundary checking

decrementValue(
  currentValue: number,
  step: number,
  min: number,
  max: number
): number
// Decrement with boundary checking

formatRefractionValue(value: number, decimals: number = 2): string
// Format to fixed decimal places
```

### Configuration Constants
```typescript
// src/utils/constants.ts

export const REFRACTION_RANGES = {
  S: { min: -10.00, max: 10.00, step: 0.25 },
  C: { min: -10.00, max: 10.00, step: 0.25 },
  A: { min: 0, max: 180, step: 1 },
  ADD: { min: 0.00, max: 10.00, step: 0.25 },
};

export const PD_RANGE = {
  min: 50,
  max: 80,
  step: 0.5,
  default: 64,
};

export const DEFAULT_REFRACTION = {
  s: 0.00,
  c: 0.00,
  a: 180,
  add: 0.00,
};
```

---

## 6. Custom Hooks

### useSimulator Hook
```typescript
// src/hooks/useSimulator.ts

export const useSimulator = () => {
  const context = useContext(SimulatorContext);
  if (!context) {
    throw new Error('useSimulator must be used within SimulatorProvider');
  }
  return { state, dispatch };
};
// Provides access to: state and dispatch function
```

### useRefraction Hook (Phase 2)
```typescript
// src/hooks/useRefraction.ts

export const useRefraction = (eye: 'rightEye' | 'leftEye') => {
  const { state, dispatch } = useSimulator();
  
  const updateParam = (param: string, value: number) => {
    // Handle parameter update with validation
  };
  
  const increment = (param: string) => {
    // Increment with step
  };
  
  const decrement = (param: string) => {
    // Decrement with step
  };
  
  return { 
    eye: state[eye],
    updateParam,
    increment,
    decrement,
  };
};
```

### useOcclusion Hook (Phase 3)
```typescript
// src/hooks/useOcclusion.ts

export const useOcclusion = () => {
  const { state, dispatch } = useSimulator();
  
  const toggle = (eye: 'rightEye' | 'leftEye') => {
    dispatch({ type: 'TOGGLE_OCCLUSION', payload: eye });
  };
  
  const isOccluded = (eye: 'rightEye' | 'leftEye') => state.occlusion[eye];
  
  return { toggle, isOccluded };
};
```

---

## 7. File Structure

```
src/
├── components/
│   ├── RefractionTable.tsx      (Phase 2)
│   ├── RefractionCell.tsx       (Phase 2)
│   ├── PDControl.tsx            (Phase 3)
│   ├── OcclusionControl.tsx     (Phase 3)
│   ├── EyeTestMode.tsx          (Phase 3)
│   ├── ChartSection.tsx         (Phase 4)
│   └── index.ts                 (Barrel exports)
│
├── context/
│   └── SimulatorContext.tsx     (State management)
│
├── hooks/
│   ├── useSimulator.ts          (Main hook)
│   ├── useRefraction.ts         (Phase 2)
│   ├── useOcclusion.ts          (Phase 3)
│   └── index.ts
│
├── types/
│   ├── simulator.ts             (State types)
│   ├── components.ts            (Component props)
│   └── index.ts
│
├── utils/
│   ├── validation.ts            (Validation functions)
│   ├── calculations.ts          (Math functions)
│   ├── constants.ts             (App constants)
│   └── index.ts
│
├── styles/
│   ├── global.css               (Global styles)
│   ├── app.css                  (Layout styles)
│   ├── components.css           (Component styles - Phase 2+)
│   └── variables.css            (CSS variables)
│
├── App.tsx                      (Root component)
├── main.tsx                     (Entry point)
└── vite-env.d.ts               (Vite types)
```

---

## 8. Data Flow Examples

### Example 1: Increase Sphere Value
```
User right-clicks on R eye S cell
    ↓
RefractionCell onClick handler
    ↓
Dispatch: UPDATE_RIGHT_EYE_PARAM
    { param: 's', value: currentValue + 0.25 }
    ↓
simulatorReducer validates & updates state
    ↓
Context notifies subscribers
    ↓
RefractionTable re-renders
    ↓
New S value displayed
```

### Example 2: Toggle Occlusion
```
User clicks Right Eye Occlusion button
    ↓
OcclusionControl onClick handler
    ↓
Dispatch: TOGGLE_OCCLUSION
    { payload: 'rightEye' }
    ↓
simulatorReducer toggles state
    ↓
EyeTestMode and RefractionTable components update
    ↓
R eye controls disabled, test mode buttons update
```

---

## 9. API Integration Points (Future)

### Phase 5: Backend Integration
```typescript
// API endpoints structure
POST /api/simulator/preset
  - Save current simulator state
  - Request: SimulatorState
  - Response: { id, createdAt }

GET /api/simulator/preset/:id
  - Load saved preset
  - Response: SimulatorState

GET /api/charts/:chartId
  - Fetch chart data
  - Query: currentRefraction values
  - Response: ChartData[]

POST /api/export/pdf
  - Export current state as PDF
  - Request: SimulatorState
  - Response: PDF blob
```

---

## 10. Error Handling Strategy

### Validation Layer
```typescript
// All state updates validate input
try {
  const validated = validateSphereValue(inputValue);
  dispatch({ type: 'UPDATE_RIGHT_EYE_PARAM', payload: validated });
} catch (error) {
  console.error('Invalid value:', error);
  // Show toast/alert to user
}
```

### Component Error Boundaries (Phase 4)
```typescript
// Wrap components in error boundaries for graceful failures
<ErrorBoundary>
  <RefractionTable />
</ErrorBoundary>
```

---

## 11. Performance Considerations

### Optimization Strategies
1. **Component Memoization**: Prevent unnecessary re-renders
   - Use React.memo() for pure components
   - Use useMemo() for expensive calculations

2. **State Structure**: Flat state for easier updates
   - Avoid deeply nested objects
   - Current structure is optimal

3. **Event Handling**: Efficient event delegation
   - Use event bubbling where applicable
   - Avoid creating new functions on each render

4. **CSS**: Hardware acceleration
   - Use CSS transforms for animations
   - Leverage GPU rendering

---

## 12. Scalability & Future Enhancements

### Phase 5 Considerations
- **Local Storage**: Persist state between sessions
- **Backend API**: Save/load presets
- **Chart Integration**: Real-time chart updates
- **Export**: PDF/CSV export functionality
- **Keyboard Shortcuts**: Faster data entry
- **Presets**: Save/load configuration profiles

### Code Organization for Growth
- Keep utilities pure and testable
- Use dependency injection for flexibility
- Maintain separation of concerns
- Document all public APIs

---

## Summary

This architecture provides:
✅ **Clean separation of concerns** (UI, State, Logic, Data)
✅ **Type safety** with TypeScript
✅ **Scalable state management** with Context API
✅ **Maintainable code** with custom hooks
✅ **Performance** with proper optimization
✅ **Extensibility** for future features
✅ **Testability** with pure functions and isolated logic
