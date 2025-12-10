import React from 'react';
import { DigitalInput } from './DigitalInput';
import { Eye, Settings } from 'lucide-react';

export const ControlPanel: React.FC = () => {


    return (
        <div className="flex flex-col h-full gap-6 p-2">
            {/* Eye Selection / Status */}
            <div className="flex gap-2">
                <button className="flex-1 bg-primary/20 border border-primary text-primary py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:shadow-glow-primary transition-all">
                    Right (OD)
                </button>
                <button className="flex-1 bg-white/5 border border-white/10 text-text-muted py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all">
                    Left (OS)
                </button>
            </div>

            {/* Main Refraction Grid */}
            <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                    <Eye className="w-4 h-4 text-text-muted" />
                    <span className="text-xs font-bold uppercase text-text-muted">Refraction Data</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <DigitalInput label="Sphere" value="+0.25" subLabel="D" />
                    <DigitalInput label="Cylinder" value="-1.50" subLabel="D" accent />
                    <DigitalInput label="Axis" value="180" subLabel="deg" accent />
                    <DigitalInput label="Add" value="+2.00" subLabel="D" />
                </div>
            </div>

            {/* PD Control */}
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
                    <Settings className="w-4 h-4 text-text-muted" />
                    <span className="text-xs font-bold uppercase text-text-muted">Configuration</span>
                </div>
                <DigitalInput label="Pupillary Dist (PD)" value="64.0" subLabel="mm" />
            </div>

            {/* Action Buttons */}
            <div className="mt-auto grid grid-cols-2 gap-2">
                <button className="btn-primary">Fog</button>
                <button className="btn-primary">Occlude</button>
                <button className="col-span-2 btn-accent">Store Value</button>
            </div>
        </div>
    );
};
