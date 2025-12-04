# Topcon GUI Simulator - Product Requirements Document

## Project Overview
A web-based eye refraction testing simulator mimicking the Topcon CV-5000 phoropter interface. The system allows operators to control refraction parameters, pupillary distance, and occlusion for both eyes, supporting various test modes.

## Feature List

### 1. Refraction Table
**Visuals**:
- Two main columns: **R** (Right Eye) and **L** (Left Eye).
- **R** is displayed on the Left side of the screen.
- **L** is displayed on the Right side of the screen.
- Parameters per eye: **S** (Sphere), **C** (Cylinder), **A** (Axis), **ADD** (Addition).

**Functionality**:
- **Ranges**:
    - **S, C, ADD**: -10.00 to +10.00 (Step: 0.25).
    - **A (Axis)**: 0 to 180 (Step: 1).
- **Interaction**:
    - **Right-Click**: Increase value.
    - **Left-Click**: Decrease value.
    - **Hover**: Highlight cell to indicate interactivity.
- **State**:
    - Values stop at min/max limits (no wrapping).
    - Disabled state: When eye is occluded or not selected in test mode, controls are disabled (visual feedback required).

### 2. PD (Pupillary Distance) Control
**Visuals**:
- Digital display showing current PD (e.g., "64.0").
- Up/Down control buttons.

**Functionality**:
- **Default**: 64.0 mm.
- **Step**: 0.5 mm.
- **Range**: 50.0 mm to 80.0 mm.
- **Interaction**: Click buttons to adjust.

### 3. Occlusion Controls
**Visuals**:
- Two circular buttons located near the PD control.
- **Left Circle**: Controls Right Eye (R) occlusion.
- **Right Circle**: Controls Left Eye (L) occlusion.
- **States**:
    - **Toggle ON** (Occluded): Dark Grey.
    - **Toggle OFF** (Open): Light Grey.

**Functionality**:
- Click to toggle occlusion state.
- When occluded, the corresponding eye's refraction controls are disabled.

### 4. Eye Test Modes
**Visuals**:
- A panel with three options: **R**, **BINO**, **L**.
- Visual indication of selected mode.

**Functionality**:
- **R (Right Only)**:
    - Right Eye controls enabled (unless occluded).
    - Left Eye controls disabled.
- **L (Left Only)**:
    - Left Eye controls enabled (unless occluded).
    - Right Eye controls disabled.
- **BINO (Binocular)**:
    - Both eyes enabled.

### 5. Visual Display (Red/Green)
**Visuals**:
- A box showing Red and Green halves with numbers/letters.
- **Function**: Represents the patient's view or the "Red/Green Test".
- **State**: Static image or simple representation for now.

### 6. Charts Section
**Visuals**:
- Grid of buttons/icons representing different eye charts (e.g., E chart, Letters, etc.).
- **Function**: Placeholder for now.
- **Interaction**: Click to "select" (visual feedback only).

## UI/UX Requirements
- **Layout**: Match the provided screenshot (`TopConApplication.png`).
- **Styling**: "Premium" medical interface look.
    - Backgrounds: Gradients/Glassmorphism where appropriate.
    - Typography: Clear, legible, high-contrast numbers.
- **Responsiveness**: Fixed aspect ratio or responsive container to maintain layout integrity.

## Technical Constraints
- **Framework**: React + TypeScript + Vite.
- **Styling**: Tailwind CSS.
- **State Management**: React Context/Reducer.
