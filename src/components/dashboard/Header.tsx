import React, { useEffect, useState } from 'react';
import { Wifi, Battery, Menu, Download, Clock } from 'lucide-react';
import { useRefraction } from '../../context/RefractionContext';

export const Header: React.FC = () => {
    const { exportLogs } = useRefraction();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full h-full flex flex-wrap items-center justify-between px-4 text-white bg-ms-dark">
            <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg tracking-wide hidden sm:block">CV-5000</h1>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded text-white/90">SIMULATOR</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded hidden sm:flex">
                    <Clock className="w-3 h-3 text-gray-300" />
                    <span>{time.toLocaleString()}</span>
                </div>

                <button
                    onClick={exportLogs}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-white transition-colors"
                    title="Download Logs"
                >
                    <Download className="w-3 h-3" />
                    <span className="hidden sm:inline">CSV</span>
                </button>

                <div className="flex gap-2 text-white/80">
                    <Wifi className="w-4 h-4" />
                    <Battery className="w-4 h-4" />
                </div>
                <Menu className="w-5 h-5 cursor-pointer hover:bg-white/10 p-0.5 rounded" />
            </div>
        </div>
    );
};
