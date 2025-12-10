import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface DigitalInputProps {
    label: string;
    value: string | number;
    subLabel?: string;
    onChange?: (val: number) => void;
    accent?: boolean;
}

export const DigitalInput: React.FC<DigitalInputProps> = ({ label, value, subLabel, accent = false }) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <div className="flex justify-between items-end px-1">
                <span className="text-xs uppercase tracking-wider text-text-muted font-bold">{label}</span>
                {subLabel && <span className="text-[10px] text-text-muted/70">{subLabel}</span>}
            </div>

            <div className={`relative group flex items-center justify-between p-1 rounded-lg border bg-black/40 ${accent
                    ? 'border-accent/30 shadow-[0_0_15px_-5px_rgba(255,0,153,0.3)]'
                    : 'border-primary/30 shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]'
                }`}>
                <button className="p-1 hover:bg-white/10 rounded transition-colors active:scale-90">
                    <ChevronDown className={`w-4 h-4 ${accent ? 'text-accent' : 'text-primary'}`} />
                </button>

                <div className={`font-mono text-xl font-bold tracking-widest ${accent ? 'text-accent text-shadow-glow-accent' : 'text-primary text-shadow-glow-primary'
                    }`}>
                    {value}
                </div>

                <button className="p-1 hover:bg-white/10 rounded transition-colors active:scale-90">
                    <ChevronUp className={`w-4 h-4 ${accent ? 'text-accent' : 'text-primary'}`} />
                </button>
            </div>
        </div>
    );
};
