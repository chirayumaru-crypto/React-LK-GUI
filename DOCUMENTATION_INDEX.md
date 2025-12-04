# Complete Architecture & Documentation Index

## 📚 Documentation Map

### 1. **PRD.md** - Product Requirements
   - Project overview
   - Core features specification
   - Parameter ranges and defaults
   - UI layout design
   - Implementation phases
   - Acceptance criteria

### 2. **ARCHITECTURE.md** - Detailed Architecture (Comprehensive)
   - High-level system architecture
   - Low-level component architecture
   - State management design
   - Technology stack details
   - Utility functions reference
   - Custom hooks design
   - File structure
   - Data flow examples
   - API integration points
   - Error handling strategy
   - Performance considerations
   - Scalability & future enhancements

### 3. **ARCHITECTURE_QUICK_REFERENCE.md** - Quick Reference (Concise)
   - At-a-glance architecture overview
   - Component hierarchy
   - Data flow diagram
   - Complete API reference
   - Parameter specifications
   - Styling architecture
   - State update examples
   - File organization
   - Developer quick start

### 4. **TECHNICAL_SUMMARY.md** - Complete Technical Overview
   - High-level architecture
   - Low-level architecture
   - Technology stack with details
   - Project structure walkthrough
   - Key concepts explained
   - Implementation phases breakdown
   - Utility functions categorized
   - Custom hooks detailed
   - CSS variables and styling
   - Data flow examples
   - Testing strategy
   - Performance optimization
   - Type safety benefits
   - Development workflow
   - Contributing guidelines

### 5. **PHASE_2_IMPLEMENTATION_GUIDE.md** - Phase 2 Implementation
   - Phase 2 objectives
   - Component structure for refraction table
   - Step-by-step implementation workflow
   - User interaction flow
   - Validation & boundary checking
   - CSS styling guide
   - Implementation checklist
   - Key concepts for developers
   - Expected behavior examples
   - Pro tips and pitfalls
   - Definition of done

---

## 🎯 How to Use These Documents

### For Architecture Understanding
```
Quick Overview:
  1. Start → ARCHITECTURE_QUICK_REFERENCE.md (5 min read)
  2. Deep Dive → ARCHITECTURE.md (30 min read)
  3. Reference → Keep ARCHITECTURE_QUICK_REFERENCE.md as bookmark

For Implementation:
  1. Review → TECHNICAL_SUMMARY.md (understand full picture)
  2. Reference → ARCHITECTURE_QUICK_REFERENCE.md (API calls)
  3. Implement → Follow PHASE_2_IMPLEMENTATION_GUIDE.md
```

### For Quick Lookups
```
"How do I increment a value?"
  → ARCHITECTURE_QUICK_REFERENCE.md → API Reference → incrementValue()

"What's the Sphere range?"
  → TECHNICAL_SUMMARY.md → Parameter Specifications → S (Sphere)

"How does occlusion work?"
  → ARCHITECTURE.md → State Management Architecture
  
"What's the file structure?"
  → ARCHITECTURE_QUICK_REFERENCE.md → File Organization
```

### For New Developers
```
1. Read: ARCHITECTURE_QUICK_REFERENCE.md (overview)
2. Read: TECHNICAL_SUMMARY.md → Developer Quick Start
3. Study: src/context/SimulatorContext.tsx
4. Study: src/utils/constants.ts
5. Review: PHASE_2_IMPLEMENTATION_GUIDE.md
6. Start: Implement Phase 2 components
```

---

## 🏗️ Architecture at a Glance

### System Layers
```
┌─────────────────────────────────┐
│   Presentation (React UI)       │
├─────────────────────────────────┤
│   State (Context + useReducer)  │
├─────────────────────────────────┤
│   Logic (Utils + Hooks)         │
├─────────────────────────────────┤
│   Data (TypeScript Types)       │
└─────────────────────────────────┘
```

### Core Technologies
- **React 18** - Component framework
- **TypeScript** - Type safety
- **Context API** - State management
- **CSS3** - Styling with variables
- **Vite** - Build tool

### Key Patterns
- Context API + useReducer for state
- Custom hooks for reusable logic
- Pure utility functions for calculations
- TypeScript interfaces for types

---

## 📊 State Structure

```typescript
interface SimulatorState {
  rightEye: {
    s: number;      // Sphere (-10 to 10)
    c: number;      // Cylinder (-10 to 10)
    a: number;      // Axis (0 to 180)
    add: number;    // Addition (0 to 10)
  };
  leftEye: { /* same structure */ };
  pd: number;       // Pupillary distance (50 to 80)
  occlusion: {
    rightEye: boolean;
    leftEye: boolean;
  };
  testMode: 'left-only' | 'right-only' | 'bino';
}
```

---

## 🔄 Data Flow

```
User Action (Click)
  ↓
Event Handler
  ↓
Calculate New Value
  ↓
Validate Input
  ↓
Dispatch Action
  ↓
SimulatorReducer
  ↓
Update State
  ↓
Context Update
  ↓
Components Re-render
  ↓
UI Displays Change
```

---

## 🛠️ Utility Functions Quick Reference

### Validation
- `validateSphereValue()` - Clamp sphere to -10 to 10
- `validateCylinderValue()` - Clamp cylinder to -10 to 10
- `validateAxisValue()` - Clamp axis to 0 to 180
- `validateADDValue()` - Clamp addition to 0 to 10
- `validatePDValue()` - Clamp PD to 50 to 80

### Calculations
- `incrementValue(value, param)` - +step with boundaries
- `decrementValue(value, param)` - -step with boundaries
- `incrementPD(pd)` - Increase PD by 0.5
- `decrementPD(pd)` - Decrease PD by 0.5
- `formatRefractionValue(value, param)` - Format to decimals
- `formatPDValue(value)` - Format PD to 1 decimal

### Helpers
- `getStepSize(param)` - Get parameter's step value
- `getRange(param)` - Get min/max for parameter
- `isAtMax(value, param)` - Check if at maximum
- `isAtMin(value, param)` - Check if at minimum

---

## 📁 Key Files Quick Reference

### State Management
```
src/context/SimulatorContext.tsx      ← All state logic
src/types/simulator.ts                 ← State interfaces
```

### Utilities
```
src/utils/constants.ts                 ← App constants
src/utils/validation.ts                ← Validation functions
src/utils/calculations.ts              ← Math functions
```

### Hooks
```
src/hooks/useSimulator.ts              ← Main hook (always use)
src/hooks/useRefraction.ts             ← Refraction operations (Phase 2)
src/hooks/useOcclusion.ts              ← Occlusion operations (Phase 3)
```

### Components (Phase 1 Complete)
```
src/App.tsx                            ← Root component
src/styles/global.css                  ← Global styling
src/styles/app.css                     ← Layout styling
```

---

## 🎯 Parameter Quick Reference

| Param | Label | Range | Step | Decimals | Default |
|-------|-------|-------|------|----------|---------|
| S | Sphere | -10 to 10 | 0.25 | 2 | 0.00 |
| C | Cylinder | -10 to 10 | 0.25 | 2 | 0.00 |
| A | Axis | 0 to 180 | 1 | 0 | 180 |
| ADD | Addition | 0 to 10 | 0.25 | 2 | 0.00 |
| PD | PD | 50 to 80 | 0.5 | 1 | 64 |

---

## 🎨 Color Palette

```css
Primary Background: #e8eef7
Button Default: #b8c5d6
Button Hover: #a0afc8
Button Active: #8896b0
Text Primary: #1a1a1a
Cell Hover: #b3d9ff
Cell Border: #9ab5cf
Disabled: #e0e8f0
Highlight: #4a90e2
```

---

## 🔗 API Endpoints (Future - Phase 5)

```typescript
// Save preset
POST /api/simulator/preset
  Request: SimulatorState
  Response: { id, createdAt }

// Load preset
GET /api/simulator/preset/:id
  Response: SimulatorState

// Get chart data
GET /api/charts/:chartId
  Query: { currentRefraction }
  Response: ChartData[]

// Export to PDF
POST /api/export/pdf
  Request: SimulatorState
  Response: PDF blob
```

---

## 🔐 Type Safety

All inputs are validated:
```typescript
// Example: Update sphere value
dispatch({
  type: 'UPDATE_RIGHT_EYE_PARAM',
  payload: { param: 's', value: 10.5 }  // Input
})

// Reducer validates and clamps
case 'UPDATE_RIGHT_EYE_PARAM':
  validateSphereValue(10.5)  // → 10.0 (clamped to max)
```

---

## 📋 Implementation Phases Summary

### Phase 1 ✅ COMPLETE
- Project setup
- State management
- Layout mockup
- Global styling

### Phase 2 ⏳ NEXT
- Refraction table interactions
- Click handlers
- Boundary validation
- Hover effects

### Phase 3 ⏳
- PD control logic
- Occlusion control logic
- Eye test mode logic
- State synchronization

### Phase 4 ⏳
- Charts section
- Professional styling
- Responsive design
- Accessibility

### Phase 5 ⏳
- localStorage persistence
- Backend integration
- Export functionality
- Advanced features

---

## 🎓 Learning Path

1. **Understand State** (15 min)
   - Read: ARCHITECTURE_QUICK_REFERENCE.md § State Structure

2. **Understand Flow** (20 min)
   - Read: TECHNICAL_SUMMARY.md § Data Flow Examples

3. **Review Code** (30 min)
   - Study: src/context/SimulatorContext.tsx
   - Study: src/utils/constants.ts
   - Study: src/utils/validation.ts

4. **Understand API** (15 min)
   - Read: ARCHITECTURE_QUICK_REFERENCE.md § API Reference

5. **Plan Implementation** (20 min)
   - Read: PHASE_2_IMPLEMENTATION_GUIDE.md
   - Create component sketches

6. **Code & Test** (3-4 hours)
   - Follow Phase 2 guide
   - Test thoroughly

---

## ✨ Architecture Highlights

### Separation of Concerns ✅
- UI logic separate from business logic
- State management isolated
- Utilities are pure functions
- Types define contracts

### Type Safety ✅
- Full TypeScript coverage
- No implicit `any` types
- Compile-time error checking
- Self-documenting code

### Scalability ✅
- Modular component structure
- Reusable hooks
- Testable pure functions
- Easy to extend

### Maintainability ✅
- Clear file organization
- Consistent naming
- Comprehensive documentation
- Easy to onboard developers

---

## 🚀 Getting Started

### Quick Start (5 steps)

1. **Install**
   ```bash
   cd topcon-gui-simulator
   npm install
   ```

2. **Start Dev Server**
   ```bash
   npm run dev
   ```

3. **Understand State**
   - Open `src/context/SimulatorContext.tsx`
   - Review action types

4. **Review Architecture**
   - Read `ARCHITECTURE_QUICK_REFERENCE.md`

5. **Begin Phase 2**
   - Follow `PHASE_2_IMPLEMENTATION_GUIDE.md`

---

## 📞 Documentation Quick Links

### Architecture Deep Dives
- **High-Level**: ARCHITECTURE.md § High-Level Architecture
- **Low-Level**: ARCHITECTURE.md § Low-Level Architecture
- **State Design**: ARCHITECTURE.md § State Management Architecture

### API & Functions
- **Quick Ref**: ARCHITECTURE_QUICK_REFERENCE.md § API Reference
- **Validation**: TECHNICAL_SUMMARY.md § Validation Functions
- **Calculations**: TECHNICAL_SUMMARY.md § Calculation Functions

### Implementation Guides
- **Phase 2**: PHASE_2_IMPLEMENTATION_GUIDE.md
- **Structure**: TECHNICAL_SUMMARY.md § File Structure
- **Workflow**: TECHNICAL_SUMMARY.md § Development Workflow

---

## 🎯 Success Criteria

By end of Phase 1:
- ✅ React project initialized
- ✅ State management implemented
- ✅ UI layout created
- ✅ Documentation complete

By end of Phase 2:
- ✅ Refraction table interactive
- ✅ Click handlers working
- ✅ Boundary validation active
- ✅ Hover effects visible

---

## 📈 Project Stats

- **Components**: 7+ (growing)
- **Custom Hooks**: 3+ (for reusability)
- **Utility Functions**: 15+ (pure, testable)
- **Lines of Code (estimated)**:
  - Components: ~500
  - State: ~200
  - Utilities: ~400
  - Styling: ~600
  - **Total**: ~1700 (Phase 1 + 2 + 3)

---

## 🔄 Next Actions

### Immediate (Now)
- [ ] Review all documentation
- [ ] Run `npm install` in project
- [ ] Run `npm run dev` to start server
- [ ] Verify layout looks correct

### Short-term (This week)
- [ ] Complete Phase 2 implementation
- [ ] Test all interactions
- [ ] Get code review

### Medium-term (Next week)
- [ ] Complete Phase 3
- [ ] Add styling polish
- [ ] Comprehensive testing

---

## 📞 Support

**Need clarification?**
- Check ARCHITECTURE_QUICK_REFERENCE.md first (quickest answers)
- Then check ARCHITECTURE.md (detailed answers)
- Finally check TECHNICAL_SUMMARY.md (comprehensive details)

**Ready to implement?**
- Follow PHASE_2_IMPLEMENTATION_GUIDE.md step-by-step

**Questions about**:
- State → SimulatorContext.tsx
- Types → src/types/simulator.ts
- Utilities → src/utils/ folder
- Constants → src/utils/constants.ts

---

**Status**: Phase 1 Complete ✅ Ready for Phase 2  
**Last Updated**: December 3, 2025  
**Architecture Version**: 1.0
