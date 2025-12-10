# MingSing GUI Simulator - PRD & Design Doc

## 1. Overview
Mirror the "MingSing" phoropter control interface. The UI is divided into a dashboard-like control panel for the phoropter (Left) and a chart controller/display (Right).

## 2. Visual Design & Layout
*   **Theme**: Clinical/Medical Blue theme.
    *   **Primary Dark Blue**: `#1d4ed8` (approximate from image) for headers and active buttons.
    *   **Light Blue**: `#dbeafe` for data cells.
    *   **Background**: Light gray/white.
*   **Structure**: 
    *   **Left Column (Refraction & Controls)** (~45% width)
    *   **Right Column (Charts & Display)** (~55% width)

## 3. Key Components

### A. Left Column - Refraction Data
*   **Vertical Labels**: "RIGHTEYE" (left side, vertical), "LEFTEYE" (right side, vertical).
*   **Data Grid**:
    *   Headers: `+0.00` (Current R), `S(0.25)` (Label/Step), `+0.00` (Current L).
    *   Rows:
        1.  **S** (Sphere) - Step 0.25
        2.  **C** (Cylinder) - Step 0.25
        3.  **A** (Axis) - Step 5
        4.  **H** (Horizontal Prism) - BI/BO
        5.  **V** (Vertical Prism) - BD/BU
        6.  **ADD** (Reading Addition)
*   **Mode Buttons**: `FAR`, `NC`, `CV` (Active), `FINAL`, `BACK`, `NEXT`.
*   **PD / VA Controls**:
    *   Displays for PD (Total, R, L) and Vertex Distance/VA.
    *   Arrow indicators.
*   **Input Controls**:
    *   Two circular knobs (left/right).
    *   Central control pad: Top/Bottom curved buttons (`+`, `-`), Left/Right curved buttons (`1`, `2`), Central teal dial/button.

### B. Right Column - Chart System
*   **Top Toolbar**: Icons for E chart, Target, Parking, User 1/2/3.
*   **Chart Grid**:
    *   4 Rows of chart categories (Numbers, Images, Tumbling E, Landolt C).
    *   Selection logic: Updates the main display.
*   **Visual Display Area**: Large white box showing the currently selected chart (e.g., set of E's).
*   **Right Siderail**: Vertical icons (Patient, Grid, Mask, Screen, Device, Print, Refresh, Settings).
*   **Bottom Controls**: Red/Green toggle, Contrast toggle.

## 4. Technical Stack
*   React + TypeScript
*   Tailwind CSS (crucial for the specific grid layouts and styling)
*   Context API for Global State (Refraction values, Selected Chart)

## 5. Data Model (State)
```typescript
interface EyeData {
  sph: number;
  cyl: number;
  axis: number;
  hPrism: number; // Horizontal prism
  vPrism: number; // Vertical prism
  add: number;
}
interface AppState {
  rightEye: EyeData;
  leftEye: EyeData;
  pd: number;
  activeMode: 'FAR' | 'NC' | 'CV' | 'FINAL';
  selectedChart: string;
}
```
