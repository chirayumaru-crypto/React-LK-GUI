import { useState, useEffect } from 'react'
import { EyeDataProvider } from './context/EyeDataContext'
import { RefractionTable } from './components/RefractionTable'
import { PDControl } from './components/PDControl'
import { OcclusionControl } from './components/OcclusionControl'
import { TestModeControl } from './components/TestModeControl'
import { ChartsSection } from './components/ChartsSection'
import { ChartPreview } from './components/ChartPreview'
import { CSVExporter } from './components/CSVExporter'
import { useEyeData } from './hooks/useEyeData'

function AppContent() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { state } = useEyeData();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${month}/${day}/${year} ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
  };

  return (
    <div className="h-screen w-screen bg-[#DCE2F0] font-sans select-none overflow-hidden flex flex-col relative">
      {/* Top Toolbar */}
      <div className="bg-white border-b border-gray-300 px-2 py-0.5 flex gap-4 text-xs shadow-sm z-50">
        <div className="flex gap-2">
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">File</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Course</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Examination</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Reference Data</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Data Set</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Tools</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">View</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Step</span>
          <span className="cursor-pointer hover:bg-gray-100 px-1 rounded">Help</span>
        </div>
      </div>

      {/* Toolbar Icons Row */}
      <div className="bg-white border-b border-gray-300 p-1 flex gap-2 shadow-sm z-40 h-10 items-center px-4 justify-between">
        <div className="flex gap-2 items-center">
          <div className="flex gap-1">
            <div className="w-8 h-8 bg-yellow-300 border border-gray-400 rounded flex items-center justify-center text-xs">⬇️</div>
            <div className="w-8 h-8 bg-blue-300 border border-gray-400 rounded flex items-center justify-center text-xs">👤</div>
            <div className="w-8 h-8 bg-green-300 border border-gray-400 rounded flex items-center justify-center text-xs">👓</div>
          </div>
          <div className="border-l border-gray-300 h-6 mx-2"></div>
          <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold text-xs rounded border border-blue-800 shadow-sm">PD</div>
        </div>
        <CSVExporter />
      </div>

      {/* Info Bar */}
      <div className="bg-gradient-to-b from-gray-700 to-black text-white px-4 py-1 flex justify-between text-sm font-bold shadow-md z-30 border-t border-gray-600">
        <div className="flex gap-4">
          <span>[F]R/G Test</span>
          <span className="text-gray-300 font-normal">SemiAuto</span>
        </div>

        <div>{formatDateTime(currentTime)}</div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative p-4 flex flex-col overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[800px] h-[500px] opacity-10">
            <div className="absolute left-0 top-0 w-[300px] h-[400px] bg-blue-900 rounded-r-[100px] rounded-bl-[100px]"></div>
            <div className="absolute right-0 top-0 w-[300px] h-[400px] bg-blue-900 rounded-l-[100px] rounded-br-[100px]"></div>
            <div className="absolute left-[320px] top-[50px] w-[160px] h-[100px] bg-blue-900 rounded-b-[50px]"></div>
          </div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex justify-center mt-4">
            <RefractionTable />
          </div>

          <div className="flex justify-center items-center gap-6 mt-6 relative z-20">
            <OcclusionControl side="left" />
            <PDControl />
            <OcclusionControl side="right" />
          </div>

          <div className="absolute left-10 top-[250px] bg-white p-3 rounded shadow-md w-64 text-xs font-bold border border-gray-300 z-10">
            Correct the spherical power. Ask the patient to tell in which (red or green) side the figures are seen sharpest, blackest.
          </div>

          <div className="absolute right-10 top-[220px] z-20">
            <TestModeControl />
          </div>

          <div className="absolute right-10 bottom-12 w-64 h-48 z-20">
            <ChartPreview chartType={state.currentChart} />
          </div>

          <div className="absolute left-4 bottom-12 z-5">
            <ChartsSection />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#A0C0C0] to-[#80A0A0] border-t border-gray-400 h-8 flex items-center px-2 text-xs font-bold text-black z-50 shadow-inner">
        <div className="px-4 border-r border-gray-500 h-full flex items-center">Step S : 0.25</div>
        <div className="px-4 border-r border-gray-500 h-full flex items-center bg-[#D0E0E0]">Occlude / Fog</div>
        <div className="px-4 border-r border-gray-500 h-full flex items-center">Reference Data</div>
        <div className="px-4 border-r border-gray-500 h-full flex items-center">Final : Mem</div>
        <div className="px-4 border-r border-gray-500 h-full flex items-center">Aux.lens</div>
        <div className="flex-1"></div>
        <div className="px-2 border-l border-gray-500 h-full flex items-center bg-white border border-gray-400 mx-1">ID =</div>
        <div className="px-2 border-l border-gray-500 h-full flex items-center bg-white border border-gray-400">NAME =</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <EyeDataProvider>
      <AppContent />
    </EyeDataProvider>
  );
}

export default App
