import { MingSingProvider } from './context/MingSingContext';
import { RefractionTable } from './components/RefractionTable';
import { ModeBar } from './components/ModeBar';
import { PDControls } from './components/PDControls';
import { ControlPad } from './components/ControlPad';
import { ChartGrid } from './components/ChartGrid';
import { ChartDisplay } from './components/ChartDisplay';

import { CSVExporter } from './components/CSVExporter';

function AppContent() {
  return (
    <div className="flex w-screen h-screen bg-gray-200 overflow-hidden font-sans">

      {/* LEFT PANEL: Refraction & Controls */}
      <div className="w-[45%] flex flex-col p-2 gap-2 border-r border-gray-400 bg-gray-100">
        <RefractionTable />
        <ModeBar />
        <PDControls />
        <ControlPad />
      </div>

      {/* RIGHT PANEL: Charts & Display */}
      <div className="w-[55%] flex flex-col p-1 bg-white relative">
        <div className="absolute top-2 right-4 z-10">
          <CSVExporter />
        </div>

        {/* Top: Chart Selection Grid */}
        <div className="h-[45%] overflow-y-auto border-b border-gray-300 pb-2 pt-8">
          <ChartGrid />
        </div>

        {/* Bottom: Sidebar + Display */}
        <div className="flex-1 flex overflow-hidden mt-1 gap-1">
          {/* Chart Visual Display */}
          <div className="flex-1 rounded">
            <ChartDisplay />
          </div>

          {/* Right Sidebar Toolbar */}
          <div className="w-16 bg-gradient-to-b from-blue-700 to-blue-900 flex flex-col items-center gap-2 py-2 rounded">
            {['🖥️', '🖨️', '⚙️', '🔄', '👓', '📏'].map((icon, i) => (
              <button key={i} className="w-12 h-12 bg-transparent text-white text-2xl hover:bg-white/20 rounded flex items-center justify-center">
                {icon}
              </button>
            ))}
            <div className="mt-auto flex flex-col gap-2">
              <div className="w-12 h-12 bg-blue-500 text-white font-bold flex items-center justify-center text-sm rounded">0.1</div>
              <div className="w-12 h-12 bg-blue-600 text-white font-bold flex items-center justify-center text-sm rounded">0.16</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function App() {
  return (
    <MingSingProvider>
      <AppContent />
    </MingSingProvider>
  )
}

export default App
