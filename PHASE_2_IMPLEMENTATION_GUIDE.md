# IMPLEMENTATION GUIDE - Phase 2: Refraction Table

## 📋 Overview
This phase implements the core interaction logic for the Refraction Table - the primary control interface for adjusting optical parameters.

---

## 🎯 Phase 2 Objectives

✅ Build interactive refraction table  
✅ Implement click handlers (left/right click)  
✅ Add value increment/decrement logic  
✅ Enforce boundary validation  
✅ Add hover visual feedback  
✅ Implement occlusion disabling  
✅ Implement test mode disabling  

---

## 📊 Component Structure

### RefractionTable Component
**Purpose**: Main table displaying all 8 refraction values

**Responsibilities**:
- Display all parameter values
- Handle cell interactions
- Manage hover states
- Apply disabled states based on occlusion/test mode

**Props**: None (uses context)

**State Used**:
- state.rightEye
- state.leftEye
- state.occlusion
- state.testMode

---

### RefractionCell Component
**Purpose**: Individual cell for one parameter value

**Responsibilities**:
- Display parameter value
- Handle left-click (decrease)
- Handle right-click (increase)
- Show hover effect
- Show disabled state

**Props**:
```typescript
interface RefractionCellProps {
  eye: 'rightEye' | 'leftEye';
  param: 's' | 'c' | 'a' | 'add';
  value: number;
  disabled: boolean;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}
```

---

## 🔄 Implementation Workflow

### Step 1: Create RefractionCell Component
```typescript
// src/components/RefractionCell.tsx

import React from 'react';

interface RefractionCellProps {
  eye: 'rightEye' | 'leftEye';
  param: 's' | 'c' | 'a' | 'add';
  value: number;
  disabled: boolean;
  onLeftClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
}

const RefractionCell: React.FC<RefractionCellProps> = ({
  eye,
  param,
  value,
  disabled,
  onLeftClick,
  onRightClick,
}) => {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled) {
      onRightClick(e);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      onLeftClick();
    }
  };

  return (
    <td
      className={`refraction-cell ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      onMouseDown={(e) => e.button === 1 && e.preventDefault()}
    >
      {value}
    </td>
  );
};

export default RefractionCell;
```

### Step 2: Create useRefraction Hook
```typescript
// src/hooks/useRefraction.ts

import { useSimulator } from './useSimulator';
import { incrementValue, decrementValue } from '../utils/calculations';

export const useRefraction = (eye: 'rightEye' | 'leftEye') => {
  const { state, dispatch } = useSimulator();

  const updateParam = (param: 's' | 'c' | 'a' | 'add', value: number) => {
    const actionType = eye === 'rightEye' 
      ? 'UPDATE_RIGHT_EYE_PARAM' 
      : 'UPDATE_LEFT_EYE_PARAM';

    dispatch({
      type: actionType as any,
      payload: { param, value },
    });
  };

  const increment = (param: 's' | 'c' | 'a' | 'add') => {
    const currentValue = state[eye][param];
    const newValue = incrementValue(currentValue, param);
    updateParam(param, newValue);
  };

  const decrement = (param: 's' | 'c' | 'a' | 'add') => {
    const currentValue = state[eye][param];
    const newValue = decrementValue(currentValue, param);
    updateParam(param, newValue);
  };

  return {
    eye: state[eye],
    updateParam,
    increment,
    decrement,
  };
};
```

### Step 3: Update RefractionTable Component
```typescript
// In src/App.tsx, create RefractionTable section

const RefractionTable: React.FC = () => {
  const { state } = useSimulator();
  const rightEye = useRefraction('rightEye');
  const leftEye = useRefraction('leftEye');

  const isRightEyeDisabled = state.occlusion.rightEye || 
    (state.testMode === 'left-only');

  const isLeftEyeDisabled = state.occlusion.leftEye || 
    (state.testMode === 'right-only');

  const handleRightEyeIncrement = (param: 's' | 'c' | 'a' | 'add') => {
    rightEye.increment(param);
  };

  const handleRightEyeDecrement = (param: 's' | 'c' | 'a' | 'add') => {
    rightEye.decrement(param);
  };

  // Similar for left eye...

  return (
    <table className="refraction-table">
      <tbody>
        {/* Right Eye Rows */}
        <tr>
          <td className="eye-label-cell">R</td>
          <td className="param-label">S</td>
          <RefractionCell
            eye="rightEye"
            param="s"
            value={state.rightEye.s}
            disabled={isRightEyeDisabled}
            onLeftClick={() => handleRightEyeDecrement('s')}
            onRightClick={() => handleRightEyeIncrement('s')}
          />
        </tr>
        {/* More rows... */}
      </tbody>
    </table>
  );
};
```

---

## 🎮 User Interaction Flow

### Scenario: User wants to increase S (Sphere) from 0.00 to 0.25

```
1. User sees cell displaying "0.00"
2. Hovers over cell → cell highlights in light blue
3. Right-clicks cell → preventDefault default menu
4. Click handler triggered:
   - incrementValue(0.00, 's') called
   - validateSphereValue(0.25) validates
   - Dispatch: UPDATE_RIGHT_EYE_PARAM
5. Reducer processes:
   - Validates input (0.25 is valid)
   - Updates state.rightEye.s = 0.25
6. Context notifies RefractionTable
7. Component re-renders with new value "0.25"
8. User sees updated value
```

---

## ⚙️ Validation & Boundary Checking

### Built into Reducer
```typescript
case 'UPDATE_RIGHT_EYE_PARAM':
  return {
    ...state,
    rightEye: {
      ...state.rightEye,
      [payload.param]: validateRefractionParam(payload.param, payload.value)
    }
  };
```

### Validation Stack
```
Input Value (e.g., 10.50 for Sphere)
    ↓
validateRefractionParam('s', 10.50)
    ↓
validateSphereValue(10.50)
    ↓
Math.max(-10, Math.min(10, 10.50)) → 10.00
    ↓
Return: 10.00 (clamped to max)
    ↓
State Updated with 10.00
```

---

## 🎨 CSS Styling (app.css)

```css
.refraction-cell {
  font-weight: 500;
  color: var(--text-primary);
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease;
  min-width: 60px;
  padding: 12px;
  border: 1px solid var(--cell-border);
}

.refraction-cell:hover:not(.disabled) {
  background-color: var(--cell-hover);  /* #b3d9ff */
}

.refraction-cell.disabled {
  background-color: var(--disabled-bg);  /* #e0e8f0 */
  color: var(--disabled-text);           /* #8a96a8 */
  cursor: not-allowed;
  opacity: 0.6;
}
```

---

## 📋 Implementation Checklist

### Before Coding
- [ ] Review utility functions (validation, calculations)
- [ ] Understand state structure
- [ ] Review action types
- [ ] Plan component structure

### Component Development
- [ ] Create RefractionCell component
- [ ] Create useRefraction hook
- [ ] Update RefractionTable in App.tsx
- [ ] Implement click handlers
- [ ] Add validation logic
- [ ] Connect to state/dispatch

### Styling
- [ ] Add hover effects
- [ ] Add disabled state styling
- [ ] Test visual feedback
- [ ] Verify responsive behavior

### Testing
- [ ] Test left-click (decrease)
- [ ] Test right-click (increase)
- [ ] Test boundary conditions
- [ ] Test occlusion disabling
- [ ] Test test mode disabling
- [ ] Test hover effects
- [ ] Cross-browser testing

### Quality Assurance
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All values format correctly
- [ ] All boundaries respected
- [ ] Accessibility (aria labels)
- [ ] Responsive on different screens

---

## 🧠 Key Concepts

### Click vs Right-Click
```javascript
onClick      // Left-click → DECREASE value
onContextMenu (with preventDefault) // Right-click → INCREASE value
```

### Disabled States (Mutually Exclusive)
```javascript
const isDisabled = 
  state.occlusion[eye] ||                    // Eye is occluded
  (state.testMode === 'left-only' && eye === 'rightEye') ||  // Test mode
  (state.testMode === 'right-only' && eye === 'leftEye');
```

### Value Formatting
```javascript
// S, C, ADD: 2 decimals
state.rightEye.s.toFixed(2)   // "0.00", "-10.00", "+10.00"

// A (Axis): 0 decimals
state.rightEye.a.toString()   // "0", "90", "180"

// PD: 1 decimal (in different component)
state.pd.toFixed(1)           // "64.0", "50.5", "80.0"
```

---

## 🔍 Expected Behavior Examples

### Example 1: Normal Increment
```
Current S value: 0.00
User right-clicks
Expected new value: 0.25
Status: ✓ Within range
```

### Example 2: Boundary Reached
```
Current S value: 10.00
User right-clicks
Expected new value: 10.00 (stays at max)
Status: ✓ Clamped to max
Feedback: Value doesn't change, no error
```

### Example 3: Disabled Cell
```
Current state: Right eye occluded
User tries to click cell
Expected: No change, cell appears greyed
Status: ✓ Interaction blocked
```

### Example 4: Test Mode Active
```
Current state: Left-only mode
User tries to interact with R eye
Expected: Cell disabled
Status: ✓ Mode prevents changes
Values preserved: Yes, when switching modes back
```

---

## 📚 Files to Create/Modify

### Create:
```
src/components/RefractionCell.tsx
src/hooks/useRefraction.ts
```

### Modify:
```
src/App.tsx (RefractionTable section)
src/styles/app.css (cell styling)
```

### Already Exist:
```
src/utils/validation.ts
src/utils/calculations.ts
src/utils/constants.ts
src/context/SimulatorContext.tsx
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
cd topcon-gui-simulator
npm install

# Start development server
npm run dev

# Check for errors
npm run build

# Lint code
npm run lint
```

---

## 💡 Pro Tips

1. **Test Incrementally**: Test each parameter (S, C, A, ADD) separately
2. **Use Browser DevTools**: Check state in Context via React DevTools
3. **Test Boundaries**: Always test min, max, and edge values
4. **Test Interactions**: Try clicking when disabled (should have no effect)
5. **Format Check**: Ensure values display with correct decimal places
6. **Responsive Test**: Test on different screen sizes

---

## 🐛 Common Pitfalls to Avoid

❌ Forgetting preventDefault() on right-click → Shows browser context menu  
❌ Not checking disabled state → Allows interaction when disabled  
❌ Wrong step increment → Use 0.25 for S/C/ADD, 1 for A  
❌ Not formatting values → Display "0" instead of "0.00"  
❌ Not handling test mode → Doesn't disable correct columns  
❌ Direct state mutation → Always return new object in reducer  

---

## 📞 Need Help?

- **State Structure?** → Check SimulatorContext.tsx
- **Validation Logic?** → Check utils/validation.ts
- **Calculation Logic?** → Check utils/calculations.ts
- **Constants?** → Check utils/constants.ts
- **Architecture?** → Read ARCHITECTURE.md
- **Quick Ref?** → Read ARCHITECTURE_QUICK_REFERENCE.md

---

## ✅ Phase 2 Definition of Done

- [ ] RefractionCell component created and working
- [ ] useRefraction hook created and working
- [ ] Left-click decrements values correctly
- [ ] Right-click increments values correctly
- [ ] Boundary checking prevents out-of-range values
- [ ] Hover effect shows on cells
- [ ] Disabled cells don't respond to clicks
- [ ] Occlusion properly disables cells
- [ ] Test mode properly disables cells
- [ ] All values format with correct decimals
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Cross-browser tested
- [ ] Responsive design verified
- [ ] Code documented with JSDoc

---

**Next Steps**: Once Phase 2 is complete, proceed to Phase 3: Control Components (PD, Occlusion, Test Mode Logic)

**Estimated Duration**: 3-4 hours  
**Difficulty**: Intermediate  
**Key Skills**: React hooks, Event handling, State management
