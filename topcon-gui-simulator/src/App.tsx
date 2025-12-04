import React from 'react';
import { SimulatorProvider } from './context/SimulatorContext';
import { useSimulator } from './hooks/useSimulator';
import { useRefraction } from './hooks/useRefraction';
import { RefractionCell } from './components';
import './styles/global.css';
import './styles/app.css';

const AppContent: React.FC = () => {
  const { state, dispatch } = useSimulator();
  const { handleIncrement, handleDecrement, isCellDisabled } = useRefraction();

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Topcon CV-5000 GUI Simulator</h1>
        <p>Interactive Phoropter Control Interface</p>
      </header>

      {/* Main Content - 3 Column Layout */}
      <div className="main-content">
        {/* Column 1: Refraction Table */}
        <div className="refraction-panel">
          <table className="refraction-table">
            <thead>
              <tr>
                <th className="header-r">R</th>
                <th className="header-center" colSpan={3}>SBJ DATA:FAR</th>
                <th className="header-l">L</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <RefractionCell
                  value={state.rightEye.s}
                  param="s"
                  eye="rightEye"
                  disabled={isCellDisabled('rightEye')}
                  onIncrement={() => handleIncrement('rightEye', 's')}
                  onDecrement={() => handleDecrement('rightEye', 's')}
                />
                <td className="param-label yellow">S</td>
                <RefractionCell
                  value={state.leftEye.s}
                  param="s"
                  eye="leftEye"
                  disabled={isCellDisabled('leftEye')}
                  onIncrement={() => handleIncrement('leftEye', 's')}
                  onDecrement={() => handleDecrement('leftEye', 's')}
                />
              </tr>
              <tr>
                <RefractionCell
                  value={state.rightEye.c}
                  param="c"
                  eye="rightEye"
                  disabled={isCellDisabled('rightEye')}
                  onIncrement={() => handleIncrement('rightEye', 'c')}
                  onDecrement={() => handleDecrement('rightEye', 'c')}
                />
                <td className="param-label">C</td>
                <RefractionCell
                  value={state.leftEye.c}
                  param="c"
                  eye="leftEye"
                  disabled={isCellDisabled('leftEye')}
                  onIncrement={() => handleIncrement('leftEye', 'c')}
                  onDecrement={() => handleDecrement('leftEye', 'c')}
                />
              </tr>
              <tr>
                <RefractionCell
                  value={state.rightEye.a}
                  param="a"
                  eye="rightEye"
                  disabled={isCellDisabled('rightEye')}
                  onIncrement={() => handleIncrement('rightEye', 'a')}
                  onDecrement={() => handleDecrement('rightEye', 'a')}
                />
                <td className="param-label">A</td>
                <RefractionCell
                  value={state.leftEye.a}
                  param="a"
                  eye="leftEye"
                  disabled={isCellDisabled('leftEye')}
                  onIncrement={() => handleIncrement('leftEye', 'a')}
                  onDecrement={() => handleDecrement('leftEye', 'a')}
                />
              </tr>
              <tr>
                <RefractionCell
                  value={state.rightEye.add}
                  param="add"
                  eye="rightEye"
                  disabled={isCellDisabled('rightEye')}
                  onIncrement={() => handleIncrement('rightEye', 'add')}
                  onDecrement={() => handleDecrement('rightEye', 'add')}
                />
                <td className="param-label">ADD</td>
                <RefractionCell
                  value={state.leftEye.add}
                  param="add"
                  eye="leftEye"
                  disabled={isCellDisabled('leftEye')}
                  onIncrement={() => handleIncrement('leftEye', 'add')}
                  onDecrement={() => handleDecrement('leftEye', 'add')}
                />
              </tr>
            </tbody>
          </table>
        </div>

        {/* Column 2: PD & Occlusion Controls */}
        <div className="controls-panel">
          <div className="controls-wrapper">
            <button
              className={`occlusion-btn ${state.occlusion.rightEye ? 'occluded' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_OCCLUSION', payload: 'rightEye' })}
            />
            <div className="pd-box">
              <div className="pd-label">PD</div>
              <div className="pd-value">{state.pd.toFixed(1)}</div>
            </div>
            <button
              className={`occlusion-btn ${state.occlusion.leftEye ? 'occluded' : ''}`}
              onClick={() => dispatch({ type: 'TOGGLE_OCCLUSION', payload: 'leftEye' })}
            />
          </div>
        </div>

        {/* Column 3: Eye Test Modes */}
        <div className="mode-panel">
          <div className="mode-buttons">
            <button
              className={`mode-btn ${state.testMode === 'right-only' ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_TEST_MODE', payload: 'right-only' })}
              disabled={state.occlusion.rightEye}
            >
              R
            </button>
            <button
              className={`mode-btn ${state.testMode === 'bino' ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_TEST_MODE', payload: 'bino' })}
              disabled={state.occlusion.leftEye && state.occlusion.rightEye}
            >
              BINO
            </button>
            <button
              className={`mode-btn ${state.testMode === 'left-only' ? 'active' : ''}`}
              onClick={() => dispatch({ type: 'SET_TEST_MODE', payload: 'left-only' })}
              disabled={state.occlusion.leftEye}
            >
              L
            </button>
          </div>
          <div className="visual-box">
            <div className="sph-label">(-)SPH(+)</div>
            <div className="eye-display">
              <span className="red-r">R</span>
              <span className="circle">⊙</span>
              <span className="green-g">G</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="charts-header">CHARTS SECTION</div>
        <div className="chart-tabs">
          <button className="chart-btn">CHART 1</button>
          <button className="chart-btn">CHART 2</button>
          <button className="chart-btn">CHART 3</button>
          <button className="chart-btn">CHART 4</button>
          <button className="chart-btn">CHART 5</button>
        </div>
        <div className="chart-display">
          <p>Chart content will be displayed here. Select a chart tab above.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>Topcon CV-5000 GUI Simulator v0.1.0 | Phase 2 - Interactive Controls</p>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <SimulatorProvider>
      <AppContent />
    </SimulatorProvider>
  );
};

export default App;
