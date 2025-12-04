# Architecture Summary - Topcon GUI Simulator

## 📋 Quick Reference

### High-Level Architecture
```
User Interface (React Components)
         ↕
State Management (Context API + useReducer)
         ↕
Business Logic (Utils + Custom Hooks)
         ↕
Data Model (TypeScript Interfaces)
```

---

## 🏗️ Complete Architecture Overview

### 1. PRESENTATION LAYER (UI)
**Technology**: React 18, TypeScript, CSS3

**Components**:
- App (Root)
- RefractionTable
- PDControl
- OcclusionControl
- EyeTestMode
- ChartSection

**Responsibilities**:
- Render UI elements
- Handle user interactions
- Pass events to state
- Display state data

**Key Files**:
- `src/App.tsx` - Root component
- `src/components/` - All UI components

---

### 2. STATE MANAGEMENT LAYER
**Technology**: Context API, useReducer

**Structure**:
```typescript
SimulatorState {
  rightEye: { s, c, a, add }
  leftEye: { s, c, a, add }
  pd: number
  occlusion: { rightEye, leftEye }
  testMode: 'left-only' | 'right-only' | 'bino'
}
```

**Actions**:
- UPDATE_RIGHT_EYE_PARAM
- UPDATE_LEFT_EYE_PARAM
- SET_PD
- TOGGLE_OCCLUSION
- SET_TEST_MODE
- RESET

**Reducer Logic**:
- Validates all inputs
- Enforces boundaries
- Updates state immutably
- Handles all business rules

**Key Files**:
- `src/context/SimulatorContext.tsx` - State management

---

### 3. BUSINESS LOGIC LAYER
**Technology**: TypeScript Functions, Custom Hooks

**Validation Functions**:
```
validateSphereValue()         → Clamps to -10.00 to 10.00
validateCylinderValue()       → Clamps to -10.00 to 10.00
validateAxisValue()           → Clamps to 0 to 180
validateADDValue()            → Clamps to 0.00 to 10.00
validatePDValue()             → Clamps to 50 to 80
validateRefractionParam()     → Route to correct validator
```

**Calculation Functions**:
```
incrementValue()    → Increase by step with boundaries
decrementValue()    → Decrease by step with boundaries
incrementPD()       → Increase PD by 0.5 mm
decrementPD()       → Decrease PD by 0.5 mm
formatRefractionValue()  → Format to decimal places
formatPDValue()     → Format to 1 decimal place
```

**Custom Hooks**:
```
useSimulator()      → Access state and dispatch
useRefraction()     → Refraction-specific operations
useOcclusion()      → Occlusion control operations
```

**Key Files**:
- `src/utils/constants.ts` - App constants
- `src/utils/validation.ts` - Validation functions
- `src/utils/calculations.ts` - Math functions
- `src/hooks/useSimulator.ts` - Main hook

---

### 4. DATA MODEL LAYER
**Technology**: TypeScript Interfaces

**Core Types**:
```typescript
interface RefractionValue {
  s: number;    // Sphere
  c: number;    // Cylinder
  a: number;    // Axis
  add: number;  // Addition
}

interface SimulatorState { ... }
interface SimulatorAction { ... }
type EyeTestMode = 'left-only' | 'right-only' | 'bino'
```

**Constants**:
```typescript
REFRACTION_RANGES  → Parameter ranges and steps
PD_RANGE          → PD min/max/step/default
DEFAULT_REFRACTION_VALUE
DECIMAL_PLACES
EYE_TEST_MODES
```

**Key Files**:
- `src/types/simulator.ts` - State types
- `src/utils/constants.ts` - App constants

---

## 📊 Data Flow Diagram

```
┌─────────────────────┐
│   User Interaction  │
│  (Click, Change)    │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Event Handler      │
│  (onClick, etc.)    │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Dispatch Action    │
│  (with payload)     │
└──────────┬──────────┘
           │
           ↓
┌──────────────────────────┐
│  useSimulator Hook       │
│  Context dispatch()      │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  SimulatorContext        │
│  Provider dispatches     │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  simulatorReducer()      │
│  - Validate input        │
│  - Update state          │
│  - Return new state      │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Context Updates All     │
│  Subscribed Components   │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  Components Re-render    │
│  with New State          │
└──────────┬───────────────┘
           │
           ↓
┌──────────────────────────┐
│  UI Reflects Changes     │
│  (Display New Values)    │
└──────────────────────────┘
```

---

## 💻 Component Architecture

### Component Hierarchy
```
App
└── SimulatorProvider
    └── AppContent
        ├── Header
        ├── TopSection (3-Column Grid)
        │   ├── RefractionPanel
        │   │   └── RefractionTable
        │   │       └── RefractionCell × 8
        │   ├── MiddlePanel
        │   │   ├── PDControl
        │   │   │   └── PDButton × 2 (Increment/Decrement)
        │   │   └── OcclusionControl
        │   │       └── OcclusionButton × 2 (Toggle)
        │   └── RightPanel
        │       └── EyeTestMode
        │           └── ModeButton × 3 (R, BINO, L)
        ├── ChartsSection
        │   ├── ChartTabs
        │   │   └── ChartTab × 5+ (Buttons)
        │   └── ChartDisplay (Placeholder)
        └── Footer
```

### Component Properties & Responsibilities

| Component | Purpose | State Access | Key Props |
|-----------|---------|--------------|-----------|
| RefractionTable | Display values | useSimulator | none |
| RefractionCell | Single value cell | via parent | value, disabled |
| PDControl | Adjust PD | useSimulator | none |
| OcclusionControl | Toggle occlusion | useSimulator | none |
| EyeTestMode | Select mode | useSimulator | none |
| ChartSection | Chart display | useSimulator | none |

---

## 🔧 API Reference

### Constants (constants.ts)
```typescript
REFRACTION_RANGES.s       // Sphere range
REFRACTION_RANGES.c       // Cylinder range
REFRACTION_RANGES.a       // Axis range
REFRACTION_RANGES.add     // Addition range
PD_RANGE                  // PD min/max/step/default
DEFAULT_REFRACTION_VALUE  // Default values
DECIMAL_PLACES            // Formatting decimals
```

### Validation Functions (validation.ts)
```typescript
validateSphereValue(value)      // Returns validated sphere
validateCylinderValue(value)    // Returns validated cylinder
validateAxisValue(value)        // Returns validated axis
validateADDValue(value)         // Returns validated addition
validatePDValue(value)          // Returns validated PD
validateRefractionParam(p, v)   // Route to correct validator
isValueInRange(param, value)    // Boolean check
isPDValid(value)                // Boolean check
```

### Calculation Functions (calculations.ts)
```typescript
incrementValue(current, param)        // +step
decrementValue(current, param)        // -step
incrementPD(current)                  // +0.5
decrementPD(current)                  // -0.5
formatRefractionValue(value, param)   // "X.XX"
formatPDValue(value)                  // "X.X"
getStepSize(param)                    // Returns step
getRange(param)                       // Returns {min, max}
isAtMax(value, param)                 // Boolean
isAtMin(value, param)                 // Boolean
isPDAtMax(value)                      // Boolean
isPDAtMin(value)                      // Boolean
```

### Hooks (hooks/useSimulator.ts)
```typescript
const { state, dispatch } = useSimulator();

// state structure:
// state.rightEye       // { s, c, a, add }
// state.leftEye        // { s, c, a, add }
// state.pd             // number (50-80)
// state.occlusion      // { rightEye, leftEye } (boolean)
// state.testMode       // 'left-only' | 'right-only' | 'bino'

// dispatch actions:
dispatch({ type: 'UPDATE_RIGHT_EYE_PARAM', payload: { param: 's', value: 0.5 } })
dispatch({ type: 'UPDATE_LEFT_EYE_PARAM', payload: { param: 'c', value: -0.25 } })
dispatch({ type: 'SET_PD', payload: 65 })
dispatch({ type: 'TOGGLE_OCCLUSION', payload: 'rightEye' })
dispatch({ type: 'SET_TEST_MODE', payload: 'bino' })
dispatch({ type: 'RESET' })
```

---

## 🎯 Parameter Specifications

### S (Sphere)
- Range: -10.00 to +10.00
- Step: 0.25
- Decimal Places: 2
- Default: 0.00

### C (Cylinder)
- Range: -10.00 to +10.00
- Step: 0.25
- Decimal Places: 2
- Default: 0.00

### A (Axis)
- Range: 0 to 180
- Step: 1
- Decimal Places: 0
- Default: 180

### ADD (Addition)
- Range: 0.00 to +10.00
- Step: 0.25
- Decimal Places: 2
- Default: 0.00

### PD (Pupillary Distance)
- Range: 50 to 80 mm
- Step: 0.5 mm
- Decimal Places: 1
- Default: 64

---

## 🎨 Styling Architecture

### CSS Variables (Color Scheme)
```css
--primary-bg: #e8eef7              /* Main background */
--secondary-bg: #d4dce8            /* Secondary areas */
--button-bg: #b8c5d6               /* Buttons default */
--button-hover: #a0afc8            /* Hover state */
--button-active: #8896b0           /* Active state */
--text-primary: #1a1a1a            /* Main text */
--text-secondary: #4a4a4a          /* Secondary text */
--border-color: #6b7a8f            /* Borders */
--highlight-color: #4a90e2         /* Highlights */
--disabled-bg: #e0e8f0             /* Disabled bg */
--disabled-text: #8a96a8           /* Disabled text */
--occlusion-off: #c8d0db           /* Off state */
--occlusion-on: #5a6a7a            /* On state */
--cell-hover: #b3d9ff              /* Cell hover */
--cell-border: #9ab5cf             /* Cell borders */
```

### Layout System
- **Grid**: 3-column layout (2fr, 1.2fr, 1fr)
- **Flexbox**: Component alignment
- **Responsive**: Collapses on smaller screens
- **Transitions**: Smooth interactions

---

## 🔄 State Update Examples

### Example 1: Increase S (Sphere) Value
```javascript
// User right-clicks S cell with value 0.50

// Step 1: Event Handler
handleRightClick('s')

// Step 2: Get new value
const newValue = incrementValue(0.50, 's')  // → 0.75

// Step 3: Dispatch action
dispatch({
  type: 'UPDATE_RIGHT_EYE_PARAM',
  payload: { param: 's', value: 0.75 }
})

// Step 4: Reducer processes
const newState = {
  ...state,
  rightEye: {
    ...state.rightEye,
    s: validateSphereValue(0.75)  // → 0.75
  }
}

// Step 5: Context updates subscribers
// RefractionTable re-renders with new value

// Step 6: UI shows 0.75
```

### Example 2: Occlude Right Eye
```javascript
// User clicks right eye occlusion button

// Step 1: Event Handler
handleOcclusionToggle('rightEye')

// Step 2: Dispatch action
dispatch({
  type: 'TOGGLE_OCCLUSION',
  payload: 'rightEye'
})

// Step 3: Reducer processes
const newState = {
  ...state,
  occlusion: {
    ...state.occlusion,
    rightEye: !state.occlusion.rightEye  // true → false or vice versa
  }
}

// Step 4: Context updates subscribers
// Multiple components re-render:
// - RefractionTable (disables R eye cells)
// - OcclusionControl (shows button highlighted)
// - EyeTestMode (updates disabled states)
```

---

## 📂 File Organization

### By Feature
```
src/
├── components/    ← All React UI components
├── context/       ← State management (SimulatorContext)
├── hooks/         ← Custom React hooks
├── types/         ← TypeScript interfaces
├── utils/         ← Reusable functions
└── styles/        ← CSS files
```

### By Phase
```
Phase 1: ✅
├── App.tsx
├── SimulatorContext.tsx
├── global.css & app.css
├── types/simulator.ts
└── hooks/useSimulator.ts

Phase 2: ⏳
├── components/RefractionTable.tsx
├── components/RefractionCell.tsx
├── utils/validation.ts
├── utils/calculations.ts
└── utils/constants.ts

Phase 3: ⏳
├── components/PDControl.tsx
├── components/OcclusionControl.tsx
├── components/EyeTestMode.tsx
└── hooks/useRefraction.ts, useOcclusion.ts

Phase 4+: ⏳
├── components/ChartSection.tsx
├── styles/components.css
└── Error boundaries, tests
```

---

## 🧪 Testing Approach

### Unit Tests (Phase 4+)
- Validation functions
- Calculation functions
- Reducer logic

### Integration Tests
- Component + State
- User workflows

### E2E Tests
- Complete user scenarios
- Multi-step interactions

---

## 🚀 Deployment Checklist

- [ ] npm run build succeeds
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All tests pass
- [ ] Cross-browser tested
- [ ] Mobile responsive verified
- [ ] Performance tested
- [ ] Accessibility checked

---

## 📚 Documentation Files

1. **PRD.md** - Product Requirements Document
2. **ARCHITECTURE.md** - Detailed architecture guide
3. **TECHNICAL_SUMMARY.md** - This technical overview
4. **README.md** - Project setup and running
5. **Component JSDoc** - In-code documentation

---

## 🎓 Developer Quick Start

### 1. Understand State
→ Read `src/context/SimulatorContext.tsx`

### 2. Learn Constants
→ Read `src/utils/constants.ts`

### 3. Understand Validation
→ Read `src/utils/validation.ts`

### 4. See Component Example
→ Review `src/App.tsx`

### 5. Start Implementation
→ Follow Phase 2 guide

---

## ✨ Key Architecture Benefits

✅ **Separation of Concerns** - UI, state, logic, data clearly separated
✅ **Type Safety** - TypeScript prevents many runtime errors
✅ **Scalability** - Easy to add new features and components
✅ **Testability** - Pure functions and isolated logic
✅ **Maintainability** - Clear structure and documentation
✅ **Performance** - Efficient state management and re-rendering
✅ **Extensibility** - Hooks and utilities for code reuse

---

## 🔗 Next Steps

1. Review Phase 1 code
2. Study ARCHITECTURE.md in detail
3. Implement Phase 2: Refraction Table
4. Follow implementation checklist
5. Test thoroughly before moving to Phase 3

---

**Status**: Complete & Ready for Phase 2  
**Last Updated**: December 3, 2025
