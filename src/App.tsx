
import { MainLayout } from './components/layout/MainLayout';
import { Header } from './components/dashboard/Header';
import { RefractionTable } from './components/controls/RefractionTable';
import { ControlPad } from './components/controls/ControlPad';
import { ChartGrid } from './components/charts/ChartGrid';
import { ChartViewer } from './components/charts/ChartViewer';
import { RefractionProvider } from './context/RefractionContext';

function App() {
  return (
    <RefractionProvider>
      <MainLayout
        header={<Header />}
        leftPanel={
          <>
            <RefractionTable />
            <ControlPad />
          </>
        }
        rightPanel={
          <div className="flex h-full flex-col sm:flex-row">
            {/* Chart Display area */}
            <div className="flex-1 border-b-4 sm:border-b-0 sm:border-r-4 border-gray-400 bg-black min-h-[300px]">
              <ChartViewer />
            </div>

            {/* Vertical Chart Selector Grid */}
            <div className="h-32 sm:h-auto sm:w-64 shrink-0 border-l border-gray-400">
              <ChartGrid />
            </div>
          </div>
        }
      />
    </RefractionProvider>
  );
}

export default App;
