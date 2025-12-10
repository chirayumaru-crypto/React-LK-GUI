import React from 'react';

interface MainLayoutProps {
    leftPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    header: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ leftPanel, rightPanel, header }) => {
    return (
        <div className="h-screen w-screen flex flex-col bg-ms-bg overflow-hidden">
            {/* Top Header Bar */}
            <div className="h-10 bg-ms-dark shrink-0 shadow-md z-10 w-full">
                {header}
            </div>

            {/* Main Split Content - Responsive: Column on mobile, Row on Desktop */}
            <div className="flex-1 flex flex-col lg:flex-row min-h-0 p-2 gap-2 overflow-y-auto lg:overflow-hidden">
                {/* Left Side: Refraction & Controls */}
                <div className="w-full lg:w-[45%] flex flex-col gap-2 min-h-[400px] shrink-0">
                    {leftPanel}
                </div>

                {/* Right Side: Charts */}
                <div className="flex-1 bg-black rounded border-4 border-gray-400 overflow-hidden relative shadow-inner min-h-[300px]">
                    {rightPanel}
                </div>
            </div>
        </div>
    );
};
