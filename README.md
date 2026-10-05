# BeltSentinel-X Frontend Prototype

A standalone, responsive dashboard prototype for the Budding Sparks Smart India Hackathon 2026 solution.

## What is included
- Overview / control-room dashboard
- Live-looking motor RPM, power, alignment and prediction-risk cards
- SVG telemetry chart with no external chart library
- System health for THz, feedback, beam, motor and AI inspection modules
- Zone-based conveyor fault localization
- Conveyor health visual with sensor tags
- AI inspection / THz tomography simulation
- Alerts & prediction management
- Predictive maintenance planner
- Simulated live telemetry refresh
- Inspection action simulation
- Maintenance scheduling interaction
- Responsive mobile/tablet layout

## Run
No build tools are required.

1. Extract the folder.
2. Open `index.html` in Chrome/Edge.
3. For the best demo experience, use a local server (optional):
   - VS Code + Live Server, or
   - `python -m http.server 8000`
4. Open `http://localhost:8000`

## Prototype note
The dashboard currently uses simulated data. It is intentionally structured so the frontend can later consume real IoT/API/WebSocket data from the sensing hardware and AI backend.

## Source basis
The dashboard structure follows the uploaded Budding Sparks solution concept: BeltSentinel-X, multimodal conveyor monitoring, THz tomography, feedback sensing, beam alignment, motor RPM/power monitoring, air-blower-assisted inspection, autonomous inspection, zone identification, and intelligent monitoring software.
