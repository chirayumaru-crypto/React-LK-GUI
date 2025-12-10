# Implementation Plan - MingSing Simulator

## Phase 1: Project Setup & Foundation
- [ ] **Clean Setup**: Restore `src` and `public` folders.
- [ ] **Tailwind Config**: Define the custom color palette (MingSing Blues).
- [ ] **Global State**: Create `MingSingContext` for refraction and chart data.

## Phase 2: Layout & Shell
- [ ] **Main Layout**: Two-column flex/grid container.
- [ ] **Left Panel Container**: For Refraction Table & Controls.
- [ ] **Right Panel Container**: For Chart Grid & Display.

## Phase 3: Left Panel Components
- [ ] **RefractionGrid**: The detailed table with vertical text and Prism rows.
- [ ] **ModeBar**: The FAR/NC/CV/FINAL buttons.
- [ ] **ControlPad**: The custom circular/curved interface at the bottom left.
- [ ] **PDControl**: display and adjustment inputs.

## Phase 4: Right Panel Components
- [ ] **ChartGrid**: The clickable grid of chart icons.
- [ ] **ChartDisplay**: The rendering area for the selected chart.
- [ ] **Toolbars**: Top horizontal and Right vertical icon bars.

## Phase 5: Integration & Polish
- [ ] **Interactivity**: Connect buttons to State (increment/decrement values).
- [ ] **Responsive check**: Ensure it fits the screen (100vh).
- [ ] **Assets**: Generate/place placeholders for icons.
