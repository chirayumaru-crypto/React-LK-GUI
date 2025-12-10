import React, { createContext, useContext, useState } from 'react';

// Types
export type EyeSide = 'OD' | 'OS';
export type RefractionKey = 'SPH' | 'CYL' | 'AXIS' | 'ADD' | 'PD';

interface EyeData {
    SPH: number;
    CYL: number;
    AXIS: number;
    ADD: number;
    VA: string;
    isOccluded: boolean;
}

interface LogEntry {
    timestamp: string;
    action: string;
    details: string;
}

interface RefractionContextType {
    data: Record<EyeSide, EyeData>;
    pd: number;
    activeEye: EyeSide | 'BOTH';
    activeField: RefractionKey;
    selectedChartId: number;

    // Actions
    updateValue: (delta: number) => void;
    setField: (field: RefractionKey) => void;
    setEye: (eye: EyeSide | 'BOTH') => void;
    toggleOcclusion: (eye: EyeSide) => void;
    setChart: (id: number) => void;
    exportLogs: () => void;
    formatValue: (val: number, type: RefractionKey) => string;
}

const RefractionContext = createContext<RefractionContextType | null>(null);

export const RefractionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State
    const [data, setData] = useState<Record<EyeSide, EyeData>>({
        OD: { SPH: 0.00, CYL: 0.00, AXIS: 180, ADD: 0.00, VA: '20/20', isOccluded: false },
        OS: { SPH: 0.00, CYL: 0.00, AXIS: 180, ADD: 0.00, VA: '20/20', isOccluded: false },
    });

    const [pd, setPd] = useState(64.0);
    const [activeEye, setActiveEye] = useState<EyeSide | 'BOTH'>('OD');
    const [activeField, setActiveField] = useState<RefractionKey>('SPH');
    const [selectedChartId, setSelectedChartId] = useState(0);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    // Logging Helper
    const logAction = (action: string, details: string) => {
        const newLog = {
            timestamp: new Date().toISOString(),
            action,
            details
        };
        setLogs(prev => [...prev, newLog]);
    };

    const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

    // Logic to update values based on field type rules
    const updateValue = (delta: number) => {
        // PD Adjustment Mode
        if (activeField === 'PD') {
            setPd(prev => clamp(prev + (delta * 0.5), 45, 80)); // 0.5mm steps, range 45-80
            logAction('UPDATE_VALUE', `Field: PD, NewValue: ${pd + delta}`);
            return;
        }

        const targetEyes = activeEye === 'BOTH' ? ['OD', 'OS'] as EyeSide[] : [activeEye as EyeSide];

        setData(prev => {
            const next = { ...prev };
            targetEyes.forEach(eye => {
                let val = next[eye][activeField as keyof EyeData] as number;

                // Rules & Limits
                if (activeField === 'AXIS') {
                    val = (val + delta * 5) % 180;
                    if (val <= 0) val += 180;
                }
                else if (activeField === 'SPH' || activeField === 'CYL') {
                    val = clamp(val + (delta * 0.25), -10.00, 10.00);
                }
                else if (activeField === 'ADD') {
                    val = clamp(val + (delta * 0.25), 0.00, 10.00);
                }

                // precise rounding to avoid fp errors
                if (activeField !== 'AXIS') {
                    val = Math.round(val * 100) / 100;
                }

                // @ts-ignore - dynamic assignment safe here
                next[eye] = { ...next[eye], [activeField]: val };
            });
            return next;
        });

        logAction('UPDATE_VALUE', `Eye: ${activeEye}, Field: ${activeField}, Delta: ${delta}`);
    };

    const toggleOcclusion = (eye: EyeSide) => {
        setData(prev => ({
            ...prev,
            [eye]: { ...prev[eye], isOccluded: !prev[eye].isOccluded }
        }));
        logAction('TOGGLE_OCCLUSION', `Eye: ${eye}`);
    };

    const exportLogs = () => {
        const headers = [
            'timestamp',
            'R_SPH', 'R_CYL', 'R_AXIS', 'R_ADD',
            'L_SPH', 'L_CYL', 'L_AXIS', 'L_ADD',
            'PD',
            'Chart_Number',
            'Occluder_State',
            'Chart_Display',
            'Speaker',
            'Utterance_Text',
            'Translation_in_En',
            'Speaker_Intent',
            'Detected_Language',
            'Patient_Confidence_Score',
            'Hesitation_Markers',
            'Requires_Verification'
        ];

        // Generate snapshot rows from logs
        const rows = logs.map(log => {
            const timestamp = log.timestamp;

            // Get current state snapshot (in real scenario, we'd store state with each log)
            // For now, we'll use current values as placeholder
            return [
                timestamp,
                formatValue(data.OD.SPH, 'SPH'),
                formatValue(data.OD.CYL, 'CYL'),
                data.OD.AXIS.toString(),
                formatValue(data.OD.ADD, 'ADD'),
                formatValue(data.OS.SPH, 'SPH'),
                formatValue(data.OS.CYL, 'CYL'),
                data.OS.AXIS.toString(),
                formatValue(data.OS.ADD, 'ADD'),
                pd.toFixed(1),
                (selectedChartId + 1).toString(),
                `OD:${data.OD.isOccluded ? 'CLOSED' : 'OPEN'};OS:${data.OS.isOccluded ? 'CLOSED' : 'OPEN'}`,
                log.action,
                '', // Speaker - placeholder for voice integration
                '', // Utterance_Text
                '', // Translation_in_En
                '', // Speaker_Intent
                '', // Detected_Language
                '', // Patient_Confidence_Score
                '', // Hesitation_Markers
                ''  // Requires_Verification
            ].join(',');
        });

        const csvContent = [headers.join(','), ...rows].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `refraction_logs_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const formatValue = (val: number, type: RefractionKey) => {
        if (type === 'AXIS') return val.toString();
        if (type === 'PD') return val.toFixed(1);
        // Force sign for SPH, CYL, ADD
        return (val > 0 ? '+' : '') + val.toFixed(2);
    }

    return (
        <RefractionContext.Provider value={{
            data, pd, activeEye, activeField, selectedChartId,
            updateValue, setField: setActiveField, setEye: setActiveEye,
            toggleOcclusion, setChart: setSelectedChartId, exportLogs, formatValue
        }}>
            {children}
        </RefractionContext.Provider>
    );
};

export const useRefraction = () => {
    const context = useContext(RefractionContext);
    if (!context) throw new Error("useRefraction must be used within Provider");
    return context;
};
